<?php

use yii\db\Migration;

class m170322_071250_create_table_category extends Migration
{
    public function up()
    {
        

        $this->execute("CREATE TABLE category("
                . "id int not null primary key auto_increment,"
                . "name varchar(255) not null,"
                . "description text null,"
                . "created_at int not null,"
                . "updated_at int not null)");

    }

    public function down()
    {
        echo "m170322_071250_create_table_category cannot be reverted.\n";

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
