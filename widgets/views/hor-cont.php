<?php
    use rkit\widgets\Button;
?>

<div id="<?= $id ?>" class="hor-cont <?= $newClass ?>" data-link="<?= $link ?>">
    <div class="hor-cont-header">
        <span class="hor-cont-title">
            <?= $title ?>

        </span>

        <?= Button::widget(['id' => $id . '-see-more', 'newClass' => 'button-link', 'text' => 'See More',
                    'color' => Button::NONE_COLOR   ]) ?>
    </div>
    <div class="hor-cont-scrollable">
        <div class="hor-cont-content">
            <?= $content ?>    
        </div>
    
        <div class="hor-cont-left-right app-hide">
            <?= Button::widget(['id' => $id . '-left', 'text' => '<span class="glyphicon glyphicon-arrow-left"></span>',
                                'newClass' => 'button-link', 'color' => Button::NONE_COLOR]) ?>
            <?= Button::widget(['id' => $id . '-right', 'text' => '<span class="glyphicon glyphicon-arrow-right"></span>',
                                'newClass' => 'button-link', 'color' => Button::NONE_COLOR]) ?>
        </div>

    </div>
    
</div>