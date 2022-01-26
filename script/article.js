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
        h1.textContent = article.data.article.title
            
        const h4 = document.createElement('h4')
        h4.textContent = article.data.article.author
            
        const p = document.createElement('p')
        p.textContent = article.data.article.content
            
        const commentSection = document.createElement('div')
        const articleComments = document.createElement('h2')
        articleComments.textContent = 'Comments'
            
        const commentForm = document.createElement('form')
        
        const nameInput = document.createElement('input')
            nameInput.type = 'text'
            nameInput.placeholder = 'Name'
        
        const commentInput = document.createElement('textarea')
        const sendComment = document.createElement('input')
            sendComment.type = 'submit';
            sendComment.value = 'Send'    

        commentForm.addEventListener('submit', (e) => {
            console.log('wassup')
            e.preventDefault();
            postComment(nameInput.value, commentInput.value)
        })

        const login = document.createElement('a')
        login.textContent = 'login'

        login.addEventListener('click', () => {
            localStorage.setItem('url', window.location.href)
            window.location = 'article-login.html'
        })
        
        commentForm.appendChild(nameInput)
        commentForm.appendChild(commentInput)
        commentForm.appendChild(sendComment)

        section.appendChild(h1)
        section.appendChild(h4)
        section.appendChild(p)
        section.appendChild(commentSection)
        commentSection.appendChild(articleComments)
        commentSection.appendChild(commentForm)
        commentSection.appendChild(login)
            
        article.data.article.comments.forEach(comment => {
            
            const id = comment;
            
            fetch('https://shyaka-portfolio.herokuapp.com/api/v1/comments/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(comments => {
                
                const name = document.createElement('h4')
                name.textContent = comments.data.comment.name
                
                const comment = document.createElement('p')
                comment.textContent = comments.data.comment.comment
                                    
                commentSection.appendChild(name)
                commentSection.appendChild(comment)
                                    
            })
        })               
            
        
    }
})
            
