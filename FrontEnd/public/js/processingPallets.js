/**
 * Updates the status of a pallet in the API.
 * @param {string} qr_pallet - The QR code of the pallet to be updated.
 * @param {string} status - The new status of the pallet.
 * @param {string} id_user - The ID of the user making the update.
 * @returns {Promise} - A promise that resolves with the API response or rejects with an error.
 */
function putPallets(qr_pallet, status, id_user) {
  return new Promise((resolve, reject) => {
    const apiUrl = 'http://localhost:8000/api/v1/pallets';
    const queryParams = {
      qr_pallet,
    };
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    };
    const body = {
      status,
      id_user,
    };
    axios
      .put(apiUrl, body, { params: queryParams, headers })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Retrieves a list of pallets with a 'pendiente' (pending) status from the API.
 * @returns {Promise} - A promise that resolves with the API response or rejects with an error.
 */
function getPallets() {
  return new Promise((resolve, reject) => {
    const apiUrl = 'http://localhost:8000/api/v1/pallets?status=pendiente';
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Displays details of the first pallet in the list and updates its status.
 * @param {Object} fields - An object containing HTML elements to display pallet details.
 * @param {HTMLElement} fields.qr - The input element to show the pallet's QR code.
 * @param {HTMLElement} fields.destination - The input element to show the pallet's destination.
 * @param {HTMLElement} fields.origin - The element to show the pallet's origin.
 * @param {HTMLElement} fields.sku - The element to show the pallet's SKU.
 * @param {HTMLElement} fields.description - The element to show the pallet's description.
 * @param {HTMLElement} fields.dueDate - The element to show the pallet's due date.
 * @param {HTMLElement} fields.freshness - The element to show the pallet's freshness.
 * @returns {void}
 */
function showDetailPallets(fields) {
  getPallets()
    .then((response) => {
      const pallets = response.data.pallets;
      const countPallets = pallets.length;
      const idUser = sessionStorage.getItem('id_user');

      if (countPallets > 0) {
        fields.qr.value = pallets[0].qr_pallet;
        fields.destination.value = pallets[0].destination;
        fields.origin.innerText = pallets[0].origin;
        fields.sku.innerText = pallets[0].sku;
        fields.description.innerText = pallets[0].description;
        fields.dueDate.innerText = pallets[0].due_date;
        fields.freshness.innerText = pallets[0].freshness;

        putPallets(pallets[0].qr_pallet, 'proceso', idUser)
          .then((r) => {
            console.log(r);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        alert('No hay mas tareas pendientes.');
      }
    })
    .catch((err) => {
      alert(err.message);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const sku = document.getElementById('sku-pallet');
  const origin = document.getElementById('ubication-pallet');
  const description = document.getElementById('description-pallet');
  const freshness = document.getElementById('freshness-pallet');
  const dueDate = document.getElementById('due-date-pallet');
  const qr = document.getElementById('qr-pallet-verify');
  const destination = document.getElementById('pallet-destination');

  const fields = {
    sku,
    origin,
    description,
    freshness,
    dueDate,
    qr,
    destination,
  };

  showDetailPallets(fields);
});
