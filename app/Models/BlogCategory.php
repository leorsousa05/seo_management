<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_id',
        'name',
        'slug',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }

    public function blogTexts()
    {
        return $this->hasMany(BlogText::class);
    }
}

