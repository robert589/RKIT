<?php

namespace rkit\widgets;

use yii\base\Widget;

class HorCont extends Widget {
    
    public $id;
    
    public $title;
    
    public $link;
    
    public $newClass;
    
    public function init() {
        parent::init();
        ob_start();
    }
    
    public function run() {
        $content = ob_get_clean();
        return $this->render('hor-cont', 
                ['id' => $this->id, 'content' => $content,
                    'newClass' => $this->newClass,
                    'title' => $this->title, 'link' => $this->link]);
    }
}
