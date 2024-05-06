'use strict';

const posts = document.getElementById('posts');
const uriMockapi = 'https://****';

function templateCard(post) {
    return `
        <div class="card mt-3 mb-3">
            <div class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" class="card-img-top" alt="Fissure in Sandstone"/>
                <a href="#!">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                </a>
            </div>
            <div class="card-body">
                <h5 class="card-title">${post.text}</h5>
                <div class="card-footer text-body-secondary">
                ${post.createdAt}
              </div>            
                <a href="#!" class="btn btn-danger" data-mdb-ripple-init>Edit</a>
            </div>
        </div>
    `;
}

function getPosts() {
    fetch(uriMockapi)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('No se pueden obtener los objetos');
            }
        })
        .then((data) => {
            // Limpiar el array de posts y agregar los nuevos
            const newPosts = data.map((post) => templateCard(post));
            posts.innerHTML = newPosts.join(''); // Unir todos los posts en un solo string
        })
        .catch((err) => {
            console.error(err);
        });
}

getPosts();