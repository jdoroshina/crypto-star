const SERVER_URL_GET_USER_DATA = 'https://cryptostar.grading.pages.academy/user';
const SERVER_URL_GET_CONTRACTORS_DATA = 'https://cryptostar.grading.pages.academy/contractors';
// const SERVER_URL_POST = 'https://28.javascript.pages.academy/keksobooking';
const GET_USER_ALERT_MESSAGE = 'Не удалось загрузить пользователя.';
const GET_CONTRACTORS_ALERT_MESSAGE = 'Не удалось загрузить контрагента.';
// const SEND_ALERT_MESSAGE = 'Не удалось отправить объявление.';

const getDataUser = async (onSuccess, onFail) => {
  try {
    const response = await fetch(SERVER_URL_GET_USER_DATA);

    if (!response.ok) {
      throw new Error(GET_USER_ALERT_MESSAGE);
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onFail(error.message);
  }
};

const getDataContractors = async (onSuccess, onFail) => {
  try {
    const response = await fetch(SERVER_URL_GET_CONTRACTORS_DATA);

    if (!response.ok) {
      throw new Error(GET_CONTRACTORS_ALERT_MESSAGE);
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onFail(error.message);
  }
};

export { getDataUser, getDataContractors };
