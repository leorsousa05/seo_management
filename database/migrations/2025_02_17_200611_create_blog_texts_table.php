<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogTextsTable extends Migration
{
    public function up()
    {
        Schema::create('blog_texts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('site_id');
            // Caso o texto do blog possa não ter categoria, deixamos a FK como nullable.
            $table->unsignedBigInteger('blog_category_id')->nullable();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content');
            $table->timestamps();

            // Relação com o site
            $table->foreign('site_id')->references('id')->on('sites')->onDelete('cascade');
            // Relação com a categoria; se a categoria for deletada, definimos a FK como null.
            $table->foreign('blog_category_id')->references('id')->on('blog_categories')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('blog_texts');
    }
}

