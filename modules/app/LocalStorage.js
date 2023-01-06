import { uid } from '../uid.js';

export default class LocalStorage {
  /**
   * @function storageGet - Get data from local storage
   * @returns {any|*[]}
   */
  static storageGet = () => {
    return JSON.parse(localStorage.getItem('notes')) || []
      .sort((a, b) => new Date(a.updated) > new Date(b.updated) ? -1 : 1);
  };

  /**
   * @function storageSet - Set data to local storage
   * @param note
   */
  static storageSet = (note) => {
    const notes = LocalStorage.storageGet();
    const existingNote = notes.find(({ id }) => id === note.id);

    if (existingNote) {
      existingNote.title = note.title;
      existingNote.body = note.body;
      existingNote.updated = new Date().toISOString();
    } else {
      note.id = uid();
      note.updated = new Date().toISOString();
      notes.push(note);
    }

    localStorage.setItem('notes', JSON.stringify(notes));
  };

  /**
   * @function storageDelete - Delete item from local storage
   * @param noteId
   */
  static storageDelete = (noteId) => {
    const notes = LocalStorage.storageGet().filter(({ id }) => id !== noteId);
    localStorage.setItem('notes', JSON.stringify(notes));
  };
}
