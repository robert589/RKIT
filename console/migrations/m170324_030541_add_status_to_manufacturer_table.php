<?php

use yii\db\Migration;

class m170324_030541_add_status_to_manufacturer_table extends Migration
{
    public function up()
    {
        $this->execute("ALTER TABLE manufacturer add status smallint(6) not null;");

    }

    public function down()
    {
        echo "m170324_030541_add_status_to_manufacturer_table cannot be reverted.\n";

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
