<?php

use yii\db\Migration;

class m170324_030552_add_status_to_brand_table extends Migration
{
    public function up()
    {
        $this->execute("ALTER TABLE brand add status smallint(6) not null;");

    }

    public function down()
    {
        echo "m170324_030552_add_status_to_brand_table cannot be reverted.\n";

        return false;
    }

    /*
    // Use safeUp/safeDown to run migration code within a transaction
    public function safeUp()
    {
    }

    public function safeDown()
    {
    }
    */
}
