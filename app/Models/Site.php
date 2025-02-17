<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    use HasFactory;

    /**
     * Atributos que podem ser atribuídos em massa.
     */
    protected $fillable = [
        'user_id',
        'name',
        'domain',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function conversionTexts()
    {
        return $this->hasMany(ConversionText::class);
    }

    public function blogCategories()
    {
        return $this->hasMany(BlogCategory::class);
    }

    public function blogTexts()
    {
        return $this->hasMany(BlogText::class);
    }
}

