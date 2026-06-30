<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProgressController extends Controller
{
    public function index(Request $request)
    {
        $progresses = $request->user()
            ->progresses()
            ->select('phase_id', 'stars', 'score', 'correct', 'total')
            ->get();

        return response()->json($progresses);
    }

    public function achievements(Request $request)
    {
        $achievements = $request->user()
            ->achievements()
            ->select('achievements.id', 'achievements.name', 'achievements.description', 'achievements.icon')
            ->get();

        return response()->json($achievements);
    }
}
