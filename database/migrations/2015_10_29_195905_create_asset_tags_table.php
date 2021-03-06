<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssetTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asset_tags', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('asset_type_id')->unsigned();
            $table->integer('asset_id')->unsigned();
            $table->integer('work_station_id')->unsigned()->nullable();
            $table->integer('purchase_order_id')->unsigned()->nullable();
            $table->string('computer_name')->nullable();
            $table->string('serial')->nullable();
            $table->string('prefix');
            $table->integer('sequence')->unsigned();
            $table->string('property_code')->unique();
            $table->text('remarks')->nullable();
            $table->dateTime('warranty_end')->nullable();
            $table->dateTime('date_received')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('asset_tags');
    }
}
