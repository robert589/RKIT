<?php

use yii\db\Migration;

class m170323_074149_add_status_to_category_table extends Migration
{
    public function up()
    {
        $this->execute("ALTER TABLE category add status smallint(6) not null;");
    }

    public function down()
    {
        echo "m170323_074149_add_status_to_category_table cannot be reverted.\n";

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
