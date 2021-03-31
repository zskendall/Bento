const tmpl = document.querySelector('.postTmpl');
const listEl = document.querySelector('.posts');

getPosts('mechanicalkeyboards');

function getPosts(sub) {
  fetch(`https://api.reddit.com/r/${sub}/top?limit=50`)
    .then(resp => resp.json())
    .then(json => {
      listEl.textContent = '';
      const posts = json.data.children || [];
      for (const post of posts) {
        // Clone the template content to reuse multiple times
        let postEl = tmpl.content.cloneNode(true);

        // Fill in content
        postEl.querySelector('.postLink').href = `https://reddit.com${post.data.permalink}`;
        postEl.querySelector('.postTitle').innerText = post.data.title;
        postEl.querySelector('.postAuthor').innerText = post.data.author;
        postEl.querySelector('.postVotes').innerText = `${post.data.ups} points`;
        postEl.querySelector('.postComments').innerText = `${post.data.num_comments} comments`;

        // Handle posts without images
        let thumbnail = postEl.querySelector('.postThumb');
        thumbnail.src = post.data.thumbnail;
        if (post.data.thumbnail === 'self') {
          thumbnail.style.width = '75px';
          thumbnail.src = 'img/reddit-logo-16.png';
        }

        // Compute date
        let d = new Date(0); // use 0 to seed to epoch
        d.setUTCSeconds(post.data.created);
        const diff = new Date() - d;
        postEl.querySelector('.postDate').innerText = `${Math.floor(diff / 1000 / 60 / 60)} hours ago`;

        // Append to list
        listEl.appendChild(postEl);
      }

      // Add a last row linking to the sub
      let more = document.createElement('li');
      more.classList.add('post', 'morePosts');
      let link = document.createElement('a');
      link.href = `https://reddit.com/r/${sub}`
      link.classList.add('postLink');
      link.innerText = 'See more posts';
      more.appendChild(link);
      listEl.appendChild(more);
    });
}

function selectSub(el) {
  console.log(el);
  const selected = el.parentElement.querySelector('.selected');
  if (selected !== el) {
    selected.classList.remove('selected');
    el.classList.add('selected');
    getPosts(el.getAttribute('name'));
    for (const sep of el.parentNode.querySelectorAll('.subSeparator')) {
      sep.classList.remove('hidden');
    }
    const prevSep = el.previousElementSibling;
    if (prevSep) {
      prevSep.classList.add('hidden');
    }
    const nextSep = el.nextElementSibling;
    if (nextSep) {
      nextSep.classList.add('hidden');
    }
  }
}
