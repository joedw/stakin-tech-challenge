import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
import{napi} from 'networkapi';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    editprofile,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};
function login(username, password){
     napi.getAddAllStakingAmounts();
    setTimeout(function(){ 
        console.log("Ready")
    }, 1000);
    return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
    .then(user => {
 
           userSubject.next(user);
           localStorage.setItem('user', JSON.stringify(user));

           return user;
        // publish user to subscribers and store in local storage to stay logged in between page refreshes
       
    });

    
}
// function getStakedAmts(username, password,callback){
//     napi.getAddAllStakingAmounts().then(newdelgs => {
//         callback(username, password);
//     }).catch(function(err) {
//      console.log('error in napiGetStaked inside User Service');
//      callback(username, password);
//        });

// }
// function login(username, password) {
 
//   return  getStakedAmts(username, password,doLogin);
// }

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}
function editprofile(id){
    Router.push('/users/edit/' + id);
    
}
function register(user) {
    return fetchWrapper.post(`${baseUrl}/register`, user);
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
