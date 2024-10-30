<?php

namespace App\Console\Commands;

use App\Models\BreastFeedLog;
use App\Models\DiaperChangeLog;
use App\Models\Log;
use App\Models\SleepLog;
use Illuminate\Console\Command;

class UpdateStartAndEndTimeOnLogs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-start-and-end-time-on-logs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Migrate BreastFeed logs
        BreastFeedLog::chunk(100, function ($breastFeeds) {
            foreach ($breastFeeds as $breastFeed) {
                $breastFeed->log->update([
                    'ended_at' => $breastFeed->ended_at,
                    'started_at' => $breastFeed->started_at,
                ]);
            }
        });

        $this->info('BreastFeeds migrated successfully');

        // Migrate DiaperChange logs
        DiaperChangeLog::chunk(100, function ($diaperChanges) {
            foreach ($diaperChanges as $diaperChange) {
                $diaperChange->log->update([
                    'ended_at' => $diaperChange->ended_at,
                    'started_at' => $diaperChange->started_at,
                ]);
            }
        });

        $this->info('Diaperchanges migrated successfully');

        SleepLog::chunk(100, function ($sleeps) {
            foreach ($sleeps as $sleep) {
                $sleep->log->update([
                    'ended_at' => $sleep->ended_at,
                    'started_at' => $sleep->started_at,
                ]);
            }
        });

        $this->info('Sleeps migrated successfully');
    }
}
