import View from './View.js';
import LocalStorage from './LocalStorage.js';

export default class Model {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new View(root, this._handlers());

    this._refreshNotes();
  }

  /**
   * @function
   * @returns {{onEdit: onEdit, onDelete: onDelete, onAdd: onAdd, onSelect: onSelect}}
   * @private
   */
  _handlers = () => {
    return {
      onSelect: noteId => {
        const note = this.notes.find(({ id }) => id === noteId);
        this._setActiveNote(note);
      },
      onAdd: () => {
        const note = {
          title: 'New Note',
          body: 'Take note...',
        };

        LocalStorage.storageSet(note);
        this._refreshNotes();
      },
      onEdit: (title, body) => {
        LocalStorage.storageSet({
          id: this.activeNote.id,
          title,
          body,
        });

        this._refreshNotes();
      },
      onDelete: noteId => {
        LocalStorage.storageDelete(noteId);
        this._refreshNotes();
      },
    };
  };

  _refreshNotes = () => {
    const notes = LocalStorage.storageGet();
    this._setNotes(notes);

    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  };

  _setNotes = (notes) => {
    this.notes = notes;
    console.log(notes);
    this.view.updateNoteList(notes);
    this.view.updateNotePreview(notes.length > 0);
  };

  _setActiveNote = (note) => {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  };
}
