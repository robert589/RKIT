import {Component} from './component';
import {Button} from './button';
import {System} from './system';
import {Animate} from './animate';

export abstract class HorCont extends Component {
    title : HTMLElement;

    seeMore : Button;

    link : string;

    leftRightNav : HTMLElement;

    leftBtn : Button;

    rightBtn : Button;

    scrollable : HTMLElement;

    content : HTMLElement;

    constructor(root : HTMLElement) {
        super(root);
        this.link = this.root.getAttribute('data-link')[0];
    }
    
    decorate() {
        super.decorate();
        this.title = <HTMLElement> this.root.getElementsByClassName('hor-cont-title')[0];
        this.seeMore = new Button(document.getElementById(this.id + "-see-more"), this.redirectToLink.bind(this));
        this.leftRightNav = <HTMLElement> this.root.getElementsByClassName('hor-cont-left-right')[0];
        this.scrollable =  <HTMLElement> this.root.getElementsByClassName('hor-cont-scrollable')[0];
        this.content =  <HTMLElement> this.root.getElementsByClassName('hor-cont-content')[0];
        this.rightBtn = new Button(document.getElementById(this.id + "-right"), this.scrollRight.bind(this));
    }

    redirectToLink() {
        window.location.href = this.link;
    }
    
    scrollRight() {
        Animate.animateRight(this.content);
    }   

    bindEvent() {
        super.bindEvent();
        this.root.addEventListener('mouseover', this.showNavigation.bind(this) );
        this.root.addEventListener('mouseout', this.hideNavigation.bind(this));
    }

    showNavigation() {
        this.leftRightNav.classList.remove('app-hide');
    }

    hideNavigation() {
        this.leftRightNav.classList.add('app-hide');
    }
}