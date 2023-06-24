import { createContractorsProfile } from './contractors.js';

const STATUS_BUYER = 'buyer';
const STATUS_SELLER = 'seller';
const LIST_VIEW = 'list';
const MAP_VIEW = 'map';

const buyerButton = document.querySelector('.btn-buy');
const sellerButton = document.querySelector('.btn-sell');
const verifiedCheckbox = document.querySelector('#checked-users');
const listViewButton = document.querySelector('.btn-list');
const mapViewButton = document.querySelector('.btn-map');

// Определение функций для работы с фильтрами
const filterByStatus = (contractors, status) => contractors.filter((contractor) => contractor.status === status);
const filterByVerification = (contractors, verified) => contractors.filter((contractor) => contractor.isVerified === verified);
const isActive = (button) => button.classList.contains('is-active');
const isVerifiedChecked = () => verifiedCheckbox.checked;

// const renderFilteredContractors = (contractors, status) => {
//   const filteredContractors = filterByStatus(contractors, status);
//   createContractorsProfile(filteredContractors);
// };

// const filterContractors = (contractors, status, verified, view) => {
//   let filteredContractors = filterByStatus(contractors, status);
//   if (verified) {
//     filteredContractors = filterByVerification(filteredContractors, true);
//   }
//   createContractorsProfile(filteredContractors, view);
// };

// const isActive = (btn) => btn.classList.contains('is-active');

// const filterContractors = (contractors) => {
//   const buttonBuyer = document.querySelector('.btn-buy');
//   const buttonSeller = document.querySelector('.btn-sell');


//   buttonBuyer.addEventListener('click', () => {
//     if (!isActive(buttonBuyer)) {
//       buttonBuyer.classList.add('is-active');
//       buttonSeller.classList.remove('is-active');
//       renderFilteredContractors(contractors, STATUS_SELLER);
//     }
//   });

//   buttonSeller.addEventListener('click', () => {
//     if (!isActive(buttonSeller)) {
//       buttonSeller.classList.add('is-active');
//       buttonBuyer.classList.remove('is-active');
//       renderFilteredContractors(contractors, STATUS_BUYER);
//     }
//   });

//   // Запускаем начальную фильтрацию
//   if (isActive(buttonBuyer)) {
//     renderFilteredContractors(contractors, STATUS_SELLER);
//   } else if (isActive(buttonSeller)) {
//     renderFilteredContractors(contractors, STATUS_BUYER);
//   }
// };

// Определение функции для работы с классом "is-active"
const toggleActiveClass = (button) => {
  if (button === buyerButton || button === sellerButton) {
    [buyerButton, sellerButton].forEach((btn) => {
      btn.classList.toggle('is-active', btn === button);
    });
  } else if (button === listViewButton || button === mapViewButton) {
    [listViewButton, mapViewButton].forEach((btn) => {
      btn.classList.toggle('is-active', btn === button);
    });
  }
};


// Определение функции для применения фильтров
const filterContractors = (contractors) => {
  const filteredContractors = isVerifiedChecked() ?
    filterByVerification(filterByStatus(contractors, isActive(buyerButton) ? STATUS_SELLER : STATUS_BUYER), true) :
    filterByStatus(contractors, isActive(buyerButton) ? STATUS_SELLER : STATUS_BUYER);

  createContractorsProfile(filteredContractors);
};

const addFilterEventListeners = (contractorsData) => {
  // Навешивание слушателей событий
  [buyerButton, sellerButton, listViewButton, mapViewButton, verifiedCheckbox].forEach((btn) => {
    btn.addEventListener('click', (event) => {
      toggleActiveClass(event.target);
      filterContractors(contractorsData);
    });
  });
};

export { filterContractors, addFilterEventListeners };
