<?php
namespace rkit\libraries;

class CommonLibrary {
    public static function underscoreToCamelCase($string, $capitalizeFirstCharacter = false) {
        $str = str_replace(' ', '', ucwords(str_replace('_', ' ', $string)));

        if (!$capitalizeFirstCharacter) {
            $str[0] = strtolower($str[0]);
        }

        return $str;
    }
    
    public static function convertCamelCaseToUnderscore($text) {
        $matches = [];
        preg_match_all('!([A-Z][A-Z0-9]*(?=$|[A-Z][a-z0-9])|[A-Za-z][a-z0-9]+)!', $text, $matches);
        $ret = $matches[0];
        foreach ($ret as &$match) {
          $match = $match == strtoupper($match) ? strtolower($match) : lcfirst($match);
        }
        return implode('_', $ret);
    }
    
    public static function capitalizeOnlyFirstLetter($text) {

        return str_replace('\' ', '\'', ucwords(str_replace('\'', '\' ', strtolower($text))));
    }
}
