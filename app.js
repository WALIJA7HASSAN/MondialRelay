
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



// toggling legend visibility
document.querySelectorAll('.recipient-details-info .form-group input').forEach((input) => {
  const legend = input.nextElementSibling; // Select the sibling legend
  
  // Function to toggle legend visibility
  const toggleLegend = () => {
    if (legend) {
      legend.style.display = input.value.trim() !== '' ? 'block' : 'none';
    }
  };

  // Event listener for focus
  input.addEventListener('focus', () => {
    if (legend) legend.style.display = 'block';
  });

  // Event listener for blur
  input.addEventListener('blur', toggleLegend);

  // Event listener for input (to handle dynamic changes in value)
  input.addEventListener('input', toggleLegend);

  // Initialize legend visibility on page load
  toggleLegend();
});




const weightInput = document.querySelector('.weight-selector input'); 
const weightLegend = document.querySelector('.weight-selector legend'); 

if (weightInput && weightLegend) {
  
  const toggleLegend = () => {
    weightLegend.style.display = weightInput.value.trim() !== '' ? 'block' : 'none';
  };

 
  weightInput.addEventListener('focus', () => {
    weightLegend.style.display = 'block'; 
  });


  weightInput.addEventListener('blur', toggleLegend);

 
  weightInput.addEventListener('input', toggleLegend);

 
  toggleLegend();
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
const deliveryOptionsForm = document.querySelector('.delivery-options');
const validationButton = document.querySelector('.validation-btn');
const deliveryPointSection = document.querySelector('.delivery-point.section');
const deliveryPointH3 = deliveryPointSection.querySelector('h3');
const deliveryPointInnerDiv = deliveryPointSection.querySelector('div');
const accountCreationButton = document.querySelector('.account-creation-btn');
const recipientDetailsInfo = document.querySelector('.recipient-details-info');
const recipientChoiceInfo = document.querySelector('.recipient-choice-info');

// Function to handle radio selection and toggle section visibility
function handleDeliveryOptionChange() {
  const selectedOption = deliveryOptionsForm.querySelector('input[name="delivery-option"]:checked');

  if (selectedOption) {
    // Toggle the relevant sections based on the selected radio button
    recipientDetailsInfo.classList.remove('delivery-info-active');
    recipientChoiceInfo.classList.remove('delivery-info-active');

    if (selectedOption.id === 'recipient-details') {
      recipientDetailsInfo.classList.add('delivery-info-active'); // Show recipient-details info section
      validationButton.style.display = 'block'; // Show validation button
      deliveryPointH3.style.display = 'block'; // Show delivery-point header
      deliveryPointInnerDiv.style.display = 'grid'; // Show delivery-point inner elements
      accountCreationButton.style.display = 'none'; // Hide account creation button
    } else if (selectedOption.id === 'recipient-choice') {
      recipientChoiceInfo.classList.add('delivery-info-active'); // Show recipient-choice info section
      validationButton.style.display = 'none'; // Hide validation button
      deliveryPointH3.style.display = 'none'; // Hide delivery-point header
      deliveryPointInnerDiv.style.display = 'none'; // Hide delivery-point inner elements
      accountCreationButton.style.display = 'block'; // Show account creation button
    }
  }
}

// Event listener for delivery option changes (both radio selection and fieldset click)
deliveryOptionsForm.addEventListener('change', handleDeliveryOptionChange);

// Event listener for fieldset clicks to handle radio selection
document.querySelectorAll('.delivery-options fieldset').forEach((fieldset) => {
  fieldset.addEventListener('click', (event) => {
    // Check if the fieldset is not disabled
    if (!fieldset.hasAttribute('disabled')) {
      const radio = fieldset.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true; // Mark the radio button as checked

        // Trigger the handleDeliveryOptionChange function to update visibility
        handleDeliveryOptionChange();
      }
    }
  });
});

// Initialize visibility on page load
handleDeliveryOptionChange();


