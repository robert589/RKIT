<?php

use yii\db\Migration;

class m170324_072057_alter_table_product_add_status extends Migration
{
    public function up()
    {
        $this->execute("ALTER TABLE product add status int not null");
    }

    public function down()
    {
        echo "m170324_072057_alter_table_product_add_status cannot be reverted.\n";

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
