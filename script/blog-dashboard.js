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

  //read

function read() {
    article_ref.on('value', snapshot => {
        var articles = snapshot.val()
        tableBody.innerHTML = ""
        for (let article in articles){
            let tr = `
                <tr data-id = '${article}'>
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
        
        
        //update

        let editButtons = document.querySelectorAll('.edit');
        editButtons.forEach(edit => {
            edit.addEventListener('click', () => {
                popup.classList.add('active');
                let articleId = edit.parentElement.parentElement.dataset.id;
                article_ref.child(articleId).get().then(
                    (snapshot => {
                            form.id.value = snapshot.val().id;
                            form.title.value = snapshot.val().title;
                            form.author.value = snapshot.val().author;
                            form.text.value = snapshot.val().text;
                    })
                )
            })

            form.addEventListener('submit', e => {
                e.preventDefault();
                let articleId = form.id.value;
                article_ref.child(articleId).update({
                    id: form.id.value,
                    title: form.title.value,
                    author: form.author.value,
                    text: form.text.value
                })
               
            })
            popup.classList.remove('active');
        })

        //delete

        let deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', () => {
                let articleId = deleteBtn.parentElement.parentElement.dataset.id;
                article_ref.child(articleId).remove()
            })
 
        })
    });
}

read();

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
    form.reset();
})