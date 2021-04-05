const tmpl = document.querySelector('.post-tmpl');
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
        postEl.querySelector('.post-link').href =
          `https://reddit.com${post.data.permalink}`;
        postEl.querySelector('.post-title').textContent = post.data.title;
        postEl.querySelector('.post-author').textContent = post.data.author;
        postEl.querySelector('.post-votes').textContent =
          `${post.data.ups} points`;
        postEl.querySelector('.post-comments').textContent =
          `${post.data.num_comments} comments`;

        // Handle posts without images
        let thumbnail = postEl.querySelector('.post-thumb');
        thumbnail.src = post.data.thumbnail;
        if (post.data.thumbnail === 'self') {
          thumbnail.style.width = '75px';
          thumbnail.src = 'img/reddit-logo-16.png';
        }

        // Compute date
        let d = new Date(0); // use 0 to seed to epoch
        d.setUTCSeconds(post.data.created);
        const diff = new Date() - d;
        postEl.querySelector('.post-date').textContent =
          `${Math.floor(diff / 1000 / 60 / 60)} hours ago`;

        // Append to list
        listEl.appendChild(postEl);
      }

      // Add a last row linking to the sub
      let more = document.createElement('li');
      more.classList.add('post', 'more-posts');
      let link = document.createElement('a');
      link.href = `https://reddit.com/r/${sub}`
      link.classList.add('post-link');
      link.textContent = 'See more posts';
      more.appendChild(link);
      listEl.appendChild(more);

      // Scroll to top of feed
      listEl.scroll(0, 0);
    });
}

function selectSub(el) {
  const selected = el.parentElement.querySelector('.selected');
  if (selected !== el) {
    selected.classList.remove('selected');
    el.classList.add('selected');
    getPosts(el.getAttribute('name'));
    for (const sep of el.parentNode.querySelectorAll('.sub-separator')) {
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
