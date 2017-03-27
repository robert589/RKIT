<?php

namespace console\controllers;
use Yii;
use yii\console\Controller;
class TsController extends Controller {
    
    
    public $path = "frontend";
    
    const RKIT_PROJECT_LOCATION = "rkit/js/project";
    
    public function options($id) {
        return ["path"];
    }
    
    public function optionAliases() {
        return ["p" => "path"];
    }
    
    public function actionUpdateIndex()
    {
        $fullPathLocation = Yii::getAlias('@parentDir') . "/" . self::RKIT_PROJECT_LOCATION;
        
        $content = "";
        if ($handle = opendir($fullPathLocation)) {
            while (false !== ($entry = readdir($handle))) {

                if ($entry != "." && $entry != "..") {
                    $content .= $this->createImportText($entry);
                }
            }

            closedir($handle);
        }
        
        $targetLocation = Yii::getAlias('@parentDir') . "/" . $this->path . "/web/js/index.ts";
        $fp = fopen($targetLocation,"wb");
        fwrite($fp,$content);
        fclose($fp);
    }
    
    private function createImportText($fileName) {
        $fileNameWithoutExt = str_replace(".ts", "", $fileName);
        
        $relativePartFromFolder = "./../../../" . self::RKIT_PROJECT_LOCATION . "/" . $fileNameWithoutExt;
        return "export * from \"" . $relativePartFromFolder . "\"; \n ";
    }
     
}