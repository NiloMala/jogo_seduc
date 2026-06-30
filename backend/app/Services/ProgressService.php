<?php

namespace App\Services;

use App\Models\Achievement;
use App\Models\Phase;
use App\Models\Progress;
use App\Models\User;

class ProgressService
{
    public function saveProgress(User $user, Phase $phase, array $answers): array
    {
        $correct = collect($answers)->where('correct', true)->count();
        $total   = count($answers);
        $stars   = $this->calcStars($correct, $total);
        $score   = $correct * 10;

        $existing = Progress::where('user_id', $user->id)->where('phase_id', $phase->id)->first();

        if (! $existing || $stars > $existing->stars) {
            Progress::updateOrCreate(
                ['user_id' => $user->id, 'phase_id' => $phase->id],
                ['stars' => $stars, 'score' => $score, 'correct' => $correct, 'total' => $total, 'completed_at' => now()]
            );
        }

        $this->checkAchievements($user);

        return compact('stars', 'score', 'correct', 'total');
    }

    private function calcStars(int $correct, int $total): int
    {
        if ($total === 0) return 0;
        $pct = ($correct / $total) * 100;
        if ($pct >= 90) return 3;
        if ($pct >= 60) return 2;
        return 1;
    }

    private function checkAchievements(User $user): void
    {
        $totalStars  = $user->progresses()->sum('stars');
        $totalPhases = $user->progresses()->where('stars', '>', 0)->count();
        $perfectPhases = $user->progresses()->where('stars', 3)->count();

        $achievements = Achievement::all();
        $unlocked = $user->achievements()->pluck('achievement_id')->toArray();

        foreach ($achievements as $achievement) {
            if (in_array($achievement->id, $unlocked)) continue;

            $earned = match ($achievement->condition_type) {
                'stars_total'    => $totalStars >= $achievement->condition_value,
                'phases_complete' => $totalPhases >= $achievement->condition_value,
                'perfect_phase'  => $perfectPhases >= $achievement->condition_value,
                default          => false,
            };

            if ($earned) {
                $user->achievements()->attach($achievement->id);
            }
        }
    }
}
