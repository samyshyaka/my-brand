let tableBody = document.querySelector('tbody');
let addArticle = document.querySelector('.add-article');
let popup = document.querySelector(".popup");
let cancel = document.getElementById('cancel');
let form = document.querySelector('form');

var article_ref = db.ref('articles/')

function save(id, title, author, text) {
    article_ref.child(id).set({
        id:id,
        title: title,
        author: author,
        text:text
    })
  }

function get() {
    article_ref.on('value', snapshot => {
        var articles = snapshot.val()
        tableBody.innerHTML = ""
        for (article in articles){
            let tr = `
                <tr>
                    <td>${articles[article].id}</td>
                    <td>${articles[article].title}</td>
                    <td>${articles[article].author}</td>
                    <td>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </td>
                </tr>`
            tableBody.innerHTML += tr;
        }
    })
}

get();

function update() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    var say_something = document.getElementById('say_something').value;
    var favorite_food = document.getElementById('favorite_food').value;

    var updates = {
        email: email,
        password: password,
        username: username,
        say_something: say_something,
        favorite_food: favorite_food
    }

    db.ref('users/' + username).update(updates)
    alert('updated')
}

function remove() {
    var username = document.getElementById('username').value;

    db.ref('users/' + username).remove();

    alert('deleted')
}

// write data

addArticle.addEventListener('click', () => {
    popup.classList.add('active');
    form.addEventListener('submit', e => {
        e.preventDefault();
        save(form.id.value, form.title.value, form.author.value, form.text.value)
        popup.classList.remove('active');
    })
})

//cancel

cancel.addEventListener('click', () => {
    popup.classList.remove('active');
})