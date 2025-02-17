<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConversionText extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_id',
        'title',
        'slug',
        'content',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}

