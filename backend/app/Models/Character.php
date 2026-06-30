<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    protected $fillable = ['key', 'name', 'emoji', 'specialty', 'personality', 'color', 'world'];

    public function userCharacters()
    {
        return $this->hasMany(UserCharacter::class);
    }
}
