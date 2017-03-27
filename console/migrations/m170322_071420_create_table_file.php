<?php

use yii\db\Migration;

class m170322_071420_create_table_file extends Migration
{
    public function up()
    {
        $this->execute("create table file("
                . "id int not null primary key auto_increment,"
                . "user_id int not null,"
                . "path text not null,"
                . "created_at int not null,"
                . "upadted_at int not null,"
                . "foreign key(user_id) references user(id))");

    }

    public function down()
    {
        echo "m170322_071834_create_table_file cannot be reverted.\n";

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
