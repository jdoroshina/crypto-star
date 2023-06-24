import { getDataUser, getDataContractors } from './api.js';
import { createUserProfile } from './user.js';
import { filterContractors, addFilterEventListeners } from './filter.js';

getDataUser(createUserProfile, () => {console.log('userdataalert');});//добавь вторую функцию alertmessage

getDataContractors((contractorsData) => {
  filterContractors(contractorsData);
  addFilterEventListeners(contractorsData);
}, () => {console.log('contrdataalert');});
