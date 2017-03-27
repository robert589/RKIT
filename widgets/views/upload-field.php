<?php
    use rkit\widgets\InputField;
    use rkit\widgets\Button;
?>


<div id="<?= $id ?>" class="upload-field" 
     data-url="<?= $url ?>"
     data-value="<?= $value ?>"
     data-file-name="<?= $fileName ?>"
     data-file-path="<?= $filePath ?>"
     data-name="<?= $name ?>">
    <div class="upload-field-row upload-field-upload">
        
        <?= InputField::widget(['id' => $id . '-file', 'type' => InputField::FIlE]) ?>
        <span class="upload-field-status">
            
        </span>
    </div>
    <div class="upload-field-row upload-field-obtain app-hide">
        <a href="" class="upload-field-link"></a>
        <?= Button::widget(['id' => $id . '-cancel', 'text' => 'Cancel',
                'newClass' => 'button-link upload-field-cancel',
                'color' => Button::NONE_COLOR]) ?>
    </div>
    <div class="field-error app-hide">
    </div>
</div>
