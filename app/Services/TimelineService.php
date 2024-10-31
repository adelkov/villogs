<?php

namespace App\Services;

use App\Models\Log;
use Illuminate\Database\Eloquent\Collection;

class TimelineService
{

    // a function that takes a date, it returns how many minutes passed to that date from the start of the day
    public static function minutesPassedFromStartOfDay($date)
    {
        $fromStartInMinutes = $date
            ->startOfDay()
            ->diffInMinutes($date);
        $fromStartInPercentage = ($fromStartInMinutes / 1440) * 100;
        return $fromStartInPercentage;
    }

    // takes two dates, returns the difference in minutes
    public static function minutesDifference($date1, $date2)
    {
        $diffInMinutes = $date1->diffInMinutes($date2);
        $diffInPercentage = ($diffInMinutes / 1440) * 100;
        return $diffInPercentage;
    }

    // array of log types
    public static function transformLogsToTimeline(Collection $logs)
    {
        $adjustedLogs = collect();

        // Loop through each log
        foreach ($logs as $log) {
            // Calculate the percentage of the day that has passed since the log started
            $fromStartInPercentage = TimelineService::minutesPassedFromStartOfDay($log->started_at);
            // Calculate the percentage of the day that has passed since the log ended
            $fromEndInPercentage = TimelineService::minutesDifference($log->started_at, $log->ended_at);

            // Add the log to the adjusted logs collection
            $adjustedLogs->push([
                'log' => $log,
                'fromStartInPercentage' => $fromStartInPercentage,
                'fromEndInPercentage' => $fromEndInPercentage,
            ]);
        }


        // Group logs by date
        $groupedLogs = $adjustedLogs->groupBy(function ($log) {
            return $log->started_at->format('Y-m-d');
        });

        return $groupedLogs;
    }
}
