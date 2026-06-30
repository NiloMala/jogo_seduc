<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{
    protected $fillable = ['world', 'number', 'title', 'school_year', 'character_key', 'description'];

    public function questions()
    {
        return $this->hasMany(Question::class)->orderBy('order');
    }

    public function progresses()
    {
        return $this->hasMany(Progress::class);
    }
}
