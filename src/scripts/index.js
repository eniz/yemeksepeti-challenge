import { qs, debounce } from './utils';
import { renderMenuList } from './renderPage';

import '../stylesheets/style.scss';


// Search bar input
const searchInput = qs('.search-input');
searchInput.onkeyup = debounce(() => {
  renderMenuList(searchInput.value);
}, 400);
