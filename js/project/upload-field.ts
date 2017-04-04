import {Field} from './Field';
import {System} from './system';
import {InputField} from './input-field';
import {Button} from './button';

export class UploadField extends Field {

    public static get UPLOADED_SUCCESSFULLY_EVENT() : string {return "UPLOAD_FIELD_UPLOADED_SUCCESSFULLY"};

    uploadedTextStatus : string = "Uploaded..";

    loadingTextStatus : string = "Loading..";

    errorTextStatus : string = "Error..";

    uploadedSuccessfullyEvent : CustomEvent;

    fileField : InputField;

    url : string;

    value : string = null;

    statusField : HTMLElement;

    downloadLink : HTMLLinkElement;

    uploadArea : HTMLElement;

    obtainArea : HTMLElement;

    cancelBtn : Button;

    directory : number = 0;

    fileName : string;

    constructor(root : HTMLElement) {
        super(root);
        this.url = this.root.getAttribute('data-url');
        this.directory = parseInt(this.root.getAttribute('data-directory'));

        let value : string = this.root.getAttribute('data-value');
        let filePath : string = this.root.getAttribute('data-file-path');
        let fileName : string = this.root.getAttribute('data-file-name');
        if(!System.isEmptyValue(value) && !System.isEmptyValue(filePath) 
            && !System.isEmptyValue(fileName)) {
                this.updateValue(value, fileName, filePath);
        }
        
    }

    getValue() {
        return this.value;
    }

    resetValue() {
        this.fileField.setValue(null);
        this.value = null;
        this.setStatus("");
        this.hideError();
        this.showUploadElement();
    }

    decorate() {
        super.decorate();
        this.fileField = new InputField(document.getElementById(this.id  + "-file"));
        this.statusField = <HTMLElement>this.root.getElementsByClassName('upload-field-status')[0];
        this.uploadArea = <HTMLElement> this.root.getElementsByClassName('upload-field-upload')[0];
        this.obtainArea = <HTMLElement> this.root.getElementsByClassName('upload-field-obtain')[0];
        this.downloadLink = <HTMLLinkElement> this.root.getElementsByClassName('upload-field-link')[0];
        this.cancelBtn = new Button(document.getElementById(this.id + "-cancel"), this.resetValue.bind(this));
    }

    setStatus(message : string) {
        this.statusField.innerHTML = message;
    }

    bindEvent() {
        super.bindEvent();
        this.fileField.attachEvent('change', this.uploadField.bind(this));

        let json : UploadFieldUploadedJson = {
            id : this.id
        };

        this.uploadedSuccessfullyEvent = new CustomEvent(UploadField.UPLOADED_SUCCESSFULLY_EVENT, {detail : json });
    }

    uploadField() {
        this.setStatus(this.loadingTextStatus);
        let formData = new FormData();
        let files = this.fileField.getValue();

        if(this.directory) {
            for(let i = 0; i < files.length; i++) {
                formData.append("files[]", files[i]);    
                formData.append("filespath[]", files[i].webkitRelativePath)
            }
        } else {
            formData.append("file", files);
        }
        formData.append(System.getCsrfParam(), System.getCsrfValue());
        let ajaxSettings : JQueryAjaxSettings = {
            url : this.url,
            type: "post",
            context : this,
            data : formData,
            processData : false,
            cache: false,
            dataType : "json",
            contentType : false,
            success : this.processSuccessUploadFile.bind(this),
            error : function() {
                this.showError("Network Error!");
            }   
        };
        $.ajax (ajaxSettings);

    }

    processSuccessUploadFile(data) {
        if(data.status === 1) {
            this.setStatus(this.uploadedTextStatus);
            this.triggerUploadedEvent();
            this.updateValue(data.file_id, data.file_name, data.file_path);
        } else {
            this.setStatus(this.errorTextStatus);
            this.showError(data.errors);
        }
    }

    updateValue(fileId : string, fileName : string, filePath : string) {
        this.value = fileId;        
        this.downloadLink.innerHTML = fileName;
        this.downloadLink.setAttribute("href", filePath);
        this.showObtainElement();
    }

    showObtainElement() {
        this.obtainArea.classList.remove('app-hide');
        this.uploadArea.classList.add('app-hide');
    }

    showUploadElement() {
        this.obtainArea.classList.add('app-hide');
        this.uploadArea.classList.remove('app-hide');
    }

    triggerUploadedEvent() {
        this.root.dispatchEvent(this.uploadedSuccessfullyEvent);
    }
    detach() {
    }
}

interface UploadFieldUploadedJson {
    id : string
}
