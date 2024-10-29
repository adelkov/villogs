<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Carbon\Carbon;


Route::get('/', function () {
    $user = auth()->user();
    if ($user->babies()->exists()) {

        return redirect()->route('babies.show', $user->babies()->latest()->first());
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

    Route::get('/babies/{baby}/sleeping', function (
        \App\Models\Baby $baby
    ) {

        $sleepLogs = \App\Models\SleepLog::where('baby_id', $baby->id)
            ->orderByDesc('started_at')
            ->get();
        return Inertia::render('Babies/Sleep', [
            'baby' => $baby,
            'logs' => $sleepLogs,
        ]);
    })->name('babies.sleep');
    // breastfeeding
    Route::get('/babies/{baby}/breastfeeding', function (
        \App\Models\Baby $baby
    ) {
        $breastFeedLogs = \App\Models\BreastFeedLog::where('baby_id', $baby->id)
            ->orderByDesc('started_at')
            ->get();
        return Inertia::render('Babies/BreastFeed', [
            'baby' => $baby,
            'logs' => $breastFeedLogs,
        ]);
    })->name('babies.breastfeed');
    // diaper change
    Route::get('/babies/{baby}/diaperchanges', function (
        \App\Models\Baby $baby
    ) {
        $diaperChangeLogs = \App\Models\DiaperChangeLog::where('baby_id', $baby->id)
            ->orderByDesc('started_at')
            ->get();
        return Inertia::render('Babies/DiaperChange', [
            'baby' => $baby,
            'logs' => $diaperChangeLogs,
        ]);
    })->name('babies.diaperchanges');

    Route::get('/babies/{baby}', function (
        \App\Models\Baby $baby
    ) {
        $today = Carbon::today();

        return Inertia::render('Babies/Show', [
            'baby' => $baby,
            'status' => $baby->status(),
            // all the logs merged into one field, add type to all and sort by started_at
            'logs' => $baby->logs()
                ->with('loggable')
                ->where(function ($query) use ($today) {
                    $query->whereHasMorph(
                        'loggable',
                        [App\Models\BreastFeedLog::class, App\Models\SleepLog::class],
                        function ($query) use ($today) {
                            $query->whereDate('started_at', $today)
                                ->orWhere(function ($query) use ($today) {
                                    $query->whereNotNull('ended_at')
                                        ->whereDate('ended_at', $today);
                                });
                        }
                    )->orWhereHasMorph(
                        'loggable',
                        [App\Models\DiaperChangeLog::class],
                        function ($query) use ($today) {
                            $query->whereDate('started_at', $today);
                            // No need to check for ended_at since this model doesn't have it
                        }
                    );
                })
                ->orderBy('created_at', 'desc')
                ->get()->toArray(),
        ]);
    })->name('babies.show');

    Route::post('/babies/{baby}/logs/sleep/start', [\App\Http\Controllers\BabyController::class, 'addSleepLog'])->name('babies.logs.add.sleep.start');
    Route::post('/babies/{baby}/logs/sleep/end', [\App\Http\Controllers\BabyController::class, 'stopSleepLog'])->name('babies.logs.add.sleep.end');
    Route::post('/babies/{baby}/logs/breastfeed', [\App\Http\Controllers\BabyController::class, 'addBreastFeedLog'])->name('babies.logs.add.breastfeed');
    Route::delete('/babies/{baby}/logs/breastfeed', [\App\Http\Controllers\BabyController::class, 'endBreastFeed'])->name('babies.logs.add.breastfeed.end');
    Route::post('/babies/{baby}/logs/diaperchange', [\App\Http\Controllers\BabyController::class, 'addDiaperChangeLog'])->name('babies.logs.add.diaperchange');
    Route::delete('/babies/{baby}/logs', [\App\Http\Controllers\BabyController::class, 'deleteLog'])->name('babies.logs.delete');

    Route::resource('breastFeedLogs', \App\Http\Controllers\BreastFeedLogController::class);
    Route::resource('diaperChangeLogs', \App\Http\Controllers\DiaperChangeLogController::class);
    Route::resource('sleepLogs', \App\Http\Controllers\SleepLogController::class);

});

require __DIR__ . '/auth.php';
