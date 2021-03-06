<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWorkStationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('work_stations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->integer('floor');
            $table->string('type');
            $table->string('division');
            $table->string('ip_address')->unique()->nullable();
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
        Schema::drop('work_stations');
    }
}
