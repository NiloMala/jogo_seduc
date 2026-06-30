<?php

namespace App\Http\Controllers;

use App\Models\Phase;
use App\Services\ProgressService;
use Illuminate\Http\Request;

class PhaseController extends Controller
{
    public function __construct(private ProgressService $progressService) {}

    public function index(Request $request)
    {
        $request->validate([
            'world'       => 'required|string',
            'school_year' => 'nullable|integer|between:1,5',
        ]);

        $schoolYear = $request->integer('school_year') ?: $request->user()->school_year;

        $phases = Phase::where('world', $request->world)
            ->where('school_year', $schoolYear)
            ->orderBy('number')
            ->get(['id', 'number', 'title', 'character_key', 'description']);

        return response()->json($phases);
    }

    public function questions(Phase $phase)
    {
        $questions = $phase->questions()
            ->select('id', 'question', 'type', 'options', 'correct', 'order')
            ->get()
            ->shuffle();

        return response()->json($questions);
    }

    public function submit(Request $request, Phase $phase)
    {
        $data = $request->validate([
            'answers'           => 'required|array',
            'answers.*.questionId' => 'required|integer',
            'answers.*.answer'  => 'required|string',
            'answers.*.correct' => 'required|boolean',
        ]);

        $result = $this->progressService->saveProgress($request->user(), $phase, $data['answers']);

        return response()->json($result);
    }
}
