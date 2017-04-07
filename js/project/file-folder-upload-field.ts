import {Field} from './field';
import {System} from './system';
import {UploadField} from './upload-field';

export class FileFolderUploadField extends Field {

    fileField : UploadField;

    folderField : UploadField;

    selectFileElement : HTMLElement;

    selectFolderElement : HTMLElement;    

    constructor(root : HTMLElement) {
        super(root);
        if(!System.isEmptyValue(this.fileField.getValue())) {
            this.hideFolderArea();
        }
    }

    decorate() {
        super.decorate();
        this.fileField = new UploadField(document.getElementById(this.id + "-file"));
        this.folderField = new UploadField(document.getElementById(this.id + "-folder"));
        this.selectFileElement = <HTMLElement> this.root.getElementsByClassName('ffu-field-file')[0];
        this.selectFolderElement = <HTMLElement> this.root.getElementsByClassName('ffu-field-folder')[0];
    }

    getValue() : Object{
        let fileValue = this.fileField.getValue();
        let folderValue = this.folderField.getValue();

        if(!System.isEmptyValue(folderValue)) {
            return folderValue;
        }

        if(!System.isEmptyValue(fileValue)) {
            return fileValue;
        }

        return null;
    }

    bindEvent() {
        super.bindEvent();
        this.folderField.attachEvent(UploadField.UPLOADED_SUCCESSFULLY_EVENT, this.hideFileArea.bind(this) );
        this.fileField.attachEvent(UploadField.UPLOADED_SUCCESSFULLY_EVENT, this.hideFolderArea.bind(this) );
        this.folderField.attachEvent(UploadField.CANCELLED_EVENT, this.showFileArea.bind(this));
        this.fileField.attachEvent(UploadField.CANCELLED_EVENT, this.showFolderArea.bind(this));
    }

    showFolderArea() {
        this.selectFolderElement.classList.remove('app-hide');
    }

    showFileArea() {
        this.selectFileElement.classList.remove('app-hide');
    }

    hideFolderArea() {  
        this.selectFolderElement.classList.add('app-hide');
    }

    hideFileArea() {
        this.selectFileElement.classList.add('app-hide');
    }

    show() {

    }

    hide() {
        
    }
    
    getIndex() : number {
        return parseInt(this.root.getAttribute('data-index'));
    }
}