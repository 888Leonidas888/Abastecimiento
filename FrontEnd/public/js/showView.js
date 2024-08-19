function renderViewOperator(boxOptions) {
  boxOptions.innerHTML = `
      <a href="/supply" class="supply" id="supplyLink">
        <div class="boxSupply">
          <div class="boxSpan">
            <span class="material-symbols-rounded forklift"> forklift </span>
            <div class="boxTittle">
              <h3>Abastecimiento</h3>
              <p>Gestión de productos</p>
            </div>
          </div>
          <div class="boxArrow">
            <span class="material-symbols-rounded forklift"> arrow_forward </span>
          </div>
        </div>
      </a>
    `;
}

function renderViewAdministrator(boxOptions) {
  boxOptions.innerHTML = `
      <a href="/products" class="products" id="supplyLink">
        <div class="boxProducts">
          <div class="boxSpan">
            <span class="material-symbols-rounded description"> description </span>
            <div class="boxTittle">
              <h3>Carga productos</h3>
              <p>Importa lista de productos</p>
            </div>
          </div>
          <div class="boxArrow">
            <span class="material-symbols-rounded description"> arrow_forward </span>
          </div>
        </div>
      </a>
      <a href="/users" class="users" id="supplyLink">
        <div class="boxUsers">
          <div class="boxSpan">
            <span class="material-symbols-rounded manage_accounts"> manage_accounts </span>
            <div class="boxTittle">
              <h3>Usuarios</h3>
              <p>Crea, edita y elimina usuarios</p>
            </div>
          </div>
          <div class="boxArrow">
            <span class="material-symbols-rounded manage_accounts"> arrow_forward </span>
          </div>
        </div>
      </a> 
    `;
}

function showUserInfo() {
  const nameProfile = document.querySelector(".nameProfile");
  const modeProfile = document.querySelector(".modeProfile");
  const userName = sessionStorage.getItem("user");
  const permission = sessionStorage.getItem("permission");

  nameProfile.innerHTML = userName;
  modeProfile.innerHTML = permission;
}

function clearSession(button) {
  button.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = '/'
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showUserInfo();
  const boxOptions = document.querySelector(".boxOptions");
  const permission = sessionStorage.getItem("permission");
  const closeSession = document.getElementById('logout');

  if (permission === "administrador") {
    renderViewAdministrator(boxOptions);
  } else {
    renderViewOperator(boxOptions);
  }

  clearSession(closeSession);
});
