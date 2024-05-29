document.addEventListener("DOMContentLoaded", function () {
    loadPosts();

    const form = document.getElementById("post-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const imageInput = document.getElementById("image-input");
        const captionInput = document.getElementById("caption-input");

        if (imageInput.files.length === 0) {
            alert("Por favor, selecione uma imagem.");
            return;
        }

        const imageFile = imageInput.files[0];
        const caption = captionInput.value;

        const reader = new FileReader();
        reader.onload = function () {
            const imageUrl = reader.result;
            const post = { imageUrl, caption, likes: 0, comments: [] };
            savePost(post);
            loadPosts();
            form.reset(); 
        };
        reader.readAsDataURL(imageFile);
    });
});

function savePost(post) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = "";

    posts.forEach((post, index) => {
        const postElement = createPostElement(post, index);
        postContainer.appendChild(postElement);
    });
}

function createPostElement(post, index) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    const imageElement = document.createElement("img");
    imageElement.src = post.imageUrl;

    const captionElement = document.createElement("p");
    captionElement.textContent = post.caption;

    const likeButton = document.createElement("button");
    likeButton.textContent = `Curtir (${post.likes})`;
    likeButton.addEventListener("click", function () {
        post.likes++;
        updatePost(post, index);
    });

    const commentInput = document.createElement("input");
    commentInput.placeholder = "Digite seu comentário...";
    const commentButton = document.createElement("button");
    commentButton.textContent = "Comentar";
    commentButton.addEventListener("click", function () {
        const commentText = commentInput.value;
        if (commentText.trim() !== "") {
            post.comments.push(commentText);
            updatePost(post, index);
        }
        commentInput.value = ""; 
    });

    const commentList = document.createElement("ul");
    post.comments.forEach(commentText => {
        const commentItem = document.createElement("li");
        commentItem.textContent = commentText;
        commentList.appendChild(commentItem);
    });

    postElement.appendChild(imageElement);
    postElement.appendChild(captionElement);
    postElement.appendChild(likeButton);
    postElement.appendChild(commentInput);
    postElement.appendChild(commentButton);
    postElement.appendChild(commentList);

    return postElement;
}

function updatePost(post, index) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts[index] = post;
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Formulário enviado!");
});