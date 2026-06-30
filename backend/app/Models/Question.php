<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['phase_id', 'question', 'type', 'options', 'correct', 'explanation', 'bncc_code', 'order'];

    protected $casts = [
        'options' => 'array',
    ];

    public function phase()
    {
        return $this->belongsTo(Phase::class);
    }
}
