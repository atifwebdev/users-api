const usersContainer = document.querySelector('#users');
const postsContainer = document.querySelector('#myPostData');
const commentsContainer = document.querySelector('#myPostData');

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();

  users.forEach((user) => {
    const userRow = document.createElement('tr');
    userRow.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="view-posts-${user.id}">View Posts</button></td>
    `;

    usersContainer.appendChild(userRow);

    const viewPostsButton = document.querySelector(`#view-posts-${user.id}`);
    viewPostsButton.addEventListener('click', () => fetchPosts(user.id));
  });
};

const fetchPosts = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  const posts = await response.json();

  postsContainer.innerHTML = '';

  posts.forEach((post) => {
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');
    postCard.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <button id="view-comments-${post.id}">View Comments</button>
    `;

    postsContainer.appendChild(postCard);

    const viewCommentsButton = document.querySelector(`#view-comments-${post.id}`);
    viewCommentsButton.addEventListener('click', () => fetchComments(post.id));
  });
};

const fetchComments = async (postId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  const comments = await response.json();

  commentsContainer.innerHTML = '';

  comments.forEach((comment) => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
      <h4>${comment.name}</h4>
      <p>${comment.body}</p>
    `;

    commentsContainer.appendChild(commentElement);
  });
};

fetchUsers();