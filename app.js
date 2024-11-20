
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

// delivery options
// document.querySelectorAll('.delivery-options fieldset').forEach((fieldset) => {
//   fieldset.addEventListener('click', (event) => {
//     // Check if the fieldset is not disabled
//     if (!fieldset.hasAttribute('disabled')) {
//       const radio = fieldset.querySelector('input[type="radio"]');
//       if (radio) {
//         radio.checked = true;
//       }
//     }
//   });
// });

document.querySelectorAll('.delivery-options fieldset').forEach((fieldset) => {
  fieldset.addEventListener('click', (event) => {
    // Check if the fieldset is not disabled
    if (!fieldset.hasAttribute('disabled')) {
      const radio = fieldset.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;

        // Toggle active info section based on the selected radio button
        const recipientDetailsInfo = document.querySelector('.recipient-details-info');
        const recipientChoiceInfo = document.querySelector('.recipient-choice-info');

        // Hide both sections initially
        recipientDetailsInfo.classList.remove('delivery-info-active');
        recipientChoiceInfo.classList.remove('delivery-info-active');

        // Show the relevant section based on the selected radio button
        if (radio.id === 'recipient-details') {
          recipientDetailsInfo.classList.add('delivery-info-active');
        } else if (radio.id === 'recipient-choice') {
          recipientChoiceInfo.classList.add('delivery-info-active');
        }
      }
    }
  });
});


document.querySelectorAll('.recipient-details-info .form-group input').forEach((input) => {
  const legend = input.nextElementSibling; // Select the sibling legend
  input.addEventListener('focus', () => {
    if (legend) legend.style.display = 'block';
  });
  input.addEventListener('blur', () => {
    if (legend) legend.style.display = 'none';
  });
});


const weightInput = document.querySelector('.weight-selector input'); // Select the input
const weightLegend = document.querySelector('.weight-selector legend'); // Select the legend

if (weightInput && weightLegend) {
  weightInput.addEventListener('focus', () => {
    weightLegend.style.display = 'block'; // Show legend on focus
  });

  weightInput.addEventListener('blur', () => {
    weightLegend.style.display = 'none'; // Hide legend on blur
  });
}

// dim modal
// Select elements
const modalToggler = document.querySelector('.dimension-modal-toggler');
const dimensionModal = document.querySelector('.dimension-modal');
const modalCloseButtons = document.querySelectorAll('.dim-modal-close, .modal-close'); // Both close buttons
const modalBackground = document.querySelector('.dimension-modal');

// Show modal on click
modalToggler.addEventListener('click', () => {
  dimensionModal.style.display = 'flex'; // Show the modal
});

// Close modal on close button click
modalCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    dimensionModal.style.display = 'none'; // Hide the modal
  });
});

// Close modal if clicking outside the modal content
modalBackground.addEventListener('click', (event) => {
  const modalContent = dimensionModal.querySelector('.modal');
  if (!modalContent.contains(event.target)) {
    dimensionModal.style.display = 'none'; // Hide the modal
  }
});

// handling totals
// Select form elements
const destinationCountrySelect = document.querySelector('#destinationCountry');
const weightInputVal = document.querySelector('#weight');

// Select target table cells in .parcel-price
const destinationCell = document.querySelector('.parcel-price table tr:nth-child(1) td:nth-child(2)');
const weightCell = document.querySelector('.parcel-price table tr:nth-child(2) td:nth-child(2)');

// Update Destination on change
destinationCountrySelect.addEventListener('change', () => {
  const selectedOption = destinationCountrySelect.options[destinationCountrySelect.selectedIndex];
  destinationCell.textContent = selectedOption.textContent; 
});

