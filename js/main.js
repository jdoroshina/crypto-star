import { getDataUser, getDataContractors } from './api.js';
import { createUserProfile } from './user.js';
import { createContractorsProfile } from './contractors.js';

getDataUser(createUserProfile, () => {console.log('userdataalert');});//добавь вторую функцию alertmessage
getDataContractors(createContractorsProfile, () => {console.log('contractorsalert');});//добавь вторую функцию alertmessage
