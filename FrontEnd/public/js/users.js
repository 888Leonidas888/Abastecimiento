document.addEventListener("DOMContentLoaded", () => {
  const buttonAdd = document.getElementById("addUser");
  const modalAddUser = document.getElementById("modalAddUser");
  const modalUpdateUser = document.getElementById("modalUpdateUser");
  const closeAddUser = document.getElementById("closeAddUser");
  const closeUpdateUser = document.getElementById("closeUpdateUser");
  const overlay = document.getElementById("overlay");

  tableUsers();

  if (buttonAdd) {
    buttonAdd.addEventListener("click", () => {
      showModal(modalAddUser, overlay);
    });
  }

  if (closeAddUser) {
    closeAddUser.addEventListener("click", () => {
      closeModal(modalAddUser, overlay);
    });
  }

  if (closeUpdateUser) {
    closeUpdateUser.addEventListener("click", () => {
      closeModal(modalUpdateUser, overlay);
    });
  }

});

function showModal(modal, overlay) {
  modal.style.display = "block";
  overlay.style.display = "block";
}

function closeModal(modal, overlay) {
  modal.style.display = "none";
  overlay.style.display = "none";
}

function tableUsers() {
  fetch("/dataUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("dataUsuarios");
      tbody.innerHTML = ''; // Limpiar tabla antes de agregar nuevas filas

      data.users.forEach((registro) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
                    <td><span class="material-symbols-rounded editUser">edit</span></td>
                    <td>${registro.dni}</td>
                    <td>${registro.user}</td>
                    <td>${registro.name_user}</td>
                    <td>${registro.last_name_user}</td>
                    <td>${registro.permission}</td>
                    <td>
                        <span class="material-symbols-rounded deleteUser">delete</span>
                    </td>
                  `;

        // Añadir event listeners a los nuevos elementos
        tr.querySelector(".editUser").addEventListener("click", () => {
          showModal(modalUpdateUser, overlay);
          // Aquí podrías cargar los datos del usuario seleccionado en el modal de actualización
        });

        tr.querySelector(".deleteUser").addEventListener("click", () => {
          // Aquí podrías implementar la funcionalidad para eliminar el usuario
        });

        tbody.appendChild(tr);
      });
    })
    .catch((error) => console.error("Error al cargar los datos:", error));
}
