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




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/babies', [\App\Http\Controllers\BabyController::class, 'store'])->name('babies.store');
    Route::get('/babies/{baby}/sleeping', function (
        \App\Models\Baby $baby
    ) {
        $sleepLogs = $baby->logs()->where(
            'loggable_type',
            \App\Models\SleepLog::class
        )->with('loggable')
            ->whereHas('loggable')
            ->orderBy('started_at', 'desc')
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

        return Inertia::render('Babies/BreastFeed', [
            'baby' => $baby,
            'logs' => $baby->logs()->where(
                'loggable_type',
                \App\Models\BreastFeedLog::class
            )->with('loggable')
                ->whereHas('loggable')
                ->get()
        ]);
    })->name('babies.breastfeed');
    // diaper change
    Route::get('/babies/{baby}/diaperchanges', function (
        \App\Models\Baby $baby
    ) {

        return Inertia::render('Babies/DiaperChange', [
            'baby' => $baby,
            'logs' => $baby->logs()->where(
                'loggable_type',
                \App\Models\DiaperChangeLog::class
            )->with('loggable')
                ->whereHas('loggable')
                ->get()
        ]);
    })->name('babies.diaperchanges');

    Route::get('/babies/{baby}', function (
        \App\Models\Baby $baby
    ) {
        $today = Carbon::today();

        return Inertia::render('Babies/Show', [
            'baby' => $baby,
            'status' => $baby->status(),
            'timeline' => \App\Services\TimelineService::transformLogsToTimeline($baby->logs()->get()),
            // all the logs merged into one field, add type to all and sort by started_at
            'logs' => $baby->logs()
                ->with('loggable')
                ->where('started_at', '>=', $today)
                ->orWhere('ended_at', '>=', $today)
                // where has not ended yet and is sleep or breastfeeding
                ->where(function ($query) {
                    $query->where('ended_at', null)
                        ->where(function ($query) {
                            $query->where('loggable_type', \App\Models\SleepLog::class)
                                ->orWhere('loggable_type', \App\Models\BreastFeedLog::class);
                        });
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
    Route::delete('/logs/{id}', function ($id) {
        $log = \App\Models\Log::find($id);
        $log->loggable->delete();
        $log->delete();
        return redirect()->back();
    })->name('logs.delete');

    Route::resource('breastFeedLogs', \App\Http\Controllers\BreastFeedLogController::class);
    Route::resource('diaperChangeLogs', \App\Http\Controllers\DiaperChangeLogController::class);
    Route::resource('sleepLogs', \App\Http\Controllers\SleepLogController::class);

});

require __DIR__ . '/auth.php';
