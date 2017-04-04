<?php

?>


<div id="<?= $id ?>" class="file-field" data-name="<?= $name ?>" data-url="<?= $url ?>">
    <?php if($directory) { ?>
    
        <input class="file-field-hi" id="<?= $id . '-hi' ?>" type="file" name="<?= $name ?>"
               multiple="" webkitdirectory="">
   
    <?php } else { ?>
    
        <input class="file-field-hi" id="<?= $id . '-hi' ?>" type="file" name="<?= $name ?>">
   
    <?php } ?> 
    <div class="field-error app-hide">
        
    </div>
</div>
