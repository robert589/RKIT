<?php
namespace rkit\widgets;

use yii\base\Widget;
class FileField extends Widget {
    
    public $id;
    
    public $name;
    
    public $directory = false;
    
    public $url;
    
    public function init() {
        
    }
    
    public function run() {
        return $this->render('file-field', 
                ['id' => $this->id,
                "url" => $this->url,
                'name' => $this->name,
                'directory' => $this->directory]);
    }
}