// Update Weight on input and displaying point and methods
weightInputVal.addEventListener('input', () => {
  const weightValue = weightInput.value.trim();
  
  // Update weight cell content
  weightCell.textContent = weightValue ? `${weightValue} kg` : '... kg'; 
  
  // Get the alert div
  const weightExceedAlert = document.getElementById('weight-exceed-alert');
  
  // Get the delivery methods div
  const deliveryMethods = document.querySelector('.delivery-methods');
  
  // Get the delivery point section
  const deliveryPointSection = document.querySelector('.delivery-point.section');

  if (weightValue) {
    const numericWeight = parseFloat(weightValue);
    
    // Toggle weight exceed alert display
    if (numericWeight > 30) {
      weightExceedAlert.style.display = 'block';
      deliveryMethods.style.display = 'none'; // Hide delivery methods for weight > 30
      deliveryPointSection.style.display = 'none'; // Hide delivery point section
    } else if (numericWeight >= 1 && numericWeight <= 30) {
      weightExceedAlert.style.display = 'none'; // Hide alert for weight <= 30
      deliveryMethods.style.display = 'block'; // Show delivery methods for valid weight
      deliveryPointSection.style.display = 'block'; // Show delivery point section
    } else {
      weightExceedAlert.style.display = 'none'; // Hide alert for invalid weight
      deliveryMethods.style.display = 'none';  // Hide delivery methods for invalid weight
      deliveryPointSection.style.display = 'none'; // Hide delivery point section for invalid weight
    }
  } else {
    // Reset if no valid input
    weightExceedAlert.style.display = 'none';
    deliveryMethods.style.display = 'none';
    deliveryPointSection.style.display = 'none';
  }
});

//display reelevant delivery methods
const countryDeliveryMapping = {
  de: ['domicile'],          // Allemagne - Domicile only
  at: ['domicile'],          // Autriche - Domicile only
  be: ['locker', 'domicile'], // Belgique - Both
  es: ['locker'],            // Espagne - Locker only
  fr: ['locker'],            // France - Locker only
  it: ['locker', 'domicile'], // Italie - Both
  lu: ['locker', 'domicile'], // Luxembourg - Both
  nl: ['locker', 'domicile'], // Pays-Bas - Both
  pl: ['locker'],            // Pologne - Locker only
  pt: ['locker'],            // Portugal - Locker only
};

// Elements
const destinationSelector = document.getElementById('destinationCountry');
const deliveryMethods = document.querySelectorAll('.delivery-methods .delivery-method');

// Update delivery methods based on selected country
function updateDeliveryMethods() {
  const selectedCountry = destinationSelector.value;
  const allowedMethods = countryDeliveryMapping[selectedCountry] || [];

  deliveryMethods.forEach(method => {
    const methodType = method.textContent.trim().toLowerCase().includes('locker') ? 'locker' : 'domicile';
    method.style.display = allowedMethods.includes(methodType) ? 'grid' : 'none';
  });

  // Ensure active class is only on visible method
  const firstVisibleMethod = Array.from(deliveryMethods).find(method => method.style.display === 'grid');
  deliveryMethods.forEach(method => method.classList.remove('delivery-method-active'));
  if (firstVisibleMethod) {
    firstVisibleMethod.classList.add('delivery-method-active');
  }
}

// Event listener for country selection
destinationSelector.addEventListener('change', updateDeliveryMethods);

// Initialize methods on page load
updateDeliveryMethods();



// compensator
// Select elements
const decrementButton = document.querySelector('.compensation-couter span:nth-child(1)');
const incrementButton = document.querySelector('.compensation-couter span:nth-child(3)');
const valueDisplay = document.querySelector('.compensation-couter div p:nth-child(1)');
const costDisplay = document.querySelector('.compensation-couter div p:nth-child(2)');
const indemnisationRow = document.querySelector('.parcel-price table tr:nth-child(3) td:nth-child(2)');

// Variables
let currentValue = 25; // Starting value
const maxValue = 500; // Max limit
const increments = [
  { value: 25, cost: 'Inclus' },
  { value: 50, cost: 'Coût : 2 €' },
  { value: 125, cost: 'Coût : 3.5 €' },
  { value: 250, cost: 'Coût : 5 €' },
  { value: 375, cost: 'Coût : 6.5 €' },
  { value: 500, cost: 'Coût : 8 €' },
];

// Helper function to update the display
function updateDisplay() {
  // Update the value and cost
  const currentStep = increments.find((step) => step.value === currentValue);
  valueDisplay.textContent = `${currentValue} €`;
  costDisplay.textContent = currentStep ? currentStep.cost : '';

  indemnisationRow.textContent = currentValue > 25 
  ? `${currentStep.cost.replace('Coût : ', '')}` 
  : '';
  // Update button states
  if (currentValue === 25) {
    decrementButton.style.backgroundColor = '#808080'; // Not active
    incrementButton.style.backgroundColor = '#96154A'; // Active
  } else if (currentValue === maxValue) {
    decrementButton.style.backgroundColor = '#96154A'; // Active
    incrementButton.style.backgroundColor = '#808080'; // Not active
  } else {
    decrementButton.style.backgroundColor = '#96154A'; // Active
    incrementButton.style.backgroundColor = '#96154A'; // Active
  }
}

