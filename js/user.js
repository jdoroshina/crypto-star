import { formatCurrency } from './utils.js';

const CurrencyName = {
  KEKS: 'KEKS',
  RUBLE: 'RUB',
};

// const userProfileContainer = document.querySelector('.user-profile');
const userCryptoBalance = document.querySelector('#user-crypto-balance');
const userRubBalance = document.querySelector('#user-fiat-balance');
const userName = document.querySelector('#user-profile-name');

const getBalance = (balances, currency) => {
  const foundBalanceByCurrency = balances.find((balance) => balance.currency === currency);
  return foundBalanceByCurrency ? formatCurrency(foundBalanceByCurrency.amount) : 0;
};

const createUserProfile = (user) => {
  userCryptoBalance.textContent = `${getBalance(user.balances, CurrencyName.KEKS)}`;
  userRubBalance.textContent = `${getBalance(user.balances, CurrencyName.RUBLE)}`;
  userName.textContent = `${user.userName}`;
};

export { createUserProfile };
