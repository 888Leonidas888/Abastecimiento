document.addEventListener('DOMContentLoaded', () => {
    const buttonAdd = document.getElementById('addUser');
    const buttonEdit = document.getElementById('editUser');
    const modalAddUser = document.getElementById('modalAddUser')
    const modalUpdateUser = document.getElementById('modalUpdateUser')
    const closeAddUser = document.getElementById('closeAddUser')
    const closeUpdateUser = document.getElementById('closeUpdateUser')
    const overlay = document.getElementById('overlay')

    buttonAdd.addEventListener('click', () => {
        showModal (modalAddUser, overlay);
    });

    closeAddUser.addEventListener('click', () => {
        closeModal (modalAddUser, overlay);
    });

    buttonEdit.addEventListener('click', () => {
        showModal (modalUpdateUser, overlay);
    });

    closeUpdateUser.addEventListener('click', () => {
        closeModal (modalUpdateUser, overlay);
    });


});

function showModal (modal, overlay) {
    modal.style.display = 'block'
    overlay.style.display = 'block'
};

function closeModal (modal, overlay) {
    modal.style.display = 'none'
    overlay.style.display = 'none'
};