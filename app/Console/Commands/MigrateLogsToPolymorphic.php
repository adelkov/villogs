<?php

namespace App\Console\Commands;

use App\Models\BreastFeedLog;
use App\Models\DiaperChangeLog;
use App\Models\Log;
use App\Models\SleepLog;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MigrateLogsToPolymorphic extends Command
{

    // optional input
    protected function serializeDate(string $date = null)
    {
        // if missing return null
        if (is_null($date)) {
            return null;
        }
        return Carbon::parse($date)->setTimezone('UTC')->format('Y-m-d H:i:s');
    }
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrate-logs-to-polymorphic';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make all logs polymorphic thru loggable relationship';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Migrate BreastFeed logs
        BreastFeedLog::chunk(100, function ($breastFeeds) {
            foreach ($breastFeeds as $breastFeed) {
                Log::create([
                    'baby_id' => $breastFeed->baby_id,
                    'user_id' => 1,
                    'loggable_id' => $breastFeed->id,
                    'loggable_type' => BreastFeedLog::class,
                    'ended_at' => $this->serializeDate($breastFeed->ended_at),
                    'started_at' => $this->serializeDate($breastFeed->started_at),
                ]);
            }
        });

        $this->info('BreastFeeds migrated successfully');

        // Migrate DiaperChange logs
        DiaperChangeLog::chunk(100, function ($diaperChanges) {
            foreach ($diaperChanges as $diaperChange) {
                Log::create([
                    'baby_id' => $diaperChange->baby_id,
                    'user_id' => 1,
                    'loggable_id' => $diaperChange->id,
                    'loggable_type' => DiaperChangeLog::class,
                    'started_at' => $this->serializeDate($diaperChange->started_at),
                ]);
            }
        });

        $this->info('Diaperchanges migrated successfully');

        SleepLog::chunk(100, function ($sleeps) {
            foreach ($sleeps as $sleep) {
                Log::create([
                    'baby_id' => $sleep->baby_id,
                    'user_id' => 1,
                    'loggable_id' => $sleep->id,
                    'loggable_type' => SleepLog::class,
                    'ended_at' => $this->serializeDate($sleep->ended_at),
                    'started_at' => $this->serializeDate($sleep->started_at),
                ]);
            }
        });

        $this->info('Sleeps migrated successfully');
    }
}
