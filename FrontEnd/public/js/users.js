const buttonAdd = document.getElementById("addUser");
const modalAddUser = document.getElementById("modalAddUser");
const modalUpdateUser = document.getElementById("modalUpdateUser");
const modalDeleteUser = document.getElementById("modalDeleteUser");
const closeAddUser = document.getElementById("closeAddUser");
const closeUpdateUser = document.getElementById("closeUpdateUser");
const boxNoDelete = document.querySelector(".boxNoDelete");
const boxYesDelete = document.querySelector(".boxYesDelete");
const overlay = document.getElementById("overlay");
const userCreate = document.getElementById("userCreate");
const userUpdate = document.getElementById('userUpdate');
const showPasswordButton = document.getElementById('showPassword');
const permissionUser = document.querySelector('.permissionUser');

document.addEventListener("DOMContentLoaded", () => {
  tableUsers();
  showUserInfo();
  colorPermission();

  buttonAdd.addEventListener("click", () => {
    showModal(modalAddUser, overlay);
  });

  closeAddUser.addEventListener("click", () => {
    closeModal(modalAddUser, overlay);
  });

  closeUpdateUser.addEventListener("click", () => {
    closeModal(modalUpdateUser, overlay);
  });

  userCreate.addEventListener("click", (event) => {
    event.preventDefault();
    createUser();
    closeModal(modalAddUser, overlay);
    tableUsers();
    activateBarSuccess();
  });

  userUpdate.addEventListener('click', async (event) => {
    event.preventDefault();

    const permission = document.getElementById('permissionUUpdate').value;
    const name_user = document.getElementById('updateNombres').value;
    const last_name_user = document.getElementById('updateApellidos').value;
    const password = document.getElementById('updateConreseña').value;

    const response = await fetch(`/updateUser/${selectedDNI}`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        name_user: name_user,
        last_name_user: last_name_user,
        permission: permission
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Usuario actualizado:', result);
      tableUsers();
      closeModal(modalUpdateUser, overlay);
    } else {
      console.error('Error al actualizar el usuario');
    }
  });

  boxNoDelete.addEventListener("click", () => {
    closeModal(modalDeleteUser, overlay);
  });

  boxYesDelete.addEventListener("click", () => {
    deleteUser();
    closeModal(modalDeleteUser, overlay);
    tableUsers();
    activateBarSuccess();
  })

  if (showPasswordButton) {
    showPasswordButton.addEventListener('mousedown', function () {
      document.getElementById('updateConreseña').type = 'text';
    });

    showPasswordButton.addEventListener('mouseup', function () {
      document.getElementById('updateConreseña').type = 'password';
    });

    showPasswordButton.addEventListener('mouseleave', function () {
      document.getElementById('updateConreseña').type = 'password';
    });
  }
});

let selectedDNI;

function showModal(modal, overlay) {
  modal.style.display = "block";
  overlay.style.display = "block";
}

function closeModal(modal, overlay) {
  modal.style.display = "none";
  overlay.style.display = "none";
}

function tableUsers() {
  const token = localStorage.getItem('token');
  fetch("/dataUsers", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("dataUsuarios");
      tbody.innerHTML = "";

      data.users.forEach((registro) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${registro.user}</td>
          <td class="userDNI">${registro.dni}</td>
          <td>${registro.name_user}</td>
          <td>${registro.last_name_user}</td>
          <td class="permissionUser">${registro.permission}</td>
          <td class="iconTable"><span class="material-symbols-rounded editUser">edit</span></td>
          <td class="iconTable"><span class="material-symbols-rounded deleteUser">delete</span></td>
        `;

        tr.querySelector(".editUser").addEventListener("click", () => {
          selectedDNI = tr.querySelector('.userDNI').textContent;
          showModal(modalUpdateUser, overlay);

          document.getElementById('updateConreseña').value = '';
          document.getElementById('updateNombres').value = registro.name_user;
          document.getElementById('updateApellidos').value = registro.last_name_user;
          document.getElementById('permissionUUpdate').value = registro.permission;
        });

        tr.querySelector(".deleteUser").addEventListener("click", () => {
          selectedDNI = tr.querySelector(".userDNI").textContent;
          showModal(modalDeleteUser, overlay);
          console.log("click", selectedDNI);
        });

        tbody.appendChild(tr);
      });

      colorPermission();
    })
    .catch((error) => console.error("Error al cargar los datos:", error));
}

function createUser() {
  const dni = document.getElementById("dni").value;
  const user = document.getElementById("nombreUsuario").value;
  const password = document.getElementById("contraseña").value;
  const name_user = document.getElementById("nombre").value;
  const last_name_user = document.getElementById("apellido").value;
  const permission = document.getElementById("permissionUAdd").value;

  fetch("/addUser", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      dni,
      user,
      password,
      name_user,
      last_name_user,
      permission,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Usuario creado:", data);
      clearForm();
    })
    .catch((error) => {
      console.error("Error al crear el usuario:", error);
    });
}

function deleteUser() {
  const response = fetch(`/updateUser/${selectedDNI}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = response.json();
    console.log("Usuario eliminado:", result);
    // alert("Usuario eliminado");
    console.log(result.message);
  } else {
    console.error("Error al actualizar el usuario");
  }
}

function clearForm() {
  document.getElementById('dni').value = '';
  document.getElementById('nombreUsuario').value = '';
  document.getElementById('contraseña').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
  document.getElementById('permissionUAdd').selectedIndex = 0;
}

function activateBarSuccess() {
  const barSuccess = document.querySelector(".barSuccess");
  if (barSuccess) {
    barSuccess.classList.add("activate");
    setTimeout(() => {
      barSuccess.classList.remove("activate");
    }, 2000); // 2000 ms = 2 seconds
  }
}

function showUserInfo() {
  const nameProfile = document.querySelector('.nameProfile');
  const modeProfile = document.querySelector('.modeProfile');
  const userName = sessionStorage.getItem('user');
  const permission = sessionStorage.getItem('permission');

  if (nameProfile && modeProfile) {
    nameProfile.innerHTML = userName;
    modeProfile.innerHTML = permission;
  }
}

function colorPermission() {
  const permissions = document.querySelectorAll('.permissionUser');
  permissions.forEach(permission => {
    if (permission.textContent === 'administrador') {
      permission.classList.add('colorAdministrador');
    } else {
      permission.classList.add('colorOperador');
    }
  });
}
