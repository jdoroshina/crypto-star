const DECIMAL_PLACES = 0;

const contractorTemplate = document
  .querySelector('#user-table-row__template')
  .content.querySelector('.users-list__table-row');
const contractorsContainer = document.querySelector('.users-list__table-body');

const getMaxLimit = (data) => {
  if (data.status === 'seller') {
    return (data.balance.amount * data.exchangeRate).toFixed(DECIMAL_PLACES);
  } else {
    return data.balance.amount;
  }
};

const getLimits = (data, element) => {
  const limitsContainer = element.querySelector('.contractor-limits');
  const maxLimit = getMaxLimit(data);
  limitsContainer.textContent = `${data.minAmount} ₽ - ${maxLimit} ₽`;
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
  contractors.forEach((contractor) => {
    console.log(contractor.status);
    const contractorElement = contractorTemplate.cloneNode(true);

    // const tableBtn = contractorElement.querySelector('button');
    contractorElement.querySelector('#contractor-name').textContent = contractor.userName;
    contractorElement.querySelector('#contractor-verified-icon').style.display = contractor.isVerified ? 'block' : 'none';
    contractorElement.querySelector('.contractor-currency').textContent = contractor.balance.currency;
    contractorElement.querySelector('.contractor-echange-rate').textContent = `${contractor.exchangeRate} ₽`;
    getLimits(contractor, contractorElement);
    getPaymentMethods(contractor.paymentMethods, contractorElement);
    contractorsContainer.appendChild(contractorElement);
  });
};


export { createContractorsProfile };
// [
// 	{
// 		"id": "0CsQ60w3M-RTyumLjjlfN",
// 		"balance": {
// 			"currency": "KEKS",
// 			"amount": 4.94
// 		},
// 		"exchangeRate": 2517204.54,
// 		"isVerified": false,
// 		"status": "seller",
// 		"userName": "Зинаида",
// 		"paymentMethods": [
// 			{
// 				"currency": "RUB",
// 				"provider": "Sberbank",
// 				"accountNumber": "0000 0000 0000 4991"
// 			},
// 			{
// 				"currency": "RUB",
// 				"provider": "Cash in person"
// 			}
// 		],
// 	"coords": {
// 		"lat": 59.65203,
// 		"lng": 30.24462
// 	},
// 	"minAmount": 7906
// 	},
// 	{
// 		"id": "1ctUkL5VGbv5x126ypZ0n",
// 		"balance": {
// 			"currency": "RUB",
// 			"amount": 120064,
// 		},
// 		"exchangeRate": 109485.34,
// 		"isVerified": false,
// 		"status": "buyer",
// 		"userName": "Пётр",
// 		"wallet": {
// 			"currency": "KEKS",
// 			"address": "je9dnx2c04l2tgmm1fsxphw2pikdcuksni663wn8"
// 		},
// 		"minAmount": 18290
// 	}
// ]