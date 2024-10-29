<?php

namespace App\Models;

use App\Scopes\ExcludeCancelledTransactionsScope;
use App\Scopes\IncludeLogs;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rules\In;

class Baby extends Model
{
    use HasFactory;

    public BreastFeedLog $breastFeedLogs;
    public DiaperChangeLog $diaperChangeLogs;
    public SleepLog $sleepLogs;

    protected $fillable = [
        'name',
        'date_of_birth',
    ];

    protected static function booted()
    {
        static::addGlobalScope(new IncludeLogs);
    }

    public function logs()
    {
        return $this->hasMany(Log::class);
    }

    // sleepLogs
    public function sleepLogs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(SleepLog::class);
    }

    // diaperChangeLogs
    public function diaperChangeLogs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(DiaperChangeLog::class);
    }

    // breastFeedLogs
    public function breastFeedLogs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(BreastFeedLog::class);
    }

    // isSleeping boolean field, if has a sleep log that is not ended
    public function status(): string
    {
        $isSleeping = $this->sleepLogs()->whereNull('ended_at')->exists();
        $isBreastFeeding = $this->breastFeedLogs()->whereNull('ended_at')->exists();
        if ($isSleeping) {
            return 'sleeping';
        }
        if ($isBreastFeeding) {
            return 'breastfeeding';
        }
        return 'awake';
    }

    // belongs to many users
    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
