<?php

use yii\db\Migration;

class m170322_071503_create_table_product extends Migration
{
    public function up()
    {


        $this->execute("CREATE TABLE product("
                . "id int not null primary key auto_increment,"
                . "name varchar(255) not null,"
                . "category_id int not null,"
                . "brand_id int not null,"
                . "manufacturer_id int not null,"
                . "tag_id int not null,"
                . "price double not null,"
                . "production_date varchar(20) not null,"
                . "thumbnail_id int not null,"
                . "object_id int not null,"
                . "foreign key(category_id) references category(id),"
                . "foreign key(brand_id) references brand(id),"
                . "foreign key(thumbnail_id) references file(id),"
                . "foreign key(object_id) references file(id),"
                . "foreign key(manufacturer_id) references manufacturer(id),"
                . "foreign key(tag_id) references tag(id),"
                . "created_at int not null,"
                . "updated_at int not null)");
    }

    public function down()
    {
        echo "m170322_071503_create_table_product cannot be reverted.\n";

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
