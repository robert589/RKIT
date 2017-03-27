import {Modal} from './modal';
import {System} from './system';
import {Button} from './button';

export class EmptyModal extends Modal {

    contentEl : HTMLElement;

    constructor(root : HTMLElement) {
        super(root);
        this.setContent("Loading...");

    }

    decorate() {
        super.decorate();
        this.contentEl = <HTMLElement> this.root.getElementsByClassName('emodal-content')[0];
    }

    setContent(text : string) {
        this.contentEl.innerHTML = text;
    }


    bindEvent() {
        super.bindEvent();
    
    }

    detach() {
    }
}