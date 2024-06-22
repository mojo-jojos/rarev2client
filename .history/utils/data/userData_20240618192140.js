import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getUser = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateUser = (id, userData) => new Promise((resolve, reject) => {
  // Perform the update operation, for example, using fetch
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

export {
  getUser, updateUser,
};
