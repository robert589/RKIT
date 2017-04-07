<?php

namespace rkit\widgets;

use yii\base\Widget;

class FileFolderUploadField extends Widget {
    
    public $id;
    
    public $fileUploadUrl;
    
    public $name;
    
    public $fileName = null;
    
    public $filePath = null;
    
    public $value;
    
    public $folderUploadUrl;
    
    public function init() {
        
    }
    
    public function run() {
        return $this->render('file-folder-upload-field',
                ['id' => $this->id, 'fileUploadUrl' => $this->fileUploadUrl,
                    'name' => $this->name,
                    'value' => $this->value,
                    'fileName' => $this->fileName,
                    'filePath' => $this->filePath,
                    'folderUploadUrl' => $this->folderUploadUrl]);
    }
}
