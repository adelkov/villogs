<?php

namespace App\Http\Controllers;

use App\Models\DiaperChangeLog;
use Illuminate\Http\Request;

class DiaperChangeLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DiaperChangeLog $diaperChangeLog)
    {
        $diaperChangeLog->update([
            'started_at' => $request->started_at,
            'type' => $request->type,
        ]);
        return redirect()->back()->with('success', 'Log(s) updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}