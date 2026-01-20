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

/*===== TYPED.JS HOME ANIMATION =====*/
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
      strings: ['Desenvolvedor <span class="home__title-color">Full Stack</span>', 'Engenheiro de <span class="home__title-color">Software</span>', 'Data <span class="home__title-color">Analyst</span>'],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
  }
});