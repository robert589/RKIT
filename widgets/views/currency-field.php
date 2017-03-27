<?php
    use yii\helpers\Html;
    use rkit\widgets\InputField;
?>
<div id="<?= $id ?>" class="currency-field <?= $newClass ?>" 
     data-default-value="<?= $defaultValue ?>"
     data-name="<?= $name ?>">
    
    <?=    InputField::widget(['id' => $id . '-input', 
        'type' => InputField::TEXT, 
        'value' => $value,
        'placeholder' => $defaultValue]) ?>
    
    <div class="field-error app-hide">     
    </div> 
</div>
