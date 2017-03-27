<?php

use yii\db\Migration;

class m170324_044106_modify_column_updated_at_in_file_table extends Migration
{
    public function up()
    {
        $this->execute("ALTER TABLE file change upadted_at updated_at int not null");
    }

    public function down()
    {
        echo "m170324_044106_modify_column_updated_at_in_file_table cannot be reverted.\n";

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
