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
function showDetailPallet(ubication) {
  const boxPallets = document.querySelector('.boxPallets');
  const h1 = document.querySelector('h1');
  const destinationProduct = document.createElement('div');

  h1.innerText = 'Dejar Pallet';

  destinationProduct.classList.add('destination-product');
  destinationProduct.innerHTML = `
  <div class="formSupply">
    <div class="infoProducts">
      <h4>Ubicación</h4>
      <p>${ubication}</p>
    </div>
    <div class="infoProducts">
      <h4>Confirme ubicación</h4>
      <input type="text"/>
    </div>
  <div class="buttonSupply">
    <div class="check">
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

document.addEventListener('DOMContentLoaded', () => {
  showUserInfo();
  const ok = document.getElementById('ok');
  const hiddenModal = document.querySelector('.close');
  const modal = document.getElementById('modalExito');
  const overlay = document.getElementById('overlay');

  hiddenModal.addEventListener('click', () => {
    const qrPallet = document.getElementById('qr-pallet');
    closeModal(modal, overlay);
    qrPallet.value = '';
    qrPallet.focus();
  });

  ok.addEventListener('click', () => {
    const ubication = document.getElementById('pallet-destination').value;
    const qrPallet = document.getElementById('qr-pallet');
    const qrPalletVerify = document.getElementById('qr-pallet-verify').value;
    const product = document.getElementById('get-pending-product');

    if (
      qrPallet.value !== '' &&
      qrPallet.value.toUpperCase() === qrPalletVerify.toUpperCase()
    ) {
      hidePendingProduct(product);
      showDetailPallet(ubication);
    } else {
      showModal(modal, overlay);
    }
  });
});

function showUserInfo() {
  const nameProfile = document.querySelector('.nameProfile')
  const modeProfile = document.querySelector('.modeProfile')
  const userName = sessionStorage.getItem('user')
  const permission = sessionStorage.getItem('permission')

  nameProfile.innerHTML = userName
  modeProfile.innerHTML = permission
  
}