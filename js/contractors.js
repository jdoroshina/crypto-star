import { formatCurrency } from './utils.js';

const contractorTemplate = document
  .querySelector('#user-table-row__template')
  .content.querySelector('.users-list__table-row');
const contractorsContainer = document.querySelector('.users-list__table-body');

const getMaxLimit = (contractors) => {
  console.log('contractors.status');
  if (contractors.status === 'seller') {
    return (contractors.balance.amount * contractors.exchangeRate)
  } else {
    return contractors.balance.amount;
  }
};

const getLimits = (contractors, element) => {
  const limitsContainer = element.querySelector('.contractor-limits');
  const maxLimit = getMaxLimit(contractors);
  console.log(typeof maxLimit);
  limitsContainer.textContent = `${formatCurrency(contractors.minAmount)} ₽ - ${formatCurrency(maxLimit)} ₽`;
};


const getPaymentMethods = (methods, element) => {
  const paymentMethodsContainer = element.querySelector('.payment-methods');
  paymentMethodsContainer.innerHTML = '';

  if (Array.isArray(methods) && methods.length > 0) {
    const listItems = methods.map((method) => `<li class="users-list__badges-item badge">${method.provider}</li>`);
    paymentMethodsContainer.innerHTML = listItems.join('');
  }
};
const fillContractorProfile = (contractor, element) => {
  element.querySelector('.contractor-name').textContent = contractor.userName;
  element.querySelector('.contractor-verified-icon').style.display = contractor.isVerified ? 'block' : 'none';
  element.querySelector('.contractor-currency').textContent = contractor.balance.currency;
  element.querySelector('.contractor-echange-rate').textContent = `${formatCurrency(contractor.exchangeRate)} ₽`;

  getLimits(contractor, element);
  getPaymentMethods(contractor.paymentMethods, element);
};
const createContractorsList = (contractors) => {
  const container = contractorsContainer;
  container.innerHTML = '';

  contractors.forEach((contractor) => {
    const contractorElement = contractorTemplate.cloneNode(true);

    fillContractorProfile(contractor, contractorElement);

    contractorsContainer.appendChild(contractorElement);
  });
};

const createContractorsMapBaloons = (contractors, user) => {
  const baloonElements = [];

  contractors.forEach((contractor) => {
    if(contractor.paymentMethods.some(method => method.provider === 'Наличные')) {
      const baloonElement = document.querySelector('#map-baloon__template').content.cloneNode(true);

      fillContractorProfile(contractor, baloonElement);

      baloonElements.push(baloonElement);
    }
  });

  return baloonElements;
};


export { createContractorsList, createContractorsMapBaloons };

