/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 5 viewport height, add the shadow-header clas to the header tag
    this.scrollY >= 50 ? header.classList.add('shadow-header')
                        : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== EMAIL JS ===============*/
// const contactForm = document.getElementById('contact-form'),
//     contactMessage = document.getElementById('contact-message')

// const sendEmail = (e) => {
//     e.preventDefault()

//     // serviceID - templateID - #form - publicKey
//     emailjs.sendForm('service_mcttcrl','template_j073jqn', '#contact-form','SYmCpRc5OQwZw2KE6')
//     .then(() => {
//         //Show sent message
//         contactMessage.textContent = 'Message sent successfully ✅'

//         // Remove message after five seconds
//         setTimeout(() => {
//             contactMessage.textContent = ''
//     }, 5000)

//         // Clear input fields
//         contactForm.reset()
// }, () => {
//      // Show error message
//      contactMessage.textContent = 'Message not sent (service error) ❌'
// })    
// }

// contactForm.addEventListener('submit', sendEmail)

const contactForm = document.querySelector('#contact-form');
const contactMessage = document.querySelector('.contact__message');

const sendEmail = (e) => {
    e.preventDefault();

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_mcttcrl', 'template_j073jqn', contactForm, 'SYmCpRc5OQwZw2KE6')
        .then(() => {
            // Show sent message
            contactMessage.textContent = 'Message sent successfully ✅';

            // Remove message after five seconds
            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);

            // Clear input fields
            contactForm.reset();
        })
        .catch((error) => {
            // Show error message
            contactMessage.textContent = 'Message not sent (service error) ❌';
            console.error('EmailJS error:', error);
        });
};

contactForm.addEventListener('submit', sendEmail);

/*=============== SHOW SCROLL UP ===============*/ 


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== DARK LIGHT THEME ===============*/ 


/*=============== SCROLL REVEAL ANIMATION ===============*/
