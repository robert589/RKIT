<?php

use yii\db\Migration;

class m170322_071205_create_table_tag extends Migration
{
    public function up()
    {

        $this->execute("CREATE TABLE tag("
                . "id int not null primary key auto_increment,"
                . "name varchar(255) not null,"
                . "description text null,"
                . "created_at int not null,"
                . "updated_at int not null)");
    }

    public function down()
    {
        echo "m170322_071205_create_table_tag cannot be reverted.\n";

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
