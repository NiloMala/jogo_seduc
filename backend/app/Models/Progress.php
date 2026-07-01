<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    protected $table = 'progresses';

    protected $fillable = ['user_id', 'phase_id', 'stars', 'score', 'correct', 'total', 'completed_at'];

    protected $casts = [
        'completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function phase()
    {
        return $this->belongsTo(Phase::class);
    }
}
