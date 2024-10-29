<?php


namespace App\Http\Controllers;

use App\Models\Baby;
use App\Models\BreastFeedLog;
use App\Models\DiaperChangeLog;
use App\Models\Log;
use App\Models\SleepLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BabyController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $baby = new Baby([
            'name' => $request['name'],
            'date_of_birth' => $request['date_of_birth']
        ]);

        auth()->user()->babies()->save($baby);

        // redirect to babies/:id
        return redirect()->route('babies.show', ['baby' => $baby->id]);
    }

    public function show(\App\Models\Baby $user)
    {
        return Inertia::render('Baby/Show', [
            'user' => $user
        ]);
    }

    public function addSleepLog(\App\Models\Log $log, \App\Models\Baby $baby)
    {
        $sleepLog = SleepLog::create([
            'started_at' => now()->toISOString(),
            'baby_id' => $baby->id,
        ]);

        Log::create([
            'user_id' => auth()->id(),
            'baby_id' => $baby->id,
            'loggable_id' => $sleepLog->id,
            'loggable_type' => 'App\Models\SleepLog',
        ]);


        return redirect()->back()->with('success', 'Log added successfully.');
    }

    public function stopSleepLog(\App\Models\Baby $baby)
    {
        // sleep logs that don't have end date
        $sleepLogs = $baby->sleepLogs()->whereNull('ended_at')->get();

        foreach ($sleepLogs as $sleepLog) {
            $sleepLog->ended_at = now()->toISOString();
            $sleepLog->save();
        }

        return redirect()->back()->with('success', 'Log(s) closed successfully.');
    }

    public function addBreastFeedLog(Request $request, \App\Models\Baby $baby)
    {
        $breastFeedLog = BreastFeedLog::create([
            'started_at' => now()->toISOString(),
            'side' => $request->side,
            'baby_id' => $baby->id,
        ]);

        Log::create([
            'user_id' => auth()->id(),
            'baby_id' => $baby->id,
            'loggable_id' => $breastFeedLog->id,
            'loggable_type' => 'App\Models\BreastFeedLog',
        ]);

        return redirect()->back()->with('success', 'Log added successfully.');
    }

    public function endBreastFeed(\App\Models\Baby $baby)
    {
        // breastfeed logs that don't have end date
        $breastFeedLogs = $baby->breastFeedLogs()->whereNull('ended_at')->get();

        foreach ($breastFeedLogs as $breastFeedLog) {
            $breastFeedLog->ended_at = now()->toISOString();
            $breastFeedLog->save();
        }

        return redirect()->back()->with('success', 'Log(s) closed successfully.');
    }

    public function addDiaperChangeLog(Request $request, \App\Models\Baby $baby)
    {
        $diaperChangeLog =  DiaperChangeLog::create([
            'started_at' => now()->toISOString(),
            'type' => $request->type,
            'baby_id' => $baby->id,
        ]);

        Log::create([
            'user_id' => auth()->id(),
            'baby_id' => $baby->id,
            'loggable_id' => $diaperChangeLog->id,
            'loggable_type' => 'App\Models\DiaperChangeLog',
        ]);


        return redirect()->back()->with('success', 'Log added successfully.');
    }

    public function deleteLog(Request $request, \App\Models\Baby $baby)
    {
        $log = Log::find($request->id);
        $loggable = $log->loggable_type::find($log->loggable_id);
        $loggable->delete();
        $log->delete();

        return redirect()->back()->with('success', 'Baby deleted successfully.');
    }
}
