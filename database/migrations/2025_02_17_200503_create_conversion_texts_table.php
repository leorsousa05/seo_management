<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConversionTextsTable extends Migration
{
    public function up()
    {
        Schema::create('conversion_texts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('site_id');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content'); // Conteúdo formatado com HTML
            $table->timestamps();  // created_at armazenará a data de criação

            $table->foreign('site_id')->references('id')->on('sites')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('conversion_texts');
    }
}

