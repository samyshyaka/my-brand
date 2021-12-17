let blogArticle = document.querySelector('.articles')
let article_ref = db.ref('articles/')

function displayArticle() {    
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
                        <input type="text" placeholder="Your name" id="comment-writer">
                        <input type="text" placeholder="Type your comment" id="comment">
                        <button id="comment-section">Submit</button>
                    </form>
                    <div id="submit-comment"></div>
                </div>
            </div>`

            blogArticle.innerHTML += tr;

        }

console.log(blogArticle);
    }) 

}

displayArticle();

// let submitComment = document.getElementById('submit-comment');
// let commentWriter = document.getElementById("comment-writer");
// let commentContent = document.getElementById("comment");

// function saveComment(writer, comment){
//     article_ref.child(id).child(writer).set({
//         name: writer,
//     comment: comment
//     })

//     alert('comment saved')
// }

// submitComment.addEventListener('click', e => {
//     e.preventDefault();
//     saveComment(commentWriter, commentContent)
// })
