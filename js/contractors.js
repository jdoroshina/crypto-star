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
  const paymentMethodsContainer = element.querySelector('.payment-methods-list');
  paymentMethodsContainer.innerHTML = '';

  if (Array.isArray(methods) && methods.length > 0) {
    const listItems = methods.map((method) => `<li class="users-list__badges-item badge">${method.provider}</li>`);
    paymentMethodsContainer.innerHTML = listItems.join('');
  }
};

const createContractorsProfile = (contractors) => {
  const container = contractorsContainer;
  // Очищаем контейнер перед рендером новых контрагентов
  container.innerHTML = '';

  contractors.forEach((contractor) => {
    console.log(contractor.status);
    console.log(contractor);
    const contractorElement = contractorTemplate.cloneNode(true);

    // const tableBtn = contractorElement.querySelector('button');
    contractorElement.querySelector('#contractor-name').textContent = contractor.userName;
    contractorElement.querySelector('#contractor-verified-icon').style.display = contractor.isVerified ? 'block' : 'none';
    contractorElement.querySelector('.contractor-currency').textContent = contractor.balance.currency;
    contractorElement.querySelector('.contractor-echange-rate').textContent = `${formatCurrency(contractor.exchangeRate)} ₽`;
    getLimits(contractor, contractorElement);
    getPaymentMethods(contractor.paymentMethods, contractorElement);
    contractorsContainer.appendChild(contractorElement);
  });
};


export { createContractorsProfile };

