const DECIMAL_PLACES = 0;

const formatCurrency = (num) => num.toFixed(DECIMAL_PLACES).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export { formatCurrency };
