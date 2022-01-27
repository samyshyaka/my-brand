const section = document.getElementById('section')

const articleId = localStorage.getItem('articleId')

const token = localStorage.getItem('token')

function postComment(name, comment) {
    fetch('https://shyaka-portfolio.herokuapp.com/api/v1/articles/'+ articleId +'/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name,
            comment: comment
        })
    })
    .then(res => res.json())
    .then(comment => {
        if(comment.code == 201){
            document.location.reload();
        }
        toastr.warning(comment.message, "Warning!")
        console.log(comment)
    })
}

fetch('https://shyaka-portfolio.herokuapp.com/api/v1/articles/' + articleId, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then(res => res.json())
.then(article => {           
    if(article.code == 200){        

        const h1 = document.createElement('h1')
        h1.setAttribute('class', 'title')
        h1.textContent = article.data.article.title
            
        const h4 = document.createElement('h4')
        h4.setAttribute('class', 'author')
        h4.textContent = article.data.article.author
            
        const p = document.createElement('p')
        p.setAttribute('class', 'content')
        p.textContent = article.data.article.content
            
        const commentSection = document.createElement('div')
        commentSection.setAttribute('class', 'commentSection')
        const articleComments = document.createElement('h2')
        articleComments.setAttribute('class', 'articleComments')
        articleComments.textContent = 'Comments'
            
        const commentForm = document.createElement('form')
        
        const nameInput = document.createElement('input')
            nameInput.setAttribute('class', 'nameInput')
            nameInput.type = 'text'
            nameInput.placeholder = 'Name'
        
        const commentInput = document.createElement('input')
            commentInput.setAttribute('class', 'commentInput')
            commentInput.type = 'text'
            commentInput.placeholder = 'Comment'
        const sendComment = document.createElement('input')
            sendComment.setAttribute('class', 'sendComment')
            sendComment.type = 'submit';
            sendComment.value = 'Send'    

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            postComment(nameInput.value, commentInput.value)
        })

        const login = document.createElement('a')
        login.textContent = 'login'
        login.setAttribute('href', 'article-login.html')
        login.setAttribute('class', 'login-link')

        const logout = document.createElement('a')
        logout.textContent = 'logout'
        logout.setAttribute('class', 'logout-link')

        logout.addEventListener('click', (e) => {
            e.preventDefault()
            localStorage.removeItem('token')
            document.location.reload();
        })

        const loginText = document.createElement('span')
        loginText.textContent = ' , to join the conversation'
        loginText.setAttribute('class', 'loginText')
        
        commentForm.appendChild(nameInput)
        commentForm.appendChild(commentInput)
        commentForm.appendChild(sendComment)

        const sortedComments = article.data.article.comments.sort((a,b) => new Date(a.date) - new Date(b.date))
            
        sortedComments.forEach(comment => {
            
            const id = comment;
            
            fetch('https://shyaka-portfolio.herokuapp.com/api/v1/comments/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(comments => {

                const commentId = comments.data.comment._id
                
                const name = document.createElement('h4')
                name.setAttribute('class', 'cname')
                name.textContent = comments.data.comment.name
                
                const comment = document.createElement('p')
                comment.setAttribute('class', 'comment')
                comment.textContent = comments.data.comment.comment

                const commentAndDropdown = document.createElement('div')
                commentAndDropdown.setAttribute('class', 'commentAndDropdown')

                const singleComment = document.createElement('div')

                commentSection.appendChild(commentAndDropdown)

                commentAndDropdown.appendChild(singleComment)
                
                singleComment.appendChild(name)
                singleComment.appendChild(comment)

                const dropdownContainer = document.createElement('div')
                dropdownContainer.setAttribute('class', 'dropdown-container')
                dropdownContainer.setAttribute('tabindex', '-1')

                const threeDots = document.createElement('div')
                threeDots.setAttribute('class', 'three-dots')

                const dropdown = document.createElement('dropdown')
                dropdown.setAttribute('class', 'dropdown')

                const editComment = document.createElement('a')
                editComment.textContent = 'Edit'

                editComment.addEventListener('click', (e) => {
                    e.preventDefault()
                    fetch('https://shyaka-portfolio.herokuapp.com/api/v1/comments/' + commentId, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(res => res.json())
                    .then(comment => {
                        nameInput.value = comment.data.comment.name;
                        commentInput.value = comment.data.comment.comment;
                    })

                    commentForm.addEventListener('submit', e => {
                        e.preventDefault();
                        fetch('https://shyaka-portfolio.herokuapp.com/api/v1/comments/' + commentId, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                name: nameInput.value,
                                comment: commentInput.value
                            })
                        })
                        .then(res => res.json())
                        .then(comment => {
                            if(comment.code == 200){
                                document.location.reload();
                            }
                            console.log(comment)
                        })
                        
        
                    })
                })

                const deleteComment = document.createElement('a')
                deleteComment.textContent = 'Delete'

                deleteComment.addEventListener('click', (e) => {
                    e.preventDefault()
                    fetch('https://shyaka-portfolio.herokuapp.com/api/v1/comments/' + commentId, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    })
                    .then(res => res.json())
                    .then(comment => {
                        if(comment.code == 200){
                            document.location.reload();
                        }
                        console.log(comment)
                    })
                })

                commentAndDropdown.appendChild(dropdownContainer)

                dropdownContainer.appendChild(threeDots)
                dropdownContainer.appendChild(dropdown)

                dropdown.appendChild(editComment)
                dropdown.appendChild(deleteComment)


                if (token !== null && comments.status == 'success') {
                    login.classList.add('loggedIn');
                    loginText.classList.add('loggedIn');
                    logout.classList.add('loggedIn');
                }
                                    
            })
        })   
        
        section.appendChild(h1)
        section.appendChild(h4)
        section.appendChild(p)
        section.appendChild(commentSection)
        section.appendChild(logout)
        commentSection.appendChild(articleComments)
        commentSection.appendChild(commentForm)
        commentSection.appendChild(login)
        commentSection.appendChild(loginText)
            
        
    }
})
            
