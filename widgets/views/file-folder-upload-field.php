<?php
    use rkit\widgets\UploadField;
?>
<div id="<?= $id ?>" class="ffu-field" data-name="<?= $name ?>">
    <div class="ffu-field-file">
        <div class="ffu-field-header">
            Select File
        </div>

        <?= UploadField::widget(['id' => $id . '-file',
                        'url' => $fileUploadUrl,
                        'fileName' => $fileName,
                        'value' => $value,
                        'filePath' => $filePath,
                        'name' => $name]) ?>         
    </div>   
    <div class="ffu-field-folder">
        <div class="ffu-field-header">
            Select Folder
        </div>
        <?= UploadField::widget(['id' => $id . '-folder',
            'url' => $folderUploadUrl,
            "directory" => true, 
            'name' => $name]) ?>
    </div>
</div>
