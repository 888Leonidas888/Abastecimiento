document.addEventListener("DOMContentLoaded", () => {
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
  const userUpdate = document.getElementById("userUpdate");

  tableUsers();

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
  });

  userUpdate.addEventListener("click", async (event) => {
    event.preventDefault();
    updateUser();
  });

  boxNoDelete.addEventListener("click", () => {
    closeModal(modalDeleteUser, overlay);
  });

  boxYesDelete.addEventListener("click", () => {
    deleteUser();
    closeModal(modalDeleteUser, overlay);
  });

  // document.getElementById('hola').addEventListener('click', () => {
  //   activateBarSuccess();
  // });

  // userUpdate.addEventListener('click', async (event) => {
  //   event.preventDefault();

  //   const permission = document.getElementById('permissionUUpdate').value;
  //   const name_user = document.getElementById('updateNombres').value;
  //   const last_name_user = document.getElementById('updateApellidos').value;
  //   const password = document.getElementById('updateConreseña').value;

  //   const response = await fetch(`/updateUser/${selectedDNI}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       password: password,
  //       name_user: name_user,
  //       last_name_user: last_name_user,
  //       permission: permission
  //     })
  //   });

  //   if (response.ok) {
  //     const result = await response.json();
  //     console.log('Usuario actualizado:', result);
  //     tableUsers();
  //     closeModal(modalUpdateUser, overlay);
  //   } else {
  //     console.error('Error al actualizar el usuario');
  //   }
  // });
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
  const token = localStorage.getItem('token')
  fetch("/dataUsers", {
    method: "GET",
    headers: {
      "Authentication": token,
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
                    <td><span class="material-symbols-rounded editUser">edit</span></td>
                    <td class="userDNI disguise">${registro.dni}</td>
                    <td>${registro.user}</td>
                    <td class="disguise">${registro.name_user}</td>
                    <td class="disguise">${registro.last_name_user}</td>
                    <td>${registro.permission}</td>
                    <td><span class="material-symbols-rounded deleteUser">delete</span></td>
                  `;

        tr.querySelector(".editUser").addEventListener("click", () => {
          selectedDNI = tr.querySelector(".userDNI").textContent;
          showModal(modalUpdateUser, overlay);

          document.getElementById("updateConreseña").value = "";
          document.getElementById("updateNombres").value = registro.name_user;
          document.getElementById("updateApellidos").value =
            registro.last_name_user;
          document.getElementById("permissionUUpdate").value =
            registro.permission;
        });

        tr.querySelector(".deleteUser").addEventListener("click", () => {
          selectedDNI = tr.querySelector(".userDNI").textContent;
          showModal(modalDeleteUser, overlay);
          console.log("click", selectedDNI);
        });

        tbody.appendChild(tr);
      });
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
      "Content-Type": "application/json",
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
      tableUsers();
      activateBarSuccess();
      clearForm();
      closeModal(modalAddUser, overlay);
    })
    .catch((error) => {
      console.error("Error al crear el usuario:", error);
    });
}

async function updateUser() {
  const permission = document.getElementById("permissionUUpdate").value;
  const name_user = document.getElementById("updateNombres").value;
  const last_name_user = document.getElementById("updateApellidos").value;
  const password = document.getElementById("updateConreseña").value;

  const response = await fetch(`/updateUser/${selectedDNI}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      name_user: name_user,
      last_name_user: last_name_user,
      permission: permission,
    }),
  });

  if (response.ok) {
    const result = await response.json();
    console.log("Usuario actualizado:", result);
    tableUsers();
    closeModal(modalUpdateUser, overlay);
    console.log(result.message);
  } else {
    console.error("Error al actualizar el usuario");
  }
}

async function deleteUser() {
  const response = await fetch(`/updateUser/${selectedDNI}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    console.log("Usuario eliminado:", result);
    // alert("Usuario eliminado");
    activateBarSuccess();
    tableUsers();
    console.log(result.message);
  } else {
    console.error("Error al actualizar el usuario");
  }
}

function clearForm() {
  document.getElementById("dni").value = "";
  document.getElementById("nombreUsuario").value = "";
  document.getElementById("contraseña").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("permissionUAdd").selectedIndex = 0;
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
