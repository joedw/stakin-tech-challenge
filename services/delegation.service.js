import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/delegation`;
const delgSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('delg')));
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));


const userid = user.id;
export const delegationService = {
    acc: delgSubject.asObservable(),
    user: userSubject.asObservable(),
    get userValue () { return delgSubject.value },
    addnew,
    getAll,
    getById,
    update,
    delete: _delete
};


function addnew(acc) {
    return fetchWrapper.post(`${baseUrl}/add`, acc);
}

function getAll() {

        return fetchWrapper.get(baseUrl);
       // return fetchWrapper.get(`${baseUrl}/${userService}`);
   
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (id === delgSubject.value.id) {
                // update local storage
                const delg = { ...delgSubject.value, ...params };
                localStorage.setItem('delg', JSON.stringify(delg));

                // publish updated user to subscribers
                delgSubject.next(delg);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
