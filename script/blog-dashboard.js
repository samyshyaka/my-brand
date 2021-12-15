let tableBody = document.querySelector('tbody');
let addArticle = document.querySelector('.add-article');
let popup = document.querySelector(".popup");
let cancel = document.getElementById('cancel');
let form = document.querySelector('form');

let toolbarOptions = [
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

let quill = new Quill('#editor', {
    modules: {
        toolbar: toolbarOptions
    },

    theme: 'snow'
});

// $('#saveDelta').click(()=>{
//     let editorContentHtml = quill.root.innerHTML;

//     $('#editorContent').html(justHtml);
// })

let article_ref = db.ref('articles/')

 // write data

function save(id, title, author, content) {
    article_ref.child(id).set({
        id:id,
        title: title,
        author: author,
        content:content
    })
  }

addArticle.addEventListener('click', () => {
    popup.classList.add('active');
    form.addEventListener('submit', e => {
        e.preventDefault();
        save(form.id.value, form.title.value, form.author.value, quill.root.innerHTML)
        popup.classList.remove('active');
    })
})

  //read

function read() {
    article_ref.on('value', snapshot => {
        let articles = snapshot.val()
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

//cancel

cancel.addEventListener('click', () => {
    popup.classList.remove('active');
    form.reset();
})

// Create new document

 function makeDocument() {
     let newArticle = document.implementation.createHTMLDocument("blogArticle");
     article_ref.on('value', snapshot => {
         let articles = snapshot.val()
         for (let article in articles){
             let h2 = newArticle.createElement("h2");
             let h4 = newArticle.createElement("h4");
             h2.textContent = articles[article].title;
             h4.textContent = "Written by " + articles[article].title;
             let parser = new DOMParser();
             let p = parser.parseFromString(articles[article].content, 'text/html')
             newArticle.body.append(h2, h4, p.body.children[0])
         }    
     })

     console.log(newArticle);
 }

 makeDocument();