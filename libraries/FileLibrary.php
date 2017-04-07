<?php
namespace rkit\libraries;
 
class FileLibrary {
   
    public static function getFileNameFromPath($path) {
       return basename($path);
    }
   
    public static function getFullPath($databasePath) {
        return "localhost/imav/admin/file/index?path=" . $databasePath;
    }
 
    public static function reArrayFiles(&$file_post) {
 
        $file_ary = array();
        $file_count = count($file_post['name']);
        $file_keys = array_keys($file_post);
 
        for ($i=0; $i<$file_count; $i++) {
            foreach ($file_keys as $key) {
                $file_ary[$i][$key] = $file_post[$key][$i];
            }
        }
 
        return $file_ary;
    }
}