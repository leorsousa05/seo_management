<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogText extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_id',
        'blog_category_id',
        'title',
        'slug',
        'content',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }

    public function blogCategory()
    {
        return $this->belongsTo(BlogCategory::class);
    }
}

