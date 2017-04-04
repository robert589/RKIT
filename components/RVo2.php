<?php
namespace rkit\components;

use rkit\libraries\CommonLibrary;
use rkit\components\RModel;
use rkit\components\RVo;

abstract class RVo2 extends RModel {
    abstract static function createBuilder();
    
    public function getJson() {
        $f = new \ReflectionClass($this->className());
        $methods = array();
        foreach ($f->getMethods() as $m) {
            if ($m->class == $this->className()) {
                $methods[] = $m->name;
            }
        }
        $methods = preg_grep("/^get/", $methods);
        $data = [];
        foreach($methods as $index => $method) {
            if(is_callable(array($this, $method))){
                $result = $this->$method();
                $dataName = $this->getDataName($method);

                if(!is_object($result)) {
                   $data[$dataName] = $result;
                } else if($result instanceof RVo2) {
                    $data[$dataName] = $result->getJson();
                    
                }
            }
            
        }
        return json_encode($data);
    }
    
    private function getDataName($methodName) {
        $dataName = CommonLibrary::convertCamelCaseToUnderscore($methodName);
        
        return str_replace("get_", "", $dataName);
    }
}

