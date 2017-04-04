<?php
    use yii\helpers\Html;
    use rkit\widgets\InputField;
?>
<div id="<?= $id ?>" class="input-field <?= $newClass ?>" data-name="<?= $name ?>" 
     <?php if($datepicker) { ?> data-datepicker="<?= $datepicker ?>" <?php } ?>
     <?php if($timepicker) { ?> data-timepicker="<?= $timepicker ?>" <?php } ?>
     data-select-dir="<?= $selectDir ?>"
     <?php if($monthpicker) { ?> data-monthpicker="<?= $monthpicker ?>" <?php } ?>
     data-type="<?= $type ?>"
     >
    
    <?php if(InputField::FIlE === $type && $selectDir) { ?>
    
        <input name="<?= $name ?>" class="input-field-input"
               type="<?= $type ?>" 
               multiple="" 
               directory
               webkitdirectory="">   
    
    <?php } else { ?>
    
        <input name="<?= $name ?>" class="input-field-input"
               type="<?= $type ?>" 
               value="<?= $value ?>"
               <?= ($min) ? "min='$min'" : '' ?>
                <?= ($max) ? "max='$max'" : '' ?>
               placeholder="<?= $placeholder ?>" <?= ($disabled) ? 'disabled' : '' ?>>   
    <?php } ?>
    
    <div class="field-error app-hide">     
    </div> 
</div>
