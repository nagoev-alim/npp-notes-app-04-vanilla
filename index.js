// ⚡️ Import Styles
import feather from 'feather-icons';
import './style.scss';
import LocalStorage from './modules/app/LocalStorage.js';
import View from './modules/app/View.js';
import Model from './modules/app/Model.js';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='notes'></div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>`;

// ⚡️ Class instance
const root = document.querySelector('.notes');
const app = new Model(root);
