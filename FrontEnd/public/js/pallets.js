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
function putPallets(qr_pallet, status, userSession) {
  return new Promise((resolve, reject) => {
    const apiUrl = 'http://localhost:8000/api/v1/pallets';
    const queryParams = {
      qr_pallet: qr_pallet,
    };
    const headers = {
      Authorization: `Bearer ${userSession.token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      status: status,
      id_user: userSession.idUser,
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
function getPallets(userSession) {
  return new Promise((resolve, reject) => {
    const apiUrl = 'http://localhost:8000/api/v1/pallets?status=pendiente';
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${userSession.token}`,
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
function showDetailPallets(fields, userSession, processPallet) {
  getPallets(userSession)
    .then((response) => {
      const pallets = response.data.pallets;
      const countPallets = pallets.length;

      if (countPallets > 0) {
        fields.qr.value = pallets[0].qr_pallet;
        fields.destination.value = pallets[0].destination;
        fields.origin.innerText = pallets[0].origin;
        fields.sku.innerText = pallets[0].sku;
        fields.description.innerText = pallets[0].description;
        fields.dueDate.innerText = pallets[0].due_date;
        fields.freshness.innerText = pallets[0].freshness;

        putPallets(pallets[0].qr_pallet, processPallet.process, userSession)
          .then((r) => {})
          .catch((err) => {
            alert(err.message);
          });
      }
    })
    .catch((err) => {
      alert('No hay mas tareas pendientes.');
      window.location.href = '/menu';
    });
}

/**
 * Updates the status of a pallet in the system and redirects the user to the main menu upon success.
 *
 * This function sends a request to update the status of a specific pallet using its QR code.
 * If the request is successful, the user is redirected to the main menu.
 * In case of an error, an alert is shown with the error message.
 *
 * @param {string} qr_pallet - The QR code of the pallet to update.
 * @param {string} status - The new status to set for the pallet.
 * @param {Object} userSession - The current user session object.
 * @param {string} userSession.token - The authorization token of the user.
 * @param {string} userSession.idUser - The ID of the user making the update.
 *
 * @returns {void}
 */
function palletUpdateState(qr_pallet, status, userSession) {
  putPallets(qr_pallet, status, userSession)
    .then((r) => {
      window.location.href = '/menu';
    })
    .catch((err) => {
      alert(err.message);
    });
}

/**
 * Verifies if the current QR code matches the expected QR code and updates the pallet status accordingly.
 *
 * This function compares the provided QR code with the expected QR code. If they match, it hides the pending product element,
 * displays the pallet's location details, and allows the user to confirm the location. If the locations match, the pallet status
 * is updated to "completed". If the QR codes do not match, a modal with an overlay is shown.
 *
 * @param {string} qr - The expected QR code of the pallet.
 * @param {string} qr_current - The current QR code input by the user.
 * @param {Object} processPallet - An object containing the possible states for the pallet process.
 * @param {string} processPallet.completed - The status value indicating the pallet process is completed.
 * @param {Object} userSession - The current user session object.
 * @param {string} userSession.token - The authorization token of the user.
 * @param {string} userSession.idUser - The ID of the user making the update.
 * @param {HTMLElement} modal - The modal element to display if the QR codes do not match.
 * @param {HTMLElement} overlay - The overlay element to display if the QR codes do not match.
 *
 * @returns {void}
 */
function verifyQRPallet(
  qr,
  qr_current,
  processPallet,
  userSession,
  modal,
  overlay
) {
  const product = document.getElementById('get-pending-product');
  const destination = document.getElementById('pallet-destination');

  if (qr_current !== '' && qr_current.toUpperCase() === qr.toUpperCase()) {
    hidePendingProduct(product);
    showUbicationPallet(destination.value, qr);

    const btnOK = document.getElementById('btn-ok');
    const ubication = document.getElementById('confirm-ubication').innerText;

    btnOK.addEventListener('click', () => {
      const ubicationCurrent =
        document.getElementById('current-ubication').value;
      if (ubication.toUpperCase() === ubicationCurrent.toUpperCase()) {
        palletUpdateState(qr_current, processPallet.completed, userSession);
      } else {
        alert('Ubicación incorrecta.');
      }
    });
  } else {
    showModal(modal, overlay);
  }
}

/**
 * Displays the user's profile information in the UI.
 *
 * This function updates the UI with the user's name and permission level
 * by setting the inner HTML of specific elements with the corresponding values
 * from the `userSession` object.
 *
 * @param {Object} userSession - The current user session object.
 * @param {string} userSession.userName - The name of the user to display.
 * @param {string} userSession.permission - The permission level of the user to display.
 *
 * @returns {void}
 */
function showUserInfo(userSession) {
  const nameProfile = document.querySelector('.nameProfile');
  const modeProfile = document.querySelector('.modeProfile');

  nameProfile.innerHTML = userSession.userName;
  modeProfile.innerHTML = userSession.permission;
}

document.addEventListener('DOMContentLoaded', () => {
  const d = document;
  const processPallet = {
    error: 'error',
    process: 'proceso',
    completed: 'completado',
  };

  const userSession = {
    userName: sessionStorage.getItem('user'),
    permission: sessionStorage.getItem('permission'),
    idUser: sessionStorage.getItem('id_user'),
    token: sessionStorage.getItem('token'),
  };

  const btnVerify = d.getElementById('btn-verify');
  const btnFail = d.getElementById('btn-fail');
  const qr_current = d.getElementById('qr-pallet');
  const hiddenModal = d.querySelector('.close');

  const fields = {
    sku: d.getElementById('sku-pallet'),
    origin: d.getElementById('ubication-pallet'),
    description: d.getElementById('description-pallet'),
    freshness: d.getElementById('freshness-pallet'),
    dueDate: d.getElementById('due-date-pallet'),
    qr: d.getElementById('qr-pallet-verify'),
    destination: d.getElementById('pallet-destination'),
  };

  const modal = d.getElementById('modalExito');
  const overlay = d.getElementById('overlay');

  showDetailPallets(fields, userSession, processPallet);
  showUserInfo(userSession);

  hiddenModal.addEventListener('click', () => {
    closeModal(modal, overlay);
    qr_current.value = '';
    qr_current.focus();
  });

  btnVerify.addEventListener('click', () => {
    verifyQRPallet(
      fields.qr.value,
      qr_current.value,
      processPallet,
      userSession,
      modal,
      overlay
    );
  });

  btnFail.addEventListener('click', () => {
    palletUpdateState(fields.qr.value, processPallet.error, userSession);
  });
});
