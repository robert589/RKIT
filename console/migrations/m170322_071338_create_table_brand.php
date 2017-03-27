<?php

use yii\db\Migration;

class m170322_071338_create_table_brand extends Migration
{
    public function up()
    {

        $this->execute("CREATE TABLE brand("
                . "id int not null primary key auto_increment,"
                . "name varchar(255) not null,"
                . "description text null,"
                . "created_at int not null,"
                . "updated_at int not null)");
    }

    public function down()
    {
        echo "m170322_071338_create_table_brand cannot be reverted.\n";

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
