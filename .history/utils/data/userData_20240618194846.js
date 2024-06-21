import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createUser = (user) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getUser = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateUser = (id, userData) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${uid}`, {
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getUser, updateUser, createUser,
};
