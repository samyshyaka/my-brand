let blogArticle = document.querySelector('.articles')

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

                const articleId = article._id;

                const column = document.createElement('div')  
                column.setAttribute('class', 'article')
                
                const h1 = document.createElement('h1')
                h1.textContent = article.title

                const h4 = document.createElement('h4')
                h4.textContent = article.author

                const p = document.createElement('p')
                p.textContent = article.content.substring(0, 700)

                const readMore = document.createElement('a')
                readMore.textContent = 'read more'

                readMore.addEventListener('click', () => {
                    localStorage.setItem('articleId', articleId)
                    window.location = "article.html";
                })
                               

                blogArticle.appendChild(column)
                column.appendChild(h1)
                column.appendChild(h4)
                column.appendChild(p)
                column.appendChild(readMore)
            });
        }
    })


