import { getDataUser, getDataContractors } from './api.js';
import { createUserProfile } from './user.js';

getDataUser(createUserProfile, () => {console.log('userdataalert');});//добавь вторую функцию alertmessage
getDataContractors();
