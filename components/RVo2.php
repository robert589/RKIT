<?php
namespace rkit\components;

use rkit\libraries\CommonLibrary;
use rkit\components\RModel;
use rkit\components\RVo;

abstract class RVo2 extends RModel {
    abstract static function createBuilder();
    
    public function getDataArray() {
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
                
                if(!$result) {
                    
                }
                else if(!is_object($result)) {
                   $data[$dataName] = $result;
                } 
                
                else if($result instanceof RVo2) {
                    $data[$dataName] = $result->getDataArray();
                    
                }
            }
            
        }
        return $data;
    }
    
    public function getDataIn1DArray($excepts = []) {
        $data = $this->getDataArray();
        $newData = [];
        
        $newData = $this->flatten($data, "");
        
        foreach($excepts as $except) {
            unset($newData[$except]);
        }
        
        return $newData;
    }
    
    private function flatten($data, $rootName) {
        $newData = [];
        foreach($data as $name => $datum) {
            if(is_array($datum)) {
                $newData = array_merge($newData, $this->flatten($datum, $name . "_"));
            } else {
                $newData[$rootName . $name] = $datum;
            }
        }
        
        
        return $newData;
    }
    
    private function getDataName($methodName) {
        $dataName = CommonLibrary::convertCamelCaseToUnderscore($methodName);
        
        return str_replace("get_", "", $dataName);
    }
}

