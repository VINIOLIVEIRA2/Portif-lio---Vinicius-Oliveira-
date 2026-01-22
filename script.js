/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== THEME TOGGLE ====================*/
const themeToggle = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('theme');

const applyTheme = (mode) => {
    document.body.classList.toggle('theme-dark', mode === 'dark');
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', mode === 'dark');
        themeToggle.textContent = mode === 'dark' ? 'Light' : 'Dark';
    }
};

if (storedTheme) {
    applyTheme(storedTheme);
} else {
    applyTheme('dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('theme-dark');
        const nextTheme = isDark ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset;
    const particlesBg = document.getElementById('particles-bg');
    let showParticles = false;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
            if (sectionId === 'home') {
                showParticles = true;
            }
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    });

    if (particlesBg) {
        particlesBg.style.display = showParticles ? 'block' : 'none';
    }
}
window.addEventListener('scroll', scrollActive)

// Run on load to set initial state
scrollActive();

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 800,
    delay: 100,
//     reset: true
});

/*===== 3D TILT EFFECT ON WORK CARDS =====*/
function initWorkCardEffects() {
    // Adiciona o efeito de inclinação 3D aos cards de trabalho.
    // É necessário garantir que os event listeners não sejam adicionados múltiplas vezes.
    const workCards = document.querySelectorAll('.work__card');

    if (workCards.length > 0) {
        const maxTilt = 15; // Max tilt in degrees

        workCards.forEach(card => {
            // Verifica se o event listener já foi adicionado para evitar duplicação
            if (!card.dataset.tiltEffectInitialized) {
                card.addEventListener('mousemove', (e) => {
                    const { left, top, width, height } = card.getBoundingClientRect();
                    const x = e.clientX - left;
                    const y = e.clientY - top;

                    // Calculate rotation values from -maxTilt to +maxTilt
                    const rotateX = maxTilt * ((y - height / 2) / (height / 2));
                    const rotateY = -maxTilt * ((x - width / 2) / (width / 2));

                    // Apply a smooth, immediate transform while hovering
                    card.style.transition = 'transform 0.1s ease-out';
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                });

                card.addEventListener('mouseleave', () => {
                    // Apply a slower, smoother transition to reset the card
                    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                });
                card.dataset.tiltEffectInitialized = 'true'; // Marca que o efeito foi inicializado
            }
        });
    }
}

// Função para inicializar todos os efeitos que dependem do DOM
/*===== WORK CAROUSEL CONTROLS =====*/
function initWorkCarouselControls() {
    const carousels = document.querySelectorAll('.work__carousel');

    carousels.forEach((carousel) => {
        const track = carousel.querySelector('[data-work-carousel]');
        const prevBtn = carousel.querySelector('.work__arrow--left');
        const nextBtn = carousel.querySelector('.work__arrow--right');

        if (!track || !prevBtn || !nextBtn || track.dataset.carouselInitialized) {
            return;
        }

        const getScrollAmount = () => {
            const card = track.querySelector('.work__card');
            if (!card) {
                return 0;
            }
            const styles = window.getComputedStyle(track);
            const gap = parseFloat(styles.gap || styles.columnGap || '0');
            return card.getBoundingClientRect().width + gap;
        };

        const scrollByAmount = (direction) => {
            const amount = getScrollAmount();
            if (!amount) {
                return;
            }
            track.scrollBy({ left: direction * amount, behavior: 'smooth' });
        };

        prevBtn.addEventListener('click', () => scrollByAmount(-1));
        nextBtn.addEventListener('click', () => scrollByAmount(1));
        track.dataset.carouselInitialized = 'true';
    });
}

function initAllEffects() {
    // Aplicar animações do ScrollReveal
    sr.reveal('.home__data, .skills__subtitle, .skills__text',{}); 
    sr.reveal('.home__img, .skills__img',{delay: 200}); 
    sr.reveal('.home__button, .home__social-icon',{ interval: 100}); 
    sr.reveal('.contact__item, .contact__cta',{interval: 100}); 
    sr.reveal('.skills__data', { origin: 'left', distance: '80px', reset: true, interval: 120 });
    sr.reveal('.about__img', { origin: 'left', distance: '80px', reset: true });
    sr.reveal('.about__subtitle, .about__text, .about__button', { origin: 'bottom', distance: '60px', reset: true, interval: 120 });
    
    // Inicializar efeitos 3D nos cards de trabalho
    initWorkCardEffects();
    initWorkCarouselControls();
    initSkillsIconMarquee(); // Carrossel continuo de icones
    initSkillsBarsAnimation();
    initWorkCardsPopIn();
    initProjectModal();

    // Inicializar a animação de texto Typed.js
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ['<span class="home__title-color">Full Stack</span> Developer', '<span class="home__title-color">Software</span> Engineering', 'Data <span class="home__title-color">Analyst</span>'],
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }


    // Inicializar a animação de partículas tsParticles
    if (document.getElementById('particles-bg')) {
        tsParticles.load("particles-bg", {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                    push: {
                        quantity: 4,
                    },
                },
            },
            particles: {
                color: {
                    value: ["#4285f4", "#8A2BE2"],
                },
                links: {
                    color: "random",
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                collisions: {
                    enable: true,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        });
    }

    if (!document.body.dataset.skillsMarqueeBound) {
        window.addEventListener('load', () => initSkillsIconMarquee(true));
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => initSkillsIconMarquee(true), 150);
        });
        document.body.dataset.skillsMarqueeBound = 'true';
    }
}

function initProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) {
        return;
    }

    const titleEl = document.getElementById('project-modal-title');
    const bodyEl = document.getElementById('project-modal-body');
    const closeButtons = modal.querySelectorAll('[data-modal-close]');
    const detailButtons = document.querySelectorAll('.work__card-link-item--details');

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    const openModal = (button) => {
        const title = button.getAttribute('data-project-title') || '';
        const desc = button.getAttribute('data-project-desc') || '';
        const projectId = button.getAttribute('data-project-id');
        if (titleEl) titleEl.textContent = title;
        if (bodyEl) {
            const template = projectId ? document.getElementById(`project-details-${projectId}`) : null;
            if (template) {
                bodyEl.innerHTML = template.innerHTML;
            } else {
                bodyEl.textContent = desc;
            }
        }
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    if (!modal.dataset.bound) {
        closeButtons.forEach((btn) => btn.addEventListener('click', closeModal));
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });
        modal.dataset.bound = 'true';
    }

    detailButtons.forEach((button) => {
        if (button.dataset.bound) {
            return;
        }
        button.addEventListener('click', () => openModal(button));
        button.dataset.bound = 'true';
    });
}

function initWorkCardsPopIn() {
    const cards = document.querySelectorAll('.work__card');
    if (!cards.length || window.IntersectionObserver === undefined) {
        return;
    }

    if (document.body.dataset.workCardsPopInitialized) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
            } else {
                entry.target.classList.remove('is-revealed');
            }
        });
    }, {
        threshold: 0.3,
    });

    cards.forEach((card) => observer.observe(card));
    document.body.dataset.workCardsPopInitialized = 'true';
}

function initSkillsBarsAnimation() {
    const bars = document.querySelectorAll('.skills__bar');
    if (!bars.length || window.IntersectionObserver === undefined) {
        return;
    }

    if (document.body.dataset.skillsBarsInitialized) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-animated');
            } else {
                entry.target.classList.remove('is-animated');
            }
        });
    }, {
        threshold: 0.4,
    });

    bars.forEach((bar) => observer.observe(bar));
    document.body.dataset.skillsBarsInitialized = 'true';
}

function initWorkCardWhip() {
    const cards = document.querySelectorAll('.work__card');
    if (!cards.length || window.IntersectionObserver === undefined) {
        return;
    }

    if (document.body.dataset.workWhipInitialized) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('whip-effect');
            } else {
                entry.target.classList.remove('whip-effect');
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: '0px',
    });

    cards.forEach((card) => observer.observe(card));
    document.body.dataset.workWhipInitialized = 'true';
}

/*===== SKILLS ICON MARQUEE =====*/
function initSkillsIconMarquee(force = false) {
    const wrapper = document.querySelector('.skills__icon-wrapper');
    const carousel = document.querySelector('.skills__icon-carousel');

    if (!wrapper || !carousel || (!force && wrapper.dataset.marqueeInitialized)) {
        return;
    }

    if (!wrapper.dataset.baseHtml) {
        wrapper.dataset.baseHtml = wrapper.innerHTML;
    }

    wrapper.style.animation = 'none';
    wrapper.innerHTML = wrapper.dataset.baseHtml;

    const baseItems = Array.from(wrapper.children);
    if (baseItems.length === 0) {
        return;
    }

    // Ensure base set fills the visible area before cloning.
    while (wrapper.scrollWidth < carousel.clientWidth) {
        baseItems.forEach(item => wrapper.appendChild(item.cloneNode(true)));
    }

    const baseWidth = wrapper.scrollWidth;
    wrapper.insertAdjacentHTML('beforeend', wrapper.innerHTML);

    const speed = 70; // px per second
    const duration = Math.max(18, baseWidth / speed);
    wrapper.style.setProperty('--marquee-duration', `${duration}s`);
    wrapper.style.setProperty('--marquee-shift', `${-baseWidth}px`);

    // Re-enable animation after DOM changes.
    requestAnimationFrame(() => {
        wrapper.style.animation = '';
    });

    wrapper.dataset.marqueeInitialized = 'true';
}

document.addEventListener('DOMContentLoaded', initAllEffects);



