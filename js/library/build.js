var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("common/component", ["require", "exports"], function (require, exports) {
    "use strict";
    var Component = (function () {
        function Component(root) {
            this.root = root;
            this.decorate();
            this.bindEvent();
        }
        Component.prototype.decorate = function () {
            this.id = this.root.getAttribute('id');
        };
        Component.prototype.bindEvent = function () {
        };
        Component.prototype.detach = function () {
        };
        /**
         * Remove completely
         */
        Component.prototype.remove = function () {
            this.detach();
            this.root.parentElement.removeChild(this.root);
        };
        Component.prototype.unbindEvent = function () {
        };
        Component.prototype.deconstruct = function () {
            this.detach();
            this.unbindEvent();
        };
        Component.prototype.getRoot = function () {
            return this.root;
        };
        Component.prototype.getId = function () {
            return this.id;
        };
        Component.prototype.removeClass = function (className) {
            this.root.classList.remove(className);
        };
        Component.prototype.addClass = function (className) {
            this.root.classList.add(className);
        };
        Component.prototype.hasClass = function (className) {
            return this.root.classList.contains(className);
        };
        Component.prototype.releaseEvent = function (eventName) {
            this.root.dispatchEvent(new CustomEvent(eventName));
        };
        Component.prototype.attachEvent = function (eventName, callback) {
            this.root.addEventListener(eventName, callback);
        };
        return Component;
    }());
    exports.Component = Component;
});
define("common/button", ["require", "exports", "common/component"], function (require, exports, component_1) {
    "use strict";
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(root, clickEvent) {
            var _this = _super.call(this, root) || this;
            _this.addClickEvent(clickEvent);
            return _this;
        }
        Button.prototype.addClickEvent = function (cb) {
            this.root.onclick = function (e) {
                if (!this.isDisabled()) {
                    cb(e);
                }
            }.bind(this);
        };
        Button.prototype.click = function () {
            this.root.click();
        };
        Button.prototype.disable = function (on) {
            this.root.disabled = on;
        };
        Button.prototype.isDisabled = function () {
            return this.root.disabled;
        };
        Button.prototype.detach = function () {
            _super.prototype.detach.call(this);
            this.root.onclick = null;
            this.root = null;
        };
        Button.prototype.getText = function () {
            return this.root.innerHTML;
        };
        Button.prototype.setText = function (text) {
            this.root.innerHTML = text;
        };
        return Button;
    }(component_1.Component));
    exports.Button = Button;
});
define("common/modal", ["require", "exports", "common/component", "common/button"], function (require, exports, component_2, button_1) {
    "use strict";
    var Modal = (function (_super) {
        __extends(Modal, _super);
        function Modal(root) {
            return _super.call(this, root) || this;
        }
        Modal.prototype.show = function () {
            this.root.classList.add('modal-show');
            this.root.classList.remove('modal-hide');
        };
        Modal.prototype.hide = function () {
            this.root.classList.add('modal-hide');
            this.root.classList.remove('modal-show');
        };
        Modal.prototype.decorate = function () {
            _super.prototype.decorate.call(this);
            this.title = this.root.getElementsByClassName('modal-title')[0];
            this.closeButton = new button_1.Button(document.getElementById(this.id + "-close-button"), function (e) {
                this.hide();
            }.bind(this));
        };
        Modal.prototype.bindEvent = function () {
            _super.prototype.bindEvent.call(this);
            this.root.addEventListener('click', function (e) {
                if (e.target && !e.target.closest('.modal-content')) {
                    this.hide();
                }
            }.bind(this));
        };
        Modal.prototype.setTitle = function (title) {
            this.title.innerHTML = title;
        };
        return Modal;
    }(component_2.Component));
    exports.Modal = Modal;
});
define("common/confirm-dialog", ["require", "exports", "common/modal", "common/button"], function (require, exports, modal_1, button_2) {
    "use strict";
    var ConfirmDialog = (function (_super) {
        __extends(ConfirmDialog, _super);
        function ConfirmDialog(root) {
            return _super.call(this, root) || this;
        }
        ConfirmDialog.prototype.decorate = function () {
            _super.prototype.decorate.call(this);
            this.text = this.root.getElementsByClassName('cdialog-text')[0];
        };
        ConfirmDialog.prototype.setText = function (text) {
            this.text.innerHTML = text;
        };
        ConfirmDialog.prototype.clickOk = function (cb) {
            cb();
            this.hide();
        };
        ConfirmDialog.prototype.clickCancel = function () {
            this.hide();
        };
        ConfirmDialog.prototype.bindEvent = function () {
            _super.prototype.bindEvent.call(this);
        };
        ConfirmDialog.prototype.detach = function () {
        };
        ConfirmDialog.prototype.run = function (cb) {
            this.okBtn = new button_2.Button(document.getElementById(this.id + "-ok"), this.clickOk.bind(this, cb));
            this.cancelBtn = new button_2.Button(document.getElementById(this.id + "-cancel"), this.clickCancel.bind(this));
            this.show();
        };
        return ConfirmDialog;
    }(modal_1.Modal));
    exports.ConfirmDialog = ConfirmDialog;
});
define("common/empty-modal", ["require", "exports", "common/modal"], function (require, exports, modal_2) {
    "use strict";
    var EmptyModal = (function (_super) {
        __extends(EmptyModal, _super);
        function EmptyModal(root) {
            var _this = _super.call(this, root) || this;
            _this.setContent("Loading...");
            return _this;
        }
        EmptyModal.prototype.decorate = function () {
            _super.prototype.decorate.call(this);
            this.contentEl = this.root.getElementsByClassName('emodal-content')[0];
        };
        EmptyModal.prototype.setContent = function (text) {
            this.contentEl.innerHTML = text;
        };
        EmptyModal.prototype.bindEvent = function () {
            _super.prototype.bindEvent.call(this);
        };
        EmptyModal.prototype.detach = function () {
        };
        return EmptyModal;
    }(modal_2.Modal));
    exports.EmptyModal = EmptyModal;
});
define("common/system", ["require", "exports", "common/confirm-dialog"], function (require, exports, confirm_dialog_1) {
    "use strict";
    var System = (function () {
        function System() {
        }
        System.getUserId = function () {
        };
        System.getBaseUrl = function () {
            return document.getElementById('base-url').value;
        };
        System.isEmptyValue = function (x) {
            return x === null || typeof x === 'undefined' || x === '';
        };
        System.capitalizeFirstLetter = function (text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        };
        System.isEmail = function (text) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(text);
        };
        System.addCsrf = function (data) {
            var csrfParam = System.getCsrfParam();
            var csrfToken = System.getCsrfValue();
            data[csrfParam] = csrfToken;
            return data;
        };
        System.addCsrfToUrl = function (url) {
            var csrfParam = System.getCsrfParam();
            var csrfToken = System.getCsrfValue();
            return url + "?" + csrfParam + "=" + csrfToken;
        };
        System.getCsrfParam = function () {
            return document.querySelector('meta[name="csrf-param"]').getAttribute('content');
        };
        System.getCsrfValue = function () {
            return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        };
        System.checkIdExist = function (id) {
            return !System.isEmptyValue(document.getElementById(id));
        };
        System.showConfirmDialog = function (cb, title, content) {
            var dialog = new confirm_dialog_1.ConfirmDialog(document.getElementById('confirmdialog'));
            dialog.setText(content);
            dialog.setTitle(title);
            dialog.run(cb);
        };
        System.printToPrinter = function (html) {
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = html;
            window.print();
            document.body.innerHTML = originalContents;
        };
        return System;
    }());
    exports.System = System;
});
define("common/Field", ["require", "exports", "common/component", "common/system"], function (require, exports, component_3, system_1) {
    "use strict";
    var Field = (function (_super) {
        __extends(Field, _super);
        function Field(root) {
            return _super.call(this, root) || this;
        }
        Field.prototype.decorate = function () {
            _super.prototype.decorate.call(this);
            this.fieldError = this.root.getElementsByClassName('field-error')[0];
            this.name = this.root.getAttribute('data-name');
        };
        Field.prototype.showError = function (errorMessage) {
            this.fieldError.innerHTML = errorMessage;
            this.fieldError.classList.remove('app-hide');
        };
        Field.prototype.hideError = function () {
            this.fieldError.classList.add('app-hide');
        };
        Field.prototype.getName = function () {
            return this.name;
        };
        Field.prototype.getDisplayName = function () {
            var constructedName = "";
            var first = true;
            var piecesOfName = this.name.split("_");
            for (var _i = 0, piecesOfName_1 = piecesOfName; _i < piecesOfName_1.length; _i++) {
                var piece = piecesOfName_1[_i];
                if (first) {
                    first = false;
                }
                else {
                    constructedName += " ";
                }
                constructedName += system_1.System.capitalizeFirstLetter(piece);
            }
            return constructedName;
        };
        Field.prototype.setIndex = function (index) {
            this.root.setAttribute('data-index', index + "");
        };
        Field.prototype.getIndex = function () {
            return parseInt(this.root.getAttribute('data-index'));
        };
        return Field;
    }(component_3.Component));
    exports.Field = Field;
});
define("common/input-field", ["require", "exports", "common/Field", "common/system"], function (require, exports, Field_1, system_2) {
    "use strict";
    var InputField = (function (_super) {
        __extends(InputField, _super);
        function InputField(root) {
            var _this = _super.call(this, root) || this;
            _this.dateFormat = 'dd-mm-yy';
            _this.type = _this.inputElement.getAttribute("type");
            return _this;
        }
        Object.defineProperty(InputField, "VALUE_CHANGED", {
            get: function () { return "INPUT_FIELD_VALUE_CHANGED"; },
            enumerable: true,
            configurable: true
        });
        ;
        InputField.prototype.decorate = function () {
            _super.prototype.decorate.call(this);
            this.inputElement = this.root.getElementsByClassName('input-field-input')[0];
            if (!system_2.System.isEmptyValue(this.root.getAttribute('data-datepicker'))) {
                $("#" + this.id).find(".input-field-input")
                    .datepicker({ dateFormat: "dd/mm/yy",
                    changeMonth: true,
                    changeYear: true,
                    onSelect: function (date) {
                        this.triggerValueChangedEvent();
                    }.bind(this)
                });
            }
            else if (!system_2.System.isEmptyValue(this.root.getAttribute('data-timepicker'))) {
                $("#" + this.id).find(".input-field-input")
                    .timepicker({
                    change: function (time) {
                        this.triggerValueChangedEvent();
                    }.bind(this)
                });
            }
        };
        InputField.prototype.bindEvent = function () {
            _super.prototype.bindEvent.call(this);
            this.valueChangeEvent = new CustomEvent(InputField.VALUE_CHANGED);
            this.inputElement.addEventListener('change', this.triggerValueChangedEvent.bind(this));
            if (this.type === "file") {
                this.inputElement.addEventListener('change click', this.triggerValueChangedEvent.bind(this));
            }
        };
        InputField.prototype.triggerValueChangedEvent = function () {
            this.inputElement.setAttribute('value', this.inputElement.value);
            this.root.dispatchEvent(this.valueChangeEvent);
        };
        InputField.prototype.attachInputElement = function (eventName, cb) {
            this.inputElement.addEventListener(eventName, cb);
        };
        InputField.prototype.detach = function () {
            this.inputElement = null;
        };
        InputField.prototype.unbindEvent = function () {
        };
        InputField.prototype.getValue = function () {
            if (this.type === "file") {
                return this.inputElement.files[0];
            }
            return this.inputElement.value;
        };
        InputField.prototype.setValue = function (val) {
            this.inputElement.value = val;
        };
        InputField.prototype.getDateFormat = function () {
            return this.dateFormat;
        };
        InputField.prototype.disable = function () {
            this.inputElement.setAttribute('disabled', "true");
        };
        InputField.prototype.enable = function () {
            this.inputElement.removeAttribute('disabled');
        };
        InputField.prototype.setMax = function (max) {
            try {
                if (this.type !== "number") {
                    throw new TypeError("Input field must be a number type");
                }
                else {
                    this.inputElement.max = max + "";
                }
            }
            catch (e) {
                console.log(e.message);
            }
        };
        InputField.prototype.setMin = function (min) {
            try {
                if (this.type !== "number") {
                    throw new TypeError("Input field must be a number type");
                }
                else {
                    this.inputElement.min = min + "";
                }
            }
            catch (e) {
                console.log(e.message);
            }
        };
        InputField.prototype.getSelectionStart = function () {
            return this.inputElement.selectionStart;
        };
        InputField.prototype.setSelectionStart = function (startPoint) {
            this.inputElement.selectionStart = startPoint;
        };
        InputField.prototype.setSelectionEnd = function (endPoint) {
            this.inputElement.selectionEnd = endPoint;
        };
        return InputField;
    }(Field_1.Field));
    exports.InputField = InputField;
});
define("common/upload-field", ["require", "exports", "common/Field", "common/input-field"], function (require, exports, Field_2, input_field_1) {
    "use strict";
    var UploadField = (function (_super) {
        __extends(UploadField, _super);
        function UploadField(root) {
            var _this = _super.call(this, root) || this;
            _this.url = _this.root.getAttribute('data-url');
            return _this;
        }
        UploadField.prototype.getValue = function () {
            return this.fileField.getValue();
        };
        UploadField.prototype.decorate = function () {
            _super.prototype.decorate.call(this);
            this.fileField = new input_field_1.InputField(document.getElementById(this.id + "-file"));
        };
        UploadField.prototype.bindEvent = function () {
            _super.prototype.bindEvent.call(this);
            this.fileField.attachEvent('change', this.uploadField.bind(this));
        };
        UploadField.prototype.uploadField = function () {
            $.ajax({
                url: this.url,
            });
        };
        UploadField.prototype.detach = function () {
        };
        return UploadField;
    }(Field_2.Field));
    exports.UploadField = UploadField;
});
define("common/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    var Validation = (function () {
        function Validation() {
        }
        return Validation;
    }());
    exports.Validation = Validation;
});
define("common/range-validation", ["require", "exports", "common/validation"], function (require, exports, validation_1) {
    "use strict";
    var RangeValidation = (function (_super) {
        __extends(RangeValidation, _super);
        function RangeValidation(targetField, min, max) {
            var _this = _super.call(this) || this;
            _this.targetField = targetField;
            _this.min = min;
            _this.max = max;
            _this.errorMessage = _this.getErrorMessage();
            _this.validate = _this.validateRange.bind(_this);
            return _this;
        }
        RangeValidation.prototype.getErrorMessage = function () {
            var message;
            if (this.max !== null && this.min !== null) {
                message =
                    this.targetField.getDisplayName() + " must be in the range of " +
                        this.min + " to " + this.max;
            }
            else if (this.min !== null) {
                message = this.targetField.getDisplayName() + " cannot be less than "
                    + this.min;
            }
            else {
                message = this.targetField.getDisplayName() + " must be at most "
                    + this.min;
            }
            return message;
        };
        RangeValidation.prototype.validateRange = function () {
            var valid = (this.min === null ||
                this.targetField.getValue() >= this.min)
                && (this.max === null ||
                    this.targetField.getValue() <= this.max);
            if (!valid) {
                this.targetField.showError(this.errorMessage);
            }
            return valid;
        };
        return RangeValidation;
    }(validation_1.Validation));
    exports.RangeValidation = RangeValidation;
});
define("common/form", ["require", "exports", "common/component", "common/system", "common/button"], function (require, exports, component_4, system_3, button_3) {
    "use strict";
    var Form = (function (_super) {
        __extends(Form, _super);
        function Form(root) {
            var _this = _super.call(this, root) || this;
            _this.enableSubmit = 0;
            _this.rules();
            return _this;
        }
        Form.prototype.decorate = function () {
            _super.prototype.decorate.call(this);
            //init variable
            this.requiredFields = [];
            this.allFields = [];
            this.emailFields = [];
            this.rangeValidations = [];
            this.validations = [];
            this.method = this.root.getAttribute('method');
            this.url = this.root.getAttribute('url');
            this.file = Boolean(this.root.getAttribute('data-file'));
            this.submitButton = new button_3.Button(document.getElementById(this.id + "-submit-btn"), this.submit.bind(this));
        };
        Form.prototype.bindEvent = function () {
            _super.prototype.bindEvent.call(this);
            this.root.onsubmit = function (e) {
                return false;
            };
            this.root.onkeypress = function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    this.submitButton.click();
                }
            }.bind(this);
        };
        Form.prototype.registerFields = function (fields) {
            this.allFields = this.allFields.concat(fields);
        };
        Form.prototype.setRequiredField = function (fields) {
            this.requiredFields = this.requiredFields.concat(fields);
        };
        Form.prototype.setRangeValidations = function (validations) {
            this.rangeValidations = this.rangeValidations.concat(validations);
        };
        Form.prototype.setValidations = function (validations) {
            this.validations = this.validations.concat(validations);
        };
        Form.prototype.setEmailField = function (fields) {
            this.emailFields = this.emailFields.concat(fields);
        };
        Form.prototype.validate = function (showError) {
            if (showError === void 0) { showError = true; }
            this.hideAllErrors();
            var valid = true;
            //validate required fields
            for (var _i = 0, _a = this.requiredFields; _i < _a.length; _i++) {
                var field = _a[_i];
                if (system_3.System.isEmptyValue(field.getValue())) {
                    if (showError) {
                        field.showError(field.getDisplayName() + " is required");
                    }
                    valid = false;
                }
            }
            //validate email fields
            for (var _b = 0, _c = this.emailFields; _b < _c.length; _b++) {
                var field = _c[_b];
                if (!system_3.System.isEmail(field.getValue())) {
                    if (showError) {
                        field.showError("The input must be a valid email address");
                    }
                    valid = false;
                }
            }
            //execute range validations
            for (var _d = 0, _e = this.rangeValidations; _d < _e.length; _d++) {
                var validation = _e[_d];
                if (!validation.validate()) {
                    valid = false;
                }
            }
            //execute all validations
            for (var _f = 0, _g = this.validations; _f < _g.length; _f++) {
                var validation = _g[_f];
                if (!validation.validate()) {
                    if (showError) {
                        validation.targetField.showError(validation.errorMessage);
                    }
                    valid = false;
                }
            }
            return valid;
        };
        Form.prototype.hideAllErrors = function () {
            for (var _i = 0, _a = this.allFields; _i < _a.length; _i++) {
                var field = _a[_i];
                field.hideError();
            }
        };
        Form.prototype.getJson = function (sendCsrf) {
            var data = {};
            if (sendCsrf) {
                data = system_3.System.addCsrf(data);
            }
            for (var _i = 0, _a = this.allFields; _i < _a.length; _i++) {
                var field = _a[_i];
                data[field.getName()] = field.getValue();
            }
            return data;
        };
        Form.prototype.submit = function (e) {
            e.preventDefault();
            if (this.enableSubmit !== 0) {
                return false;
            }
            var valid = this.validate();
            if (valid) {
                this.sendToServerSide();
            }
            return false;
        };
        Form.prototype.sendToServerSide = function () {
            this.submitButton.disable(true);
            var ajaxSettings = {
                url: this.file ? system_3.System.addCsrfToUrl(this.url) : this.url,
                type: this.method,
                context: this,
                data: this.getJson(true),
                success: function (data) {
                    var parsed = JSON.parse(data);
                    if (parsed['status'] === 1) {
                        this.successCb(parsed);
                    }
                    else {
                        if (!system_3.System.isEmptyValue(parsed['errors'])) {
                            this.handleErrors(parsed['errors']);
                        }
                    }
                    this.submitButton.disable(false);
                },
                error: function () {
                    this.submitButton.disable(false);
                }
            };
            if (this.file) {
                ajaxSettings['processData'] = false;
                ajaxSettings['cache'] = false;
                ajaxSettings['contentType'] = false;
            }
            $.ajax(ajaxSettings);
        };
        Form.prototype.handleErrors = function (errors) {
            for (var _i = 0, _a = this.allFields; _i < _a.length; _i++) {
                var field = _a[_i];
                if (!system_3.System.isEmptyValue(errors[field.getName()])) {
                    field.showError(errors[field.getName()][0]);
                }
            }
        };
        Form.prototype.findField = function (name) {
            for (var _i = 0, _a = this.allFields; _i < _a.length; _i++) {
                var field = _a[_i];
                if (field.getName() === name) {
                    return field;
                }
            }
        };
        return Form;
    }(component_4.Component));
    exports.Form = Form;
});
define("project/login-form", ["require", "exports", "common/form", "common/input-field"], function (require, exports, form_1, input_field_2) {
    "use strict";
    var LoginForm = (function (_super) {
        __extends(LoginForm, _super);
        function LoginForm(root) {
            var _this = _super.call(this, root) || this;
            _this.failCb = function () {
            }.bind(_this);
            _this.successCb = function (data) {
                window.location.reload();
            }.bind(_this);
            return _this;
        }
        LoginForm.prototype.rules = function () {
            this.setRequiredField([this.emailField, this.passwordField]);
            this.setEmailField([this.emailField]);
        };
        LoginForm.prototype.decorate = function () {
            _super.prototype.decorate.call(this);
            this.emailField = new input_field_2.InputField(document.getElementById(this.id + "-email-field"));
            this.passwordField = new input_field_2.InputField(document.getElementById(this.id + "-password-field"));
            this.registerFields([this.emailField, this.passwordField]);
        };
        return LoginForm;
    }(form_1.Form));
    exports.LoginForm = LoginForm;
});
define("project/login", ["require", "exports", "common/component", "project/login-form"], function (require, exports, component_5, login_form_1) {
    "use strict";
    var Login = (function (_super) {
        __extends(Login, _super);
        function Login(root) {
            return _super.call(this, root) || this;
        }
        Login.prototype.decorate = function () {
            _super.prototype.decorate.call(this);
            this.loginForm = new login_form_1.LoginForm(document.getElementById(this.id + "form"));
        };
        Login.prototype.bindEvent = function () {
            _super.prototype.bindEvent.call(this);
        };
        Login.prototype.detach = function () {
            _super.prototype.detach.call(this);
        };
        Login.prototype.unbindEvent = function () {
            // no event to unbind
        };
        return Login;
    }(component_5.Component));
    exports.Login = Login;
});
define("project/app", ["require", "exports", "common/component", "project/login", "common/system"], function (require, exports, component_6, login_1, system_4) {
    "use strict";
    var App = (function (_super) {
        __extends(App, _super);
        function App(root) {
            var _this = _super.call(this, root) || this;
            if (window.innerWidth < 600) {
                _this.leftSide.classList.add('app-hide');
            }
            return _this;
        }
        App.prototype.decorate = function () {
            _super.prototype.decorate.call(this);
            if (this.root.getElementsByClassName('login').length !== 0) {
                this.login = new login_1.Login(document.getElementById("lgn"));
            }
            this.hamburgerIcon = this.root.getElementsByClassName('app-hamburger')[0];
            this.leftSide = this.root.getElementsByClassName('left-side')[0];
        };
        App.prototype.toggleLeftSide = function () {
            if (this.leftSide.classList.contains('app-hide')) {
                this.leftSide.classList.remove('app-hide');
            }
            else {
                this.leftSide.classList.add('app-hide');
            }
        };
        App.prototype.bindEvent = function () {
            _super.prototype.bindEvent.call(this);
            if (!system_4.System.isEmptyValue(this.hamburgerIcon)) {
                this.hamburgerIcon.addEventListener('click', this.toggleLeftSide.bind(this));
            }
        };
        App.prototype.detach = function () {
            _super.prototype.detach.call(this);
        };
        App.prototype.unbindEvent = function () {
            // no event to unbind
        };
        return App;
    }(component_6.Component));
    exports.App = App;
});
define("project/init", ["require", "exports", "project/app"], function (require, exports, app_1) {
    "use strict";
    var root = document.getElementsByTagName("html")[0];
    var app = new app_1.App(root);
});
