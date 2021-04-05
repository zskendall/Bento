function openModal(which, msg, missing = []) {
  document.activeElement.blur();
  const modal = document.querySelector('.modal');
  const content = modal.querySelector('.modal-content');
  content.textContent = '';
  const form = modal.querySelector(`template.${which}`).content.cloneNode(true);
  if (msg) {
    form.querySelector('h4').textContent = msg;
  }
  content.appendChild(form);
  modal.classList.remove('hidden');
  maybeMarkRequired(content, missing);
  content.querySelector('.form-control').focus();
}

function closeModal() {
  const el = document.querySelector('.modal');
  el.classList.add('hidden');
}

function maybeMarkRequired(modal, missing) {
  if (missing) {
    // A list of required items was provided
    for (const req of missing) {
      markRequired(modal, req);
    }
  } else {
    // No required items provided, so attempt to determine from form
    for (const el of modal.querySelectorAll('input.form-control')) {
      const id = el.getAttribute('id');
      if (!localStorage.getItem(id)) {
        markRequired(modal, id);
      }
    }
  }
}

function markRequired(modal, id) {
  modal.querySelector(`#${id}-req`).classList.remove('hidden');
}
