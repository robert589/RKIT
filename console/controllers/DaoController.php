<?php

namespace console\controllers;
use Yii;
use yii\console\Controller;
class DaoController extends Controller {
    
    public $path;
    
    /**
     *
     * @var string
     * CamelCase
     * z
     */
    public $name;
        
    public function options($id) {
        return ['name', "path"];
    }
    
    public function optionAliases() {
        return ['n' => 'name', 'p' => 'path'];
    }
    
    public function actionCreate()
    {
        if(!$this->path) {
            die("You need to specify the path");
        }
        $containerWidget = $this->path . "/daos/" . $this->name . ".php" ;
        $text = $this->getText($this->name);
        if (file_put_contents($containerWidget, $text) !== false) {
        } else {
            echo "Cannot create container widget";
        }
    }
    
    private function getText($name) {
        $path = $this->path;
        return 
"<?php
namespace $path\daos;

use Yii;
use rkit\components\Dao;
/**
 * $name class
 */
class " . $name . " implements Dao
{
    
}

";
    }
    
    
}