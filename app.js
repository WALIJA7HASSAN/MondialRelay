
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
navToggle.addEventListener('click', () => {
  navList.classList.toggle('navlist-active');
  navToggle.classList.toggle('nav-toggle-active')
});


// connexion form

const connexionForm = document.querySelector('.connexion-form');
const connexionTogglerSm = document.getElementById('connection-toggler-sm');
const connexionTogglerLg = document.getElementById('connection-toggler-lg');
const connexionFormClose = document.getElementById('connexion-form-close');


connexionTogglerSm?.addEventListener('click', () => {
  connexionForm.classList.add('connexion-form-active'); 
});


connexionFormClose?.addEventListener('click', () => {
  connexionForm.classList.remove('connexion-form-active'); 
});

// connexionTogglerLg?.addEventListener('click', () => {
//   connexionForm.classList.toggle('connexion-form-active'); 
//   connexionTogglerLg.classList.toggle('.nav-footer-active')
// });

// Get the nav-footer and all its child divs
const navFooter = document.querySelector('.nav-footer');
const footerDivs = navFooter.querySelectorAll('div');
const panierModal = document.querySelector('.monPanier-modal');
const langModal = document.querySelector('.lang-modal');


function removeActiveClasses() {
  footerDivs.forEach(div => (div.classList.remove('nav-footer-active')));
  connexionForm.classList.remove('connexion-form-active');
  panierModal.classList.remove('monPanier-modal-active');
  langModal.classList.remove('lang-modal-active');
}
footerDivs.forEach(div => {
  div.addEventListener('click', () => {
    if (div.classList.contains('nav-footer-active')) {
      // If the clicked div is already active, remove its active class
      div.classList.remove('nav-footer-active');

      // Handle specific cases for forms/modals
      if (div.id === 'connection-toggler-lg') {
        connexionForm.classList.remove('connexion-form-active');
      } else if (div.id === 'monPanier-modal-toggler') {
        panierModal.classList.remove('monPanier-modal-active');
      } else if (div.id === 'lang-modal-toggler') {
        langModal.classList.remove('lang-modal-active');
      }
    } else {
      // Remove nav-footer-active from all divs
      footerDivs.forEach(item => item.classList.remove('nav-footer-active'));

      // Add nav-footer-active to the clicked div
      div.classList.add('nav-footer-active');

      // Handle specific cases for forms/modals
      if (div.id === 'connection-toggler-lg') {
        connexionForm.classList.add('connexion-form-active');
        panierModal.classList.remove('monPanier-modal-active');
        langModal.classList.remove('lang-modal-active'); // Ensure only one is visible at a time
      } else if (div.id === 'monPanier-modal-toggler') {
        panierModal.classList.add('monPanier-modal-active');
        connexionForm.classList.remove('connexion-form-active');
        langModal.classList.remove('lang-modal-active'); // Ensure only one is visible at a time
      } else if (div.id === 'lang-modal-toggler') {
        langModal.classList.add('lang-modal-active');
        connexionForm.classList.remove('connexion-form-active');
        panierModal.classList.remove('monPanier-modal-active'); // Ensure only one is visible at a time
      } else {
        // Hide everything else if a different div is clicked
        connexionForm.classList.remove('connexion-form-active');
        panierModal.classList.remove('monPanier-modal-active');
        langModal.classList.remove('lang-modal-active');
      }
    }
  });
});


window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    removeActiveClasses();
  }
});

// Initial check for screen size on page load
if (window.innerWidth < 768) {
  removeActiveClasses();
}