import {ConfirmDialog} from './confirm-dialog';
import {EmptyModal} from './empty-modal';

export class Animate  {
    
    public static animateRight(element : HTMLElement, right : number = 2000, 
                    step : number = 1, delay : number = 25) {
        element.scrollLeft += step;
        if(right > 0) {
            setTimeout(Animate.animateRight(element, right - step, right, delay), delay);
        }
    }
}