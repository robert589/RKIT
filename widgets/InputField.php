<?php

namespace rkit\widgets;

use yii\base\Widget;

class InputField extends Widget {
    
    const PASSWORD = 'password';
    
    const NUMBER = "number";
    
    const TEXT = "text";
    
    const EMAIL = "email";
    
    const HIDDEN = "hidden";
    
    const FIlE = "file";
    
    public $id;
    
    public $name;
    
    public $type;
    
    public $value = '';
    
    public $placeholder = '';
    
    public $timepicker = '';
    
    public $datepicker = false;
    
    public $inputOptionClass;
    
    public $monthpicker = false;
    
    public $selectDir = false;
    
    public $newClass;
    
    public $disabled = null;

    public $min = null;
    
    public $max = null;
    
    public function init() {
        if(!$this->inputOptionClass) {
            $this->inputOptionClass = [];
        }
    }
    
    public function run() {
        return $this->render('input-field', ['id' => $this->id, 
                                        'name' => $this->name, 
                                        'type' => $this->type, 'newClass' => $this->newClass,
                                        'value' => $this->value, 'min' => $this->min, 'max' => $this->max,
                                        'datepicker' => $this->datepicker,
                                        'disabled' => $this->disabled,
                                        'inputOptionClass' => $this->changeToTextForInputOption(),
                                        'selectDir' => $this->selectDir ? 1 :0,
                                        'timepicker'=> $this->timepicker,
                                        'monthpicker' => $this->monthpicker,
                                        'placeholder' => $this->placeholder]);
    }
    
    private function changeToTextForInputOption() {
        $stringified = '';
        foreach($this->inputOptionClass as $index => $datum) {
            $stringified .= $index . '=' . $datum . ' ';
        }
        
        return $stringified;   
    }
}