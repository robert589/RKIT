<?php
namespace rkit\widgets;
use yii\base\Widget;

class UploadField extends Widget {
    public $id;
    
    public $name;
    
    public $url;
    
    public $value = null;
    
    public $fileName = null;
    
    public $filePath = null;
    
    public $directory = false;
    
    public function init() {
        parent::init();
    }
    
    public function run() {
        return $this->render('upload-field', 
                ['id' => $this->id, 'name' => $this->name, 
                    'value' => $this->value,
                    'fileName' => $this->fileName,
                    'filePath' => $this->filePath,
                    'directory' => $this->directory ? 1 : 0,
                    'url' => $this->url]);
    }
}