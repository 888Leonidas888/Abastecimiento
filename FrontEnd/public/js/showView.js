function renderViewOperator(boxOptions) {
  boxOptions.innerHTML = `
    <a href="/supply" class="supply">
        <div class="boxSupply">
          <h3>Abastecimiento</h3>
          <span class="material-symbols-rounded"> forklift </span>
        </div>
      </a>
    `;
}

function renderViewAdministrator(boxOptions) {
  boxOptions.innerHTML = `
      <a href="/products" class="products">
        <div class="boxProducts">
          <h3>Carga productos</h3>
          <span class="material-symbols-rounded"> description </span>
        </div>
      </a>
      <a href="/users" class="users">
        <div class="boxUsers">
          <h3>Usuarios</h3>
          <span class="material-symbols-rounded"> manage_accounts </span>
        </div>
      </a>
    `;
}

function showUserInfo() {
  const nameProfile = document.querySelector('.nameProfile')
  const modeProfile = document.querySelector('.modeProfile')
  const userName = sessionStorage.getItem('user')
  const permission = sessionStorage.getItem('permission')

  nameProfile.innerHTML = userName
  modeProfile.innerHTML = permission
  
}


document.addEventListener('DOMContentLoaded', () => {
  showUserInfo();
  const boxOptions = document.querySelector('.boxOptions');
  const permission = sessionStorage.getItem('permission');

  if (permission === 'administrador') {
    renderViewAdministrator(boxOptions);
  } else {
    renderViewOperator(boxOptions);
  }
});
