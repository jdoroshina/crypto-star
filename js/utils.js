const DECIMAL_PLACES = 0;

const formatCurrency = (num) => num.toFixed(DECIMAL_PLACES).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// const elements = document.querySelectorAll('.contractor-limits');

// // Пройдите по каждому элементу и установите свойство width в 100%
// for (let i = 0; i < elements.length; i++) {
//   elements[i].style.width = '100%';
// }

export { formatCurrency };
