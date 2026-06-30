<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCharacter extends Model
{
    protected $fillable = ['user_id', 'character_id', 'level', 'xp'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function character()
    {
        return $this->belongsTo(Character::class);
    }

    /** XP necessário para cada nível (1–5) */
    public static function xpForLevel(int $level): int
    {
        return match ($level) {
            1 => 0,
            2 => 100,
            3 => 300,
            4 => 700,
            5 => 1500,
            default => PHP_INT_MAX,
        };
    }
}
