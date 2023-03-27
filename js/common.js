// ------------adding toggling functionality for navbar--------------------------

const togglebtn = document.querySelector('.toggle-btn');
const togglebtnIcon = document.querySelector('.toggle-btn i');
const dropdown = document.querySelector('.dropdown-menu');
togglebtn.onclick = ()=>{
    dropdown.classList.toggle('open')
    const isOpen = dropdown.classList.contains('open')

    togglebtnIcon.classList = isOpen ? 'fa-solid fa-xmark' :'fa-solid fa-bars'
    
}

// ------------ending toggling functionality for navbar--------------------------