<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiaperChangeLog extends Model
{
    use HasFactory;

    // fillable started_at
    protected $fillable = ['started_at', 'type', 'baby_id'];

    public function log()
    {
        return $this->morphOne(Log::class, 'loggable');
    }

    // belongs to baby
    public function baby(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Baby::class);
    }
}
