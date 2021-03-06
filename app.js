const userCardTemplate = document.querySelector('[data-user-template]');
const userCardContainer = document.querySelector('[data-user-cards-container]');
const searchInput = document.querySelector('[data-search]');

let users = [];

// Searchbar functionality
searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase( );
    users.forEach(user => {
        const isVisible = user.name.toLowerCase().includes(value) || 
        user.email.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    })
})

// Populate doocument with fake data
fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const userName = card.querySelector('[data-name]');
            const userEmail = card.querySelector('[data-email]');
            userName.textContent = user.name;
            userEmail.textContent = user.email;
            userCardContainer.append(card);
            return {name: user.name, email: user.email, element: card};
        });
    })