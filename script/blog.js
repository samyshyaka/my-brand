let blogArticle = document.querySelector('.articles')
let article_ref = db.ref('articles/')

let obj = {
    name: "sam",
    address: "kigali"
}

console.log(obj.name);

function makeDocument() {    
    article_ref.on('value', snapshot => {
        let articles = snapshot.val()
        blogArticle.innerHTML = ""
        for (let article in articles){
            let tr = `
            <div class="articles">
                <div class="article" data-id = '${article}'>
                    <h1>${articles[article].title}</h1>
                    <h4>Written by ${articles[article].author}</h4>
                    <p>${articles[article].content}</p>
                    <a href="">read more</a>
                    <form action="">
                        <input type="text" placeholder="Type your comment">
                        <button>Submit</button>
                    </form>
                </div>
            </div>`
            blogArticle.innerHTML += tr;

        }

console.log(blogArticle);
    })

}

makeDocument();