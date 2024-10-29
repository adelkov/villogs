<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SleepLog extends Model
{
    use HasFactory;

    // fillable started_at
    protected $fillable = ['started_at', 'ended_at', 'baby_id'];

    public function log(): \Illuminate\Database\Eloquent\Relations\MorphOne
    {
        return $this->morphOne(Log::class, 'loggable');
    }

    // belongs to baby
    public function baby(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Baby::class);
    }
}
