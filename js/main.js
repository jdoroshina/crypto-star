import { getDataUser, getDataContractors } from './api.js';
import { createUserProfile } from './user.js';
import { filterContractors } from './filter.js';

getDataUser(createUserProfile, () => {console.log('userdataalert');});//добавь вторую функцию alertmessage

getDataContractors((contractorsData) => {
  filterContractors(contractorsData);
}, () => {console.log('usercontralert');});
