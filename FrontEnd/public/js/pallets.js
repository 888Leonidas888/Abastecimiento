/**
 * Hides the pending product element.
 * @param {HTMLElement} product - The product element to hide.
 */
function hidePendingProduct(product) {
  product.style.display = 'none';
}

/**
 * Displays the details of a pallet in the UI.
 * @param {string} location - The location of the pallet.
 */
function showUbicationPallet(ubication, qr) {
  const boxPallets = document.querySelector('.boxPallets');
  const h1 = document.querySelector('h1');
  const destinationProduct = document.createElement('div');

  h1.innerText = 'Dejar Pallet';

  destinationProduct.classList.add('destination-product');
  destinationProduct.innerHTML = `
  <div class="formSupply">
    <div class="inputQR">
      <input id="qr-pallet-verify" type="hidden" value=${qr}/>
    </div>
    <div class="infoProducts">
      <h4>Ubicación</h4>
      <p id="confirm-ubication" >${ubication}</p>
    </div>
    <div class="infoProducts">
      <h4>Confirme ubicación</h4>
      <input id="current-ubication" type="text"/>
    </div>
  <div class="buttonSupply">
    <div id="btn-ok" class="check">
      <h4>Listo</h4>
      <span class="material-symbols-rounded"> check_circle </span>
    </div>
  </div>
    `;

  boxPallets.appendChild(destinationProduct);
}

/**
 * Displays the modal and overlay.
 * @param {HTMLElement} modal - The modal element to display.
 * @param {HTMLElement} overlay - The overlay element to display.
 */
function showModal(modal, overlay) {
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

/**
 * Hides the modal and overlay.
 * @param {HTMLElement} modal - The modal element to hide.
 * @param {HTMLElement} overlay - The overlay element to hide.
 */
function closeModal(modal, overlay) {
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

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
            // console.log(r);
          })
          .catch((err) => {
            // console.log(err.message);
            alert(err.message);
          });
      } else {
        alert('No hay mas tareas pendientes.');
      }
    })
    .catch((err) => {
      alert(err.message);
    });
}

function palletFound(qr_pallet, qr_current, status, id_user) {
  const idUser = sessionStorage.getItem('id_user');
  if (qr_pallet.toUpperCase() === qr_current.toUpperCase()) {
    putPallets(qr_pallet, status, idUser)
      .then((r) => {
        hidePendingProduct(product);
        showUbicationPallet(destination.value);
      })
      .catch((err) => {
        alert(err.message);
        // console.log(err.message);
      });
  }
}

function palletNotFound(qr_pallet, status, id_user) {
  putPallets(qr_pallet, status, id_user)
    .then((r) => {
      // console.log(r);
      window.location.href = '/menu';
    })
    .catch((err) => {
      alert(err.message);
      // console.log(err.message);
    });
}

function verifyQRPallet(qr, qr_current) {
  const product = document.getElementById('get-pending-product');
  const destination = document.getElementById('pallet-destination');
  const modal = document.getElementById('modalExito');
  const overlay = document.getElementById('overlay');

  if (qr_current !== '' && qr_current.toUpperCase() === qr.toUpperCase()) {
    hidePendingProduct(product);
    showUbicationPallet(destination.value, qr);

    const btnOK = document.getElementById('btn-ok');
    const ubication = document.getElementById('confirm-ubication').innerText;

    btnOK.addEventListener('click', () => {
      const idUser = sessionStorage.getItem('id_user');
      const ubicationCurrent =
        document.getElementById('current-ubication').value;
      if (ubication === ubicationCurrent) {
        palletNotFound(qr_current, 'completado', idUser);
      } else {
        alert('Ubicación incorrecta.');
      }
    });
  } else {
    showModal(modal, overlay);
  }
}
function showUserInfo() {
  const nameProfile = document.querySelector('.nameProfile');
  const modeProfile = document.querySelector('.modeProfile');
  const userName = sessionStorage.getItem('user');
  const permission = sessionStorage.getItem('permission');

  nameProfile.innerHTML = userName;
  modeProfile.innerHTML = permission;
}

document.addEventListener('DOMContentLoaded', () => {
  const idUser = sessionStorage.getItem('id_user');
  const sku = document.getElementById('sku-pallet');
  const origin = document.getElementById('ubication-pallet');
  const description = document.getElementById('description-pallet');
  const freshness = document.getElementById('freshness-pallet');
  const dueDate = document.getElementById('due-date-pallet');
  const qr = document.getElementById('qr-pallet-verify');
  const destination = document.getElementById('pallet-destination');
  const btnVerify = document.getElementById('btn-verify');
  const btnFail = document.getElementById('btn-fail');
  const qr_current = document.getElementById('qr-pallet');
  const hiddenModal = document.querySelector('.close');
  const process = {
    error: 'error',
    completed: 'completado',
  };

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
  showUserInfo();

  hiddenModal.addEventListener('click', () => {
    const modal = document.getElementById('modalExito');
    const overlay = document.getElementById('overlay');
    closeModal(modal, overlay);
    qr_current.value = '';
    qr_current.focus();
  });

  btnVerify.addEventListener('click', () => {
    verifyQRPallet(qr.value, qr_current.value);
  });

  btnFail.addEventListener('click', () => {
    palletNotFound(qr.value, process.error, idUser);
  });
});
