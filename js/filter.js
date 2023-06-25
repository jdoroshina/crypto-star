// import { createContractorsList } from './contractors.js';

// const STATUS_BUYER = 'buyer';
// const STATUS_SELLER = 'seller';
// // const LIST_VIEW = 'list';
// // const MAP_VIEW = 'map';

// const contractorsListContainer = document.querySelector('.users-list');
// const contractorsMapContainer = document.querySelector('.container.map-container');
// const buyerButton = document.querySelector('.btn-buy');
// const sellerButton = document.querySelector('.btn-sell');
// const verifiedCheckbox = document.querySelector('#checked-users');
// const listViewButton = document.querySelector('.btn-list');
// const mapViewButton = document.querySelector('.btn-map');

// const isVerifiedContractor = (contractor) => contractor.isVerified;

// // Определение функций для работы с фильтрами
// const filterByStatus = (contractors, status) => contractors.filter((contractor) => contractor.status === status);
// const filterByVerification = (contractors, verified) => contractors.filter((contractor) => isVerifiedContractor(contractor) === verified);
// const isActive = (button) => button.classList.contains('is-active');
// const isVerifiedChecked = () => verifiedCheckbox.checked;

// // Определение функции для работы с классом "is-active"
// const toggleActiveClass = (button) => {
//   if (button === buyerButton || button === sellerButton) {
//     [buyerButton, sellerButton].forEach((btn) => {
//       btn.classList.toggle('is-active', btn === button);
//     });
//   } else if (button === listViewButton || button === mapViewButton) {
//     [listViewButton, mapViewButton].forEach((btn) => {
//       btn.classList.toggle('is-active', btn === button);
//     });
//   }
// };

// // Определение функции для применения фильтров
// const filterContractors = (contractors) => {
//   const filteredContractors = isVerifiedChecked() ?
//     filterByVerification(filterByStatus(contractors, isActive(buyerButton) ? STATUS_SELLER : STATUS_BUYER), true) :
//     filterByStatus(contractors, isActive(buyerButton) ? STATUS_SELLER : STATUS_BUYER);

//   createContractorsList(filteredContractors);
// };

// const addFilterEventListeners = (contractorsData) => {
//   // Навешивание слушателей событий
//   [buyerButton, sellerButton, listViewButton, mapViewButton, verifiedCheckbox].forEach((btn) => {
//     btn.addEventListener('click', (event) => {
//       toggleActiveClass(event.target);
//       filterContractors(contractorsData);
//     });
//   });
// };

// export { isVerifiedContractor, filterContractors, addFilterEventListeners };

import { createContractorsList } from './contractors.js';
// import { resetFilter } from './utils.js';
import { initMap } from './map.js';

const STATUS_BUYER = 'buyer';
const STATUS_SELLER = 'seller';

// const ProviderName = {
//   CASH: 'Cash in person',
// };

const buyerButton = document.querySelector('.btn-buy');
const sellerButton = document.querySelector('.btn-sell');
const verifiedCheckbox = document.querySelector('#checked-users');
const listViewButton = document.querySelector('.btn-list');
const mapViewButton = document.querySelector('.btn-map');
const usersList = document.querySelector('.users-list');
const mapContainer = document.querySelector('.container .map');

const isVerifiedContractor = (contractor) => contractor.isVerified;
const filterByStatus = (contractors, status) => contractors.filter((contractor) => contractor.status === status);
const filterByVerification = (contractors, verified) => contractors.filter((contractor) => isVerifiedContractor(contractor) === verified);
// const filterContractorsByPaymentMethod = (contractors, providers) =>
//   contractors.filter((contractor) =>
//     contractor.paymentMethods.some((method) =>
//       providers ? providers.includes(method.provider) : true
//     )
//   );


const isActive = (button) => button.classList.contains('is-active');
const isVerifiedChecked = () => verifiedCheckbox.checked;

// const resetFilter = () => {
//   contractorsContainer.innerHTML = '';
//   contractorsBuy = [];
//   contractorsSell = [];
//   getDataUser((newUser) => {
//     getDataContractors((newContractors) => {
//       getContactors(getVerifiedUsers(filter(newContractors)), newUser);
//       resetMarkers(getVerifiedUsers(getByCash(filter(newContractors))), newUser);
//     });
//   });
// };

const toggleActiveClass = (button) => {
  if (!isActive(button)) {
    button.classList.add('is-active');
  }
};

const hideBlock = (block) => {
  block.style.display = 'none';
};

const showBlock = (block) => {
  block.style.display = 'block';
};

const filterContractors = (contractors) => {
  const filteredContractors = isVerifiedChecked() ?
    filterByVerification(filterByStatus(contractors, isActive(buyerButton) ? STATUS_SELLER : STATUS_BUYER), true) :
    filterByStatus(contractors, isActive(buyerButton) ? STATUS_SELLER : STATUS_BUYER);

  createContractorsList(filteredContractors);
};

const onBuyerButtonClick = (evt, contractors) => {
  evt.preventDefault();
  if (!isActive(buyerButton)) {
    toggleActiveClass(buyerButton);
    sellerButton.classList.remove('is-active');
    filterContractors(contractors);
  }
};

const onSellerButtonClick = (evt, contractors) => {
  evt.preventDefault();
  if (!isActive(sellerButton)) {
    toggleActiveClass(sellerButton);
    buyerButton.classList.remove('is-active');
    filterContractors(contractors);
  }
};

const onVerifiedCheckboxClick = (contractors) => () => {
  filterContractors(contractors);
};

const onListViewButtonClick = (contractors) => {
  if (!isActive(listViewButton)) {
    toggleActiveClass(listViewButton);
    mapViewButton.classList.remove('is-active');
    hideBlock(mapContainer);
    showBlock(usersList);
    // resetFilter();
    createContractorsList(contractors);
  }
};

const onMapViewButtonClick = (contractors) => {
  if (!isActive(mapViewButton)) {
    toggleActiveClass(mapViewButton);
    listViewButton.classList.remove('is-active');
    hideBlock(usersList);
    showBlock(mapContainer);
    // resetFilter();
    initMap(contractors);
  }
};

const addFilterEventListeners = (contractors) => {
  buyerButton.addEventListener('click', (evt) => onBuyerButtonClick(evt, contractors));
  sellerButton.addEventListener('click', (evt) => onSellerButtonClick(evt, contractors));
  verifiedCheckbox.addEventListener('click', onVerifiedCheckboxClick(contractors));
  listViewButton.addEventListener('click', () => onListViewButtonClick(contractors));
  mapViewButton.addEventListener('click', () => onMapViewButtonClick(contractors));
};

export { isVerifiedContractor, filterContractors, addFilterEventListeners };
