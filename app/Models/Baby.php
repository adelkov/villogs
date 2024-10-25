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

    protected static function booted()
    {
        static::addGlobalScope(new IncludeLogs);
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
    public function isSleeping(): bool
    {
        return $this->sleepLogs()->whereNull('ended_at')->exists();
    }

    // belongs to many users
    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
