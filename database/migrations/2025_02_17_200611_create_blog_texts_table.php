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
            $table->unsignedBigInteger('blog_category_id')->nullable();
            $table->string('title');
            $table->string('slug');
            $table->text('content');
            $table->timestamps();

            $table->foreign('site_id')->references('id')->on('sites')->onDelete('cascade');
            $table->foreign('blog_category_id')->references('id')->on('blog_categories')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('blog_texts');
    }
}

