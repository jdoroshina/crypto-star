import { createContractorsProfile } from './contractors.js';

const STATUS_BUYER = 'buyer';
const STATUS_SELLER = 'seller';
const filterByStatus = (contractors, status) => contractors.filter((contractor) => contractor.status === status);

const renderFilteredContractors = (contractors, status) => {
  const filteredContractors = filterByStatus(contractors, status);
  createContractorsProfile(filteredContractors);
};

export const filterContractors = (contractors) => {
  const buyerButton = document.querySelector('.btn-buy');
  const sellerButton = document.querySelector('.btn-sell');

  const isActive = (btn) => btn.classList.contains('is-active');

  buyerButton.addEventListener('click', () => {
    if (!isActive(buyerButton)) {
      buyerButton.classList.add('is-active');
      sellerButton.classList.remove('is-active');
      renderFilteredContractors(contractors, STATUS_SELLER);
    }
  });

  sellerButton.addEventListener('click', () => {
    if (!isActive(sellerButton)) {
      sellerButton.classList.add('is-active');
      buyerButton.classList.remove('is-active');
      renderFilteredContractors(contractors, STATUS_BUYER);
    }
  });

  // Запускаем начальную фильтрацию
  if (isActive(buyerButton)) {
    renderFilteredContractors(contractors, STATUS_SELLER);
  } else if (isActive(sellerButton)) {
    renderFilteredContractors(contractors, STATUS_BUYER);
  }
};
