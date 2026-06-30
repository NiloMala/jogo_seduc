<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PhaseController;
use App\Http\Controllers\ProgressController;
use Illuminate\Support\Facades\Route;

// Autenticação (pública)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// Rotas protegidas por Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);

    // Fases e questões
    Route::get('/phases',                      [PhaseController::class, 'index']);
    Route::get('/phases/{phase}/questions',    [PhaseController::class, 'questions']);
    Route::post('/phases/{phase}/submit',      [PhaseController::class, 'submit']);

    // Progresso e conquistas
    Route::get('/progress',     [ProgressController::class, 'index']);
    Route::get('/achievements', [ProgressController::class, 'achievements']);
});
