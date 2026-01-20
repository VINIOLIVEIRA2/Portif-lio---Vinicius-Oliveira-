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

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 200}); 
sr.reveal('.home__button, .home__social-icon',{ interval: 100}); 
sr.reveal('.skills__data, .contact__input',{interval: 100}); 
sr.reveal('.work__card', {origin: 'bottom', interval: 200}); 

/*===== 3D TILT EFFECT ON WORK CARDS =====*/
document.addEventListener('DOMContentLoaded', () => {
    const workCards = document.querySelectorAll('.work__card');

    if (workCards.length > 0) {
        const maxTilt = 15; // Max tilt in degrees

        workCards.forEach(card => {
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
        });
    }
});

/*===== WORK CAROUSEL ARROWS =====*/
const workCarousel = document.getElementById('work-carousel');
const workArrowLeft = document.querySelector('.work__arrow--left');
const workArrowRight = document.querySelector('.work__arrow--right');

if (workCarousel && workArrowLeft && workArrowRight) {
    const getScrollAmount = () => Math.round(workCarousel.clientWidth * 0.8);

    workArrowLeft.addEventListener('click', () => {
        workCarousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    workArrowRight.addEventListener('click', () => {
        workCarousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
}

/*===== TYPED.JS HOME ANIMATION =====*/
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
      strings: ['Desenvolvedor <span class="home__title-color">Full Stack</span>', 'Engenharia de <span class="home__title-color">Software</span>', 'Data <span class="home__title-color">Analyst</span>'],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
  }

  /*===== PARTICLES.JS HOME ANIMATION =====*/
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
});