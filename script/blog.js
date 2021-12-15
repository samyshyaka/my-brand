let blogArticle = document.querySelector('.blog-article')
let article_ref = db.ref('articles/')

function makeDocument() {    
    article_ref.on('value', snapshot => {
        let articles = snapshot.val()
        blogArticle.innerHTML = "";
        for (let article in articles){
            
            let blogArticleContent =
             `<h1>${articles[article].title}</h1>
                <h4>${articles[article].author}</h4>
                <p>${articles[article].content}</p> `

            blogArticle.innerHTML += blogArticleContent;

        }

console.log(blogArticle);
    })

}

makeDocument();