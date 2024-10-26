<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {

    $user = auth()->user();
    if ($user->babies()->exists()) {
        return redirect()->route('babies.show', $user->babies()->first());
    }


    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'auth' => auth()->user(),
        'babies' => auth()->user()->babies()->get(),
    ]);
})->middleware(['auth', 'verified'])->name('welcome');

Route::post('/babies', [\App\Http\Controllers\BabyController::class, 'store'])->name('babies.store');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/babies/{baby}', function (
        \App\Models\Baby $baby
    ) {

        // add variant for each type of log
        $breastFeedsStartedAtToday = $baby->breastFeedLogs()->whereDate('started_at', now()->startOfDay())->get() // add type to all
        ->map(function ($log) {
            $log->variant = 'breastfeed';
            return $log;
        })->toArray();

        $sleepLogsStartedAtToday = $baby->sleepLogs()->whereDate('started_at', now()->startOfDay())->get()
            ->map(function ($log) {
                $log->variant = 'sleep';
                return $log;
            })->toArray();

        $diaperChangeLogsStartedAtToday = $baby->diaperChangeLogs()->whereDate('started_at', now()->startOfDay())->get()
            ->map(function ($log) {
                $log->variant = 'diaperchange';
                return $log;
            })->toArray();


        return Inertia::render('Babies/Show', [
            'baby' => $baby,
            'status' => $baby->status(),
            // all the logs merged into one field, add type to all and sort by started_at
            'logs' => array_merge($breastFeedsStartedAtToday, $sleepLogsStartedAtToday, $diaperChangeLogsStartedAtToday),
        ]);
    })->name('babies.show');

    Route::post('/babies/{baby}/logs/sleep/start', [\App\Http\Controllers\BabyController::class, 'addSleepLog'])->name('babies.logs.add.sleep.start');
    Route::post('/babies/{baby}/logs/sleep/end', [\App\Http\Controllers\BabyController::class, 'stopSleepLog'])->name('babies.logs.add.sleep.end');
    Route::post('/babies/{baby}/logs/breastfeed', [\App\Http\Controllers\BabyController::class, 'addBreastFeedLog'])->name('babies.logs.add.breastfeed');
    Route::delete('/babies/{baby}/logs/breastfeed', [\App\Http\Controllers\BabyController::class, 'endBreastFeed'])->name('babies.logs.add.breastfeed.end');
    Route::post('/babies/{baby}/logs/diaperchange', [\App\Http\Controllers\BabyController::class, 'addDiaperChangeLog'])->name('babies.logs.add.diaperchange');
    Route::delete('/babies/{baby}/logs', [\App\Http\Controllers\BabyController::class, 'deleteLog'])->name('babies.logs.delete');
});

require __DIR__ . '/auth.php';
