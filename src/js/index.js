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
        },
    
        
        injectStyles: [
            `
            :host  {
                display: grid;
            }
            .swiper-button-next,
            .swiper-button-prev {
                background-color: white;
                background-position: center;
                background-size: 40px;
                background-repeat: no-repeat;
                padding: 8px 16px;
                border-radius: 100%;
                border: 2px solid black;
                color: red;
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
    swiperElements.forEach((swip) => {
        Object.assign(swip, breakpoints);

        const customNextBtn = swip.parentElement.querySelector('.customNextBtn')
        const customPrevtBtn = swip.parentElement.querySelector('.customPrevBtn')
        
        customNextBtn.addEventListener('click', () => {
            swip.swiper.slideNext();
        });
        
        customPrevtBtn.addEventListener('click', () => {
            swip.swiper.slidePrev();
        });
      
        
    })

    swipperRegister();


});