// shipping price calculation
// Shipping prices for each country and delivery method
const shippingPrices = {
  de: {
    domicile: {
      1: 12.90, 2: 14.90, 3: 14.90, 4: 15.90, 5: 17.90, 6: 22.90, 10: 22.90, 20: 31.40, 30: 41.40
    }
  },
  at: {
    domicile: {
      1: 15.90, 2: 18.90, 3: 18.90, 4: 22.40, 5: 24.40, 6: 26.40, 10: 26.40, 20: 48.40, 30: 58.40
    }
  },
  be: {
    domicile: {
      1: 12.90, 2: 14.90, 3: 14.90, 4: 15.90, 5: 17.90, 6: 22.90, 10: 22.90, 20: 31.40, 30: 41.40
    },
    locker: {
      1: 5.90, 2: 8.20, 3: 8.02, 4: 9.70, 5: 12.90, 6: 14.40, 10: 14.40, 20: 26.40, 30: 36.40
    }
  },
  es: {
    locker: {
      1: 7.50, 2: 9.90, 3: 12.40, 4: 12.40, 5: 15.40, 10: 15.40, 20: 29.40, 30: 39.40
    }
  },
  fr: {
    locker: {
      1: 5.40, 2: 6.60, 3: 7.90, 4: 8.90, 5: 12.40, 6: 14.40, 10: 14.40, 20: 22.40, 30: 32.40
    }
  },
  it: {
    locker: {
      1: 7.50, 2: 9.90, 3: 12.40, 4: 12.40, 5: 15.40, 10: 15.40, 20: 29.40, 30: 39.40
    },
    domicile: {
      1: 15.90, 2: 18.90, 3: 18.90, 4: 22.40, 5: 24.40, 6: 26.40, 10: 26.40, 20: 48.40, 30: 58.40
    }
  },
  lu: {
    domicile: {
      1: 12.90, 2: 14.90, 3: 14.90, 4: 15.90, 5: 17.90, 6: 22.90, 10: 22.90, 20: 31.40, 30: 41.40
    },
    locker: {
      1: 5.90, 2: 8.02, 3: 8.02, 4: 9.70, 5: 12.90, 6: 14.40, 10: 14.40, 20: 26.40, 30: 36.40
    }
  },
  nl: {
    domicile: {
      1: 12.90, 2: 14.90, 3: 14.90, 4: 15.90, 5: 17.90, 6: 22.90, 10: 22.90, 20: 31.40, 30: 41.40
    },
    locker: {
      1: 6.40, 2: 8.70, 3: 8.70, 4: 10.70, 5: 12.90, 6: 14.90, 10: 14.90, 20: 29.40, 30: 29.40
    }
  },
  pl: {
    locker: {
      1: 9.80, 2: 10.90, 3: 12.20, 4: 15.00, 5: 15.00, 6: 17.70, 10: 21.90, 15: 28.60, 20: 35.60, 25: 42.30, 30: 12.20
    }
  },
  pt: {
    locker: {
      1: 7.50, 2: 9.90, 3: 12.40, 4: 12.40, 5: 15.40, 10: 15.40, 20: 29.40, 30: 39.40
    }
  }
};

// Event listeners for form changes
document.querySelector('#destinationCountry').addEventListener('change', updateShipping);
document.querySelector('#weight').addEventListener('input', updateShipping);
document.querySelector('.locker').addEventListener('click', updateShipping);
document.querySelector('.domicile').addEventListener('click', updateShipping);

function updateShipping() {
  const country = document.querySelector('#destinationCountry').value;
  const weight = parseInt(document.querySelector('#weight').value);
  // const deliveryMethod = document.querySelector('.delivery-method-active') ? 'locker' : 'domicile';
  let deliveryMethod = '';
  const deliveryMethods = document.querySelectorAll('.delivery-method');
  
  deliveryMethods.forEach((method) => {
    if (method.classList.contains('delivery-method-active')) {
      if (method.classList.contains('locker')) {
        deliveryMethod = 'locker';
      } else if (method.classList.contains('domicile')) {
        deliveryMethod = 'domicile';
      }
    }
  });
 

  // Get price for selected country, delivery method, and weight
  let shippingPrice = 0;
  const priceList = shippingPrices[country] && shippingPrices[country][deliveryMethod];

  if (priceList) {
    // Find the appropriate price based on weight
    for (const weightRange in priceList) {
      const weightThreshold = parseInt(weightRange);
      if (weight <= weightThreshold) {
        shippingPrice = priceList[weightThreshold].toFixed(2);
        break;
      }
    }

    // Update the shipping price in the table
    const priceRow = document.querySelector("table tr:nth-child(4) td:last-child");
    priceRow.innerText = `${shippingPrice} €`;

    // Update the weight in the table
    const weightRow = document.querySelector("table tr:nth-child(2) td:last-child");
    weightRow.innerText = `${weight} kg`;

    // Update total amount (assuming no other charges)
    const totalRow = document.querySelector("table tr:nth-child(5) td:last-child");
    totalRow.innerText = `${shippingPrice} €`;
    
   
  }
}

// loc
// // Select elements for both screen sizes
// const cityInputLarge = document.querySelector('#city-name');
// const postalCodeInputLarge = document.querySelector('#postal-code');
// const cityPostalCodeInputSmall = document.querySelector('#city-or-postal-code');

// // Function to update fields based on location
// function updateLocationFields(latitude, longitude) {
//     // Check if the screen size is large or small
//     const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;

