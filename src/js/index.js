import Alpine from 'alpinejs';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { register as swipperRegister  } from 'swiper/element/bundle';

window.htmx = require('htmx.org');

document.addEventListener("DOMContentLoaded", () => {
    window.Alpine = Alpine;
    Alpine.start();

    swipperRegister();
});