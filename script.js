
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
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

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
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 100}); 

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

/*===== PARTICLES BACKGROUND =====*/
const initParticles = (containerId) => {
    if (!window.particlesJS || !document.getElementById(containerId)) {
        return;
    }

    particlesJS(containerId, {
        particles: {
            number: { value: 120 },
            color: { value: ["#3b82f6", "#7c3aed"] },
            opacity: { value: 0.85, random: true },
            size: { value: 10, random: true },
            line_linked: {
                enable: true,
                color: "#5f76ff",
                distance: 140,
                opacity: 0.5,
                width: 1
            },
            move: {
                enable: true,
                speed: 6
            }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "repulse" },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 }
            }
        },
        retina_detect: true
    });
};

initParticles("particles-home");
