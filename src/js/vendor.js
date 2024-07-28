import Alpine from 'alpinejs';
import 'container-query-polyfill'
window.htmx = require('htmx.org');
window.Alpine = Alpine;
Alpine.start();
import CustomToast from './toast'

document.addEventListener('display_toast', (e) => {
    CustomToast({template_id:"toast-template", data:e.detail})
  });
  