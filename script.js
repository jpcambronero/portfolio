/* Responsive nav + active section on scroll + sticky header */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');

function handleScroll() {
    const top = window.scrollY;
    sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const exact = document.querySelector(`header nav a[href="#${id}"]`);
            const fuzzy = document.querySelector(`header nav a[href*="${id}"]`);
            const activeLink = exact || fuzzy;
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

// run once on load
window.addEventListener('load', handleScroll);

window.addEventListener('scroll', () => {
    // close mobile nav on scroll
    if (navbar && navbar.classList.contains('active')) navbar.classList.remove('active');
    handleScroll();
    if (header) header.classList.toggle('sticky', window.scrollY > 100);
});

// mobile menu toggle
if (menuIcon && navbar) {
    // accessibility attributes
    menuIcon.setAttribute('role', 'button');
    menuIcon.setAttribute('aria-label', 'Toggle navigation');
    menuIcon.setAttribute('aria-controls', 'navbar');
    menuIcon.setAttribute('aria-expanded', 'false');

    menuIcon.addEventListener('click', () => {
        const opened = navbar.classList.toggle('active');
        // reflect state to assistive tech
        menuIcon.setAttribute('aria-expanded', opened ? 'true' : 'false');
        // optional visual state class
        menuIcon.classList.toggle('open', opened);
    });
}