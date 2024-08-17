const endPointProducts = 'http://127.0.0.1:8000/api/v1/products';

/**
 * Converts an Excel serial date number to a JavaScript Date object.
 * @param {number} serial - The serial number from Excel representing the date.
 * @returns {Date} - The corresponding JavaScript Date object.
 */
function excelDateToJSDate(serial) {
  const utc_days = serial - 25569;
  const date = new Date(utc_days * 86400 * 1000);
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

/**
 * Displays the modal and overlay.
 * @param {HTMLElement} modal - The modal element to be displayed.
 * @param {HTMLElement} overlay - The overlay element to be displayed.
 */
function showModal(modal, overlay) {
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

/**
 * Hides the modal and overlay.
 * @param {HTMLElement} modal - The modal element to be hidden.
 * @param {HTMLElement} overlay - The overlay element to be hidden.
 */
function closeModal(modal, overlay) {
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

/**
 * Prepares a list of products from the JSON data by formatting it.
 * @param {Object[]} jsonData - The JSON data array from the Excel sheet.
 * @returns {Object[]} - An array of product objects formatted for API submission.
 */
function prepareListProducts(jsonData) {
  return jsonData.map((item) => ({
    sku: item['sku'],
    description: item['description'],
    origin: item['origin'],
    destination: item['destination'],
    due_date: excelDateToJSDate(item['due_date']).toISOString().split('T')[0],
    freshness: item['freshness'],
    qr_pallet: item['qr_pallet'],
  }));
}

/**
 * Reads an Excel file, converts its contents to a JavaScript object, and returns a promise.
 * @returns {Promise<Object>} - A promise that resolves with an object containing the formatted product data.
 * @throws {string} - Throws an error message if no file is selected.
 */
function readExcelConvertToObject() {
  return new Promise((resolve, reject) => {
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const formattedData = prepareListProducts(jsonData);

        // Structured body request
        resolve({
          products: formattedData,
        });
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    } else {
      reject('No file selected.');
    }
  });
}

/**
 * Sends a list of products to the API and updates the modal with the result.
 * @param {Object} body - The request body containing the list of products.
 * @param {HTMLElement} titleModal - The element displaying the modal title.
 * @param {HTMLElement} contentModal - The element displaying the modal content.
 */
function sendListProducts(body, titleModal, contentModal, userSession) {
  const headers = {
    Authorization: `Bearer ${userSession.token}`,
    'Content-Type': 'application/json',
  };

  axios
    .post(endPointProducts, body, { headers })
    .then((response) => {
      console.log('Data successfully sent to the API:', response.data);
      let totalProducts = response.data.total_products;

      totalProducts = totalProducts.replace('to', 'de');
      titleModal.innerText = 'Productos enviados';
      contentModal.innerText = `Total productos: ${totalProducts}.`;
    })
    .catch((error) => {
      console.error('Error sending data to the API:', error);

      titleModal.innerText = 'Ops paso algo';
      contentModal.innerText = error.message;
    });
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
  const userSession = {
    userName: sessionStorage.getItem('user'),
    permission: sessionStorage.getItem('permission'),
    idUser: sessionStorage.getItem('id_user'),
    token: sessionStorage.getItem('token'),
  };

  const overlay = document.querySelector('.overlay');
  const modal = document.getElementById('modalExito');
  const hideModal = document.querySelector('.close');
  const titleModal = document.querySelector('#modalExito h3');
  const contentModal = document.querySelector('#modalExito h4');
  const sendProducts = document.getElementById('send-products');

  showUserInfo(userSession);

  hideModal.addEventListener('click', () => {
    closeModal(modal, overlay);
  });

  sendProducts.addEventListener('click', () => {
    readExcelConvertToObject()
      .then((body) => {
        if (body) {
          sendListProducts(body, titleModal, contentModal, userSession);
          showModal(modal, overlay);
        }
      })
      .catch((error) => {
        console.error('Error reading the Excel file:', error);
        alert('Seleccione un archivo.');
      });
  });
});
