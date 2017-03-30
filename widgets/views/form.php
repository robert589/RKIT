<?php
    use rkit\widgets\Form;
    use rkit\widgets\Button;
?>
<form id="<?= $id ?>" method="<?= $method ?>" 
      action="<?= $url ?>"
      url="<?= $url ?>" class="<?= $widget_class ?>" data-file="<?= $file ?>">
    <?= $content ?>
    <?php if($enable_button) { ?>
        <?= Button::widget(['id' => $id . '-submit-btn' , 'text' => $button_text]) ?>
    <?php } ?>
</form>

