<?php

namespace console\controllers;
use Yii;
use yii\console\Controller;
class ServiceController extends Controller {
    
    public $name;
    
    public $attrs;
    
    public $path;
    
    
    public function options($id) {
        return ['name', 'attrs', "path"];
    }
    
    public function optionAliases() {
        return ['n' => 'name', 'a' => 'attrs', "p" => "path"];
    }
    
    public function actionCreate()
    {
        if(!$this->path) {
            die("You need to specify the path");
        }
        $dirPath = $this->path . "/services/" . $this->name . ".php" ;
        $attributes = explode(",", $this->attrs);
        
        $text = $this->getHeaderText($this->name);
        $text .= $this->generateAttrs($attributes);
        $text .= $this->getFooterText();
        if (file_put_contents($dirPath, $text) !== false) {
        } else {
            echo "Cannot create file";
        }
    }
    
    private function generateAttrs($attrs) {
        $text = "    //attributes"
                . "\n";
        foreach($attrs as $attr) {
            $text .= "    public $" . $attr  . ";\n\n";
                    
        }
            
        return $text;
        
    }
    
    private function getHeaderText($name) {
        $path = $this->path;
        return 
"<?php
namespace $path\services;

use rkit\components\RService;
/**
 * $name service
 *
 */
class $name extends RService
{

";
    }
    
    
    private function getFooterText() {
        return "}";
    }
}