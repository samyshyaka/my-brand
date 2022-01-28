let tableBody = document.querySelector('tbody');
let addArticle = document.querySelector('.add-article');
let popup = document.querySelector(".popup");
let cancel = document.getElementById('cancel');
let form = document.querySelector('form');
let logout = document.getElementById('logout');

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

addArticle.addEventListener('click', () => {
    popup.classList.add('active');
    form.addEventListener('submit', e => {
        e.preventDefault();
        postArticle(form.title.value, form.author.value, quill.root.innerText)
        popup.classList.remove('active');
    })
})

const token = localStorage.getItem('token')

function postArticle(title, author, content) {
    fetch('https://shyaka-portfolio.herokuapp.com/api/v1/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            title: title,
            author: author,
            content: content
        })
    })
    .then(res => res.json())
    .then(article => {
        if(article.code == 201){
            document.location.reload();
        }
        toastr.warning(article.message, "Warning!")
        console.log(article)
    })
}

  //Display article function

function displayArticle() {
    let z = 0;
    fetch('https://shyaka-portfolio.herokuapp.com/api/v1/articles', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then(articles => {
        if(articles.code == 200){
            const sortedArticles = articles.data.articles.sort((a,b) => new Date(b.date) - new Date(a.date))
            sortedArticles.forEach(article => {
                z++

                const tr = document.createElement('tr')
                tr.dataset.id = article._id

                const no = document.createElement('td')  
                no.textContent = z;
                
                const title = document.createElement('td')
                title.textContent = article.title

                const author = document.createElement('td')
                author.textContent = article.author

                const td = document.createElement('td')

                const editBtn = document.createElement('button')
                editBtn.textContent = 'Edit'
                editBtn.setAttribute('class', 'edit')

                const deleteBtn = document.createElement('button')
                deleteBtn.textContent = 'Delete'
                deleteBtn.setAttribute('class', 'delete')

                tableBody.appendChild(tr)
                tr.appendChild(no)
                tr.appendChild(title)
                tr.appendChild(author)
                tr.appendChild(td)
                td.appendChild(editBtn)
                td.appendChild(deleteBtn)
            });
        }

    let editBtns = document.querySelectorAll('.edit');
    editBtns.forEach(edit => {
        let articleId = edit.parentElement.parentElement.dataset.id;
        edit.addEventListener('click', () => {
            popup.classList.add('active');
            console.log(articleId)
                fetch('https://shyaka-portfolio.herokuapp.com/api/v1/articles/' + articleId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(res => res.json())
                .then(article => {
                            form.title.value = article.data.article.title;
                            form.author.value = article.data.article.author;
                            quill.root.innerText = article.data.article.content;
                })

                form.addEventListener('submit', e => {
                    e.preventDefault();
                    fetch('https://shyaka-portfolio.herokuapp.com/api/v1/articles/' + articleId, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            author: form.author.value,
                            content: quill.root.innerText
                        })
                    })
                    .then(res => res.json())
                    .then(article => {
                        if(article.code == 200){
                            toastr.success("Edited successfully", "Success")
                            popup.classList.remove('active');
                        }
                        console.log(article)
                    })
                    
    
                })
                
            })

        })


    

    let deleteBtns = document.querySelectorAll('.delete');
    
        deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', () => {
                toastr.success("<br /><br /><button type='button' id='confirmationRevertYes' class='btn clear'>Yes</button>",'delete item?',
                    {
                        closeButton: true,
                        allowHtml: true,
                        onShown: function (toast) {
                            $("#confirmationRevertYes").click(function(){
                                let articleId = deleteBtn.parentElement.parentElement.dataset.id;
                                    fetch('https://shyaka-portfolio.herokuapp.com/api/v1/articles/' + articleId, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        },
                                    })
                                    .then(res => res.json())
                                    .then(data => {
                                        if(data.code == 200){
                                            toastr.success("Successfully Deleted", "Success")
                                        }
                                        console.log(data)
                                    })
                            });
                            }
                    });
                
            })

        })


    })
    
}

displayArticle();

cancel.addEventListener('click', () => {
    popup.classList.remove('active');
    form.reset();
})