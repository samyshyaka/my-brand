let tableBody = document.querySelector('tbody');
let addArticle = document.querySelector('.add-article');
let popup = document.querySelector(".popup");
let cancel = document.getElementById('cancel');
let form = document.querySelector('form');

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{'header': [1,2,3,4,5,6,false]}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rt1'}],
    [{'size': ['small', false, 'large', 'huge']}],
    ['link', 'image', 'video', 'formula'],
    [{'color': []}, {'background': []}],
    [{'font': []}],
    [{'align': []}]
]

var quill = new Quill('#editor', {
    modules: {
        toolbar: toolbarOptions
    },

    theme: 'snow'
});

// $('#saveDelta').click(()=>{
//     var editorContentHtml = quill.root.innerHTML;

//     $('#editorContent').html(justHtml);
// })

var article_ref = db.ref('articles/')

function save(id, title, author, content) {
    article_ref.child(id).set({
        id:id,
        title: title,
        author: author,
        content:content
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
                            quill.root.innerHTML = snapshot.val().content;
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
                    content: quill.root.innerHTML
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
var editorContentHtml = quill.root.innerHTML;
        save(form.id.value, form.title.value, form.author.value, quill.root.innerHTML)
        popup.classList.remove('active');
    })
})

//cancel

cancel.addEventListener('click', () => {
    popup.classList.remove('active');
    form.reset();
})