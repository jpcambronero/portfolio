// Toggle mobile navbar when hamburger is clicked
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

if (menuIcon && navbar) {
  // make the icon keyboard-focusable for accessibility
  menuIcon.tabIndex = 0;
  menuIcon.setAttribute('aria-label', 'Toggle navigation menu');
  menuIcon.setAttribute('role', 'button');

  menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('open');
  });

  // support Enter and Space to toggle
  menuIcon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      menuIcon.click();
    }
  });

  // close the menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && e.target !== menuIcon) {
      navbar.classList.remove('active');
      menuIcon.classList.remove('open');
    }
  });

  // close when a nav link is clicked
  document.querySelectorAll('#navbar a').forEach((link) => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      menuIcon.classList.remove('open');
    });
  });
}

// Video modal behavior (local movie file)
const openVideoBtn = document.getElementById('openVideo');
const videoModal = document.getElementById('videoModal');
const modalClose = videoModal ? videoModal.querySelector('.modal-close') : null;
const introVideo = document.getElementById('introVideo');

function openVideoModal() {
  if (!videoModal) return;
  videoModal.classList.add('active');
  videoModal.setAttribute('aria-hidden', 'false');
  try { if (introVideo) introVideo.play(); } catch (e) {}
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  if (!videoModal) return;
  videoModal.classList.remove('active');
  videoModal.setAttribute('aria-hidden', 'true');
  if (introVideo) { try { introVideo.pause(); introVideo.currentTime = 0; } catch (e) {} }
  document.body.style.overflow = '';
}

if (openVideoBtn) openVideoBtn.addEventListener('click', openVideoModal);
if (modalClose) modalClose.addEventListener('click', closeVideoModal);

// close when clicking the backdrop
if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
}

// close on Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
    closeVideoModal();
  }
});
