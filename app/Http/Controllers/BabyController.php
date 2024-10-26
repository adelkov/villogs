<?php


namespace App\Http\Controllers;

use App\Models\Baby;
use App\Models\BreastFeedLog;
use App\Models\DiaperChangeLog;
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
        $sleepLog = new SleepLog([
            'started_at' => now()->toISOString(),
        ]);
        $baby->sleepLogs()->save($sleepLog);

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
        $breastFeedLog = new BreastFeedLog([
            'started_at' => now()->toISOString(),
            'side' => $request->side,
        ]);

        $baby->breastFeedLogs()->save($breastFeedLog);

        return redirect()->back()->with('success', 'Log added successfully.');
    }

    public function addDiaperChangeLog(Request $request, \App\Models\Baby $baby)
    {
        $diaperChangeLog = new DiaperChangeLog([
            'started_at' => now()->toISOString(),
            'type' => $request->type,
        ]);

        $baby->diaperChangeLogs()->save($diaperChangeLog);

        return redirect()->back()->with('success', 'Log added successfully.');
    }

    public function deleteLog(Request $request, \App\Models\Baby $baby)
    {
        $type = $request->type;

        if ($type === 'sleep') {
            SleepLog::destroy($request->id);
        } elseif ($type === 'breastfeed') {
            BreastFeedLog::destroy($request->id);
        } elseif ($type === 'diaperchange') {
            DiaperChangeLog::destroy($request->id);
        }

        return redirect()->back()->with('success', 'Baby deleted successfully.');
    }
}