// Event listeners
decrementButton.addEventListener('click', () => {
  if (currentValue > 25) {
    const currentIndex = increments.findIndex((step) => step.value === currentValue);
    if (currentIndex > 0) {
      currentValue = increments[currentIndex - 1].value;
      updateDisplay();
    }
  }
});

incrementButton.addEventListener('click', () => {
  if (currentValue < maxValue) {
    const currentIndex = increments.findIndex((step) => step.value === currentValue);
    if (currentIndex < increments.length - 1) {
      currentValue = increments[currentIndex + 1].value;
      updateDisplay();
    }
  }
});

// Initialize display
updateDisplay();


// Select all forms on the page
const forms = document.querySelectorAll('form');
forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
});

// dynamic price display
function updateParcelPrice() {
  const indemnisationRow = document.querySelector('.parcel-price table tr:nth-child(3) td:nth-child(2)');
  const priceRow = document.querySelector('.parcel-price table tr:nth-child(4) td:nth-child(2)');
  const totalRow = document.querySelector('.parcel-price table tr:nth-child(5) td:nth-child(2)');
  const priceDisplaySm = document.querySelector('.price-display-sm p:nth-child(2)');

  // Extract values from rows and handle empty values
  const indemnisationValue = parseFloat(indemnisationRow.textContent.trim()) || 0;
  const priceValue = parseFloat(priceRow.textContent.trim()) || 0;

  // Calculate the total
  const total = indemnisationValue + priceValue;

  // Update the total in both the table and the price display
  totalRow.textContent = `${total.toFixed(2)} €`;
  priceDisplaySm.textContent = `${total.toFixed(2)} €`;
}

// Function to observe changes in specific cells
function observePriceChanges() {
  const indemnisationCell = document.querySelector('.parcel-price table tr:nth-child(3) td:nth-child(2)');
  const priceCell = document.querySelector('.parcel-price table tr:nth-child(4) td:nth-child(2)');

  // Create a MutationObserver
  const observer = new MutationObserver(() => {
    updateParcelPrice(); // Call the function whenever a change is detected
  });

  // Set observer options
  const observerConfig = { characterData: true, subtree: true, childList: true };

  // Observe the cells
  observer.observe(indemnisationCell, observerConfig);
  observer.observe(priceCell, observerConfig);
}

// Initialize the observer and calculate total on load
observePriceChanges();
updateParcelPrice();

// updating delivery methods
document.querySelectorAll('.delivery-methods .delivery-method').forEach(method => {
  method.addEventListener('click', () => {
    // Check if the clicked method is not hidden
    if (getComputedStyle(method).display !== 'none') {
      // Remove the active class from all methods
      document.querySelectorAll('.delivery-methods .delivery-method').forEach(m => {
        m.classList.remove('delivery-method-active');
      });

      // Add the active class to the clicked method
      method.classList.add('delivery-method-active');
    }
  });
});

// displaying btns con selection
// Get elements
const deliveryOptionsForm = document.querySelector('.delivery-options');
const validationButton = document.querySelector('.validation-btn');
const deliveryPointSection = document.querySelector('.delivery-point.section');
const deliveryPointH3 = deliveryPointSection.querySelector('h3');
const deliveryPointInnerDiv = deliveryPointSection.querySelector('div');
const accountCreationButton = document.querySelector('.account-creation-btn');

// Function to handle radio selection
function handleDeliveryOptionChange() {
  const selectedOption = deliveryOptionsForm.querySelector('input[name="delivery-option"]:checked');

  if (selectedOption) {
    if (selectedOption.id === 'recipient-details') {
      // Display validation button
      validationButton.style.display = 'block';

      // Show delivery-point section
      deliveryPointH3.style.display = 'block';
      deliveryPointInnerDiv.style.display = 'grid';

      // Hide account creation button
      accountCreationButton.style.display = 'none';
    } else if (selectedOption.id === 'recipient-choice') {
      // Hide validation button
      validationButton.style.display = 'none';

      // Hide delivery-point inner elements
      deliveryPointH3.style.display = 'none';
      deliveryPointInnerDiv.style.display = 'none';

      // Display account creation button
      accountCreationButton.style.display = 'block';
    }
  }
}

// Event listener for delivery option changes
deliveryOptionsForm.addEventListener('change', handleDeliveryOptionChange);

// Initialize visibility on page load
handleDeliveryOptionChange();

