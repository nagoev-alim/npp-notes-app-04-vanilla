export default class View {
  constructor(root, { onSelect, onAdd, onEdit, onDelete } = {}) {
    this.root = root;
    this.onSelect = onSelect;
    this.onAdd = onAdd;
    this.onEdit = onEdit;
    this.onDelete = onDelete;

    // Render Skeleton
    this.root.innerHTML = `
      <div class='sidebar'>
        <button data-button=''>Add Note</button>
        <ul data-notes=''></ul>
      </div>
      <div class='preview'>
        <input type='text' placeholder='Enter a title' data-input=''>
        <textarea data-textarea=''></textarea>
      </div>
    `;

    const DOM = {
      button: this.root.querySelector('[data-button]'),
      input: this.root.querySelector('[data-input]'),
      textarea: this.root.querySelector('[data-textarea]'),
    };

    // Events
    DOM.button.addEventListener('click', () => this.onAdd());

    [DOM.input, DOM.textarea].forEach(field => {
      field.addEventListener('blur', () => {
        this.onEdit(DOM.input.value.trim(), DOM.textarea.value.trim());
      });
    });

    this.updateNotePreview(false);
  }

  /**
   * @function _createSideItem
   * @param id
   * @param title
   * @param body
   * @param updated
   * @returns {string}
   * @private
   */
  _createSideItem = (id, title, body, updated) => {
    return `
      <li data-note-id='${id}'>
        <h3 class='h5'>${title}</h3>
        <p>${body.substring(0, 60)} ${body.length > 60 ? '...' : ''}</p>
        <span>${updated.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}</span>
      </li>`;
  };

  /**
   * @function updateNoteList
   * @param data
   */
  updateNoteList = (data) => {
    const notes = this.root.querySelector('[data-notes]');
    notes.innerHTML = '';

    for (const { id, title, body, updated } of data) {
      const html = this._createSideItem(id, title, body, new Date(updated));
      notes.insertAdjacentHTML('beforeend', html);
    }

    // Add select/delete events for each list item
    notes.querySelectorAll('li').forEach(note => {
      const id = note.dataset.noteId;

      note.addEventListener('click', () => {
        this.onSelect(id);
      });

      note.addEventListener('dblclick', () => {
        if (confirm('Are you sure you want to delete this note?')) {
          this.onDelete(id);
        }
      });
    });
  };

  /**
   * @function updateActiveNote -
   * @param note
   */
  updateActiveNote = ({ title, body, id }) => {
    this.root.querySelector('[data-input]').value = title;
    this.root.querySelector('[data-textarea]').value = body;
    this.root.querySelectorAll('li').forEach(note => note.classList.remove('selected'));
    this.root.querySelector(`li[data-note-id="${id}"]`).classList.add('selected');
  };

  /**
   * @function updateNotePreview
   * @param visible
   */
  updateNotePreview = (visible) => {
    this.root.querySelector('.preview').style.visibility = visible ? 'visible' : 'hidden';
  };
}
