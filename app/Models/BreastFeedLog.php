<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BreastFeedLog extends Model
{
    use HasFactory;

    // fillable started_at
    protected $fillable = ['started_at', 'side', 'ended_at'];

    // belongs to baby
    public function baby(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Baby::class);
    }
}