//     if (isLargeScreen) {
//         // Update large screen fields (separate city and postal code fields)
//         postalCodeInputLarge.value = `${latitude}, ${longitude}`; // You can later use geocoding for proper postal code
//         cityInputLarge.value = `Latitude: ${latitude}, Longitude: ${longitude}`; // Similarly, geocode for city
//     } else {
//         // Update small screen fields (combined city or postal code field)
//         cityPostalCodeInputSmall.value = `${latitude}, ${longitude}`;
//     }
// }

// // Function to get user's location and update fields
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function (position) {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;
//             updateLocationFields(latitude, longitude);
//         }, function (error) {
//             alert('Unable to retrieve your location. Please enable location access.');
//         });
//     } else {
//         alert('Geolocation is not supported by this browser.');
//     }
// }

// // Add event listeners for button and span clicks
// const locButton = document.querySelector('.v-loc-btn');
// const locSpan = document.querySelector('.city-or-postal-code-fieldset span');

// locButton.addEventListener('click', getLocation);
// locSpan.addEventListener('click', getLocation);

// validation checks
document.querySelector('.validation-btn').addEventListener('click', function(e) {
  e.preventDefault();  // Prevent form submission to handle validation first
  
  // Grab form elements
  const name = document.getElementById('name').value;
  const firstName = document.getElementById('firstName').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phoneNumber').value.replace(/\s+/g, '');;
  const countryCode = document.getElementById('countryCode').value;
  const postalCode = document.getElementById('postalCode').value;
  const city = document.getElementById('city').value;
  
  // Check required fields
  if (!name || !firstName || !email || !phoneNumber || !postalCode || !city) {
    showErrorModal("Tous les champs requis doivent être remplis.");
    return;
  }
  
  const phonePattern = getPhonePattern(countryCode);
  if (!phonePattern.test(phoneNumber)) {
    showErrorModal(`Le numéro de téléphone "${phoneNumber}" est invalide pour l'indicatif "${countryCode}".`);
    return;
  }
  
  // If validation is successful, log to console
  console.log("Validation réussie!");
  sendMail();
  document.getElementById("parcel-main-form").reset();

 
  // document.getElementById('recipient-form').submit();
});

function getPhonePattern(countryCode) {
  switch (countryCode) {
    case "+33": // France
      return /^[0-9]{9}$/; // Example: 9 digits
    case "+32": // Belgium
      return /^[0-9]{9}$/;
    case "+34": // Spain
      return /^[0-9]{9}$/;
    case "+44": // UK
      return /^[0-9]{10}$/;
    case "+39": // Italy
      return /^[0-9]{10}$/;
    case "+49": // Germany
      return /^[0-9]{10}$/;
    case "+48": // Poland
      return /^[0-9]{9}$/;
    default:
      return /^[0-9]{9,15}$/; // Generic format, you can extend more cases
  }
}

// Function to show error message in the modal
function showErrorModal(message) {
  const errModalContainer = document.querySelector('.err-modal-container');
  const errMessage = document.getElementById('err-message');
  // Set the error message
  errMessage.textContent = message;
  
  // Display the modal
  errModalContainer.style.display = "flex";
}

// Close modal on click (either on the close button, icon or anywhere outside the modal)
document.querySelectorAll('.err-modal-close').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelector('.err-modal-container').style.display = "none";
  });
});

document.querySelector('.err-modal-container').addEventListener('click', function(e) {
  if (e.target === this) {
    document.querySelector('.err-modal-container').style.display = "none";
  }
});


function sendMail() {
  // Grab all the form elements and set them to empty string or undefined if they are empty
  let params = {
    name: document.getElementById("name").value || "", // If empty, set to an empty string
    firstName: document.getElementById("firstName").value || "", 
    email: document.getElementById("email").value || "", 
    phoneNumber: document.getElementById("phoneNumber").value || "", 
    address: document.getElementById("address").value || "", 
    addressComplement: document.getElementById("addressComplement").value || "", 
    postalCode: document.getElementById("postalCode").value || "", 
    city: document.getElementById("city").value || "", 
    recipientLang: document.getElementById("recipient-lang").value || "", 
    weight: document.getElementById("weight").value || "", 
    destinationCountry: document.getElementById("destinationCountry").value || "", 
    deliveryMethod: document.querySelector(".delivery-method-active strong").textContent || "", 
    totalPrice: document.getElementById("totalPrice").currentValue || "", 
    cityOrPostalCode: document.getElementById("city-or-postal-code").value || "", 
    postalCodeField: document.getElementById("postal-code").value || "", 
    cityField: document.getElementById("city-name").value || "", 
    deliveryCountry: document.getElementById("country").value || "" 
  };

  // Sending data to EmailJS
  emailjs.send("service_lr3v81v", "template_woe5y6g", params)
    .then(function(response) {
      console.log("Email sent successfully:", response);
      // Optionally show a success message or reset the form after submission
    }, function(error) {
      console.error("Error sending email:", error);
      // Optionally show an error message
    });
}


