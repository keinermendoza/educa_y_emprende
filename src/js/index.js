import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { register as swipperRegister  } from 'swiper/element/bundle';


document.addEventListener("DOMContentLoaded", () => {
    const breakpoints = {
        breakpoints: {
            1: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
            1280: {
                slidesPerView: 4,
            },
        }, injectStyles: [
            `
            :host  {
                display: grid;
            }
            @media(max-width: 640px) {
                :host {
                    display: flex;
                    flex-direction: column;
                }
            }
            `,
          ],
      
    }
        
    const swiperElements = document.querySelectorAll('swiper-container');
    console.log(swiperElements)
    swiperElements.forEach((swip) => {
        Object.assign(swip, breakpoints);
    })
    swipperRegister();

});