<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    // fields

    protected $fillable = ['baby_id', 'user_id', 'loggable_id', 'loggable_type', 'started_at', 'ended_at'];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
    ];

    public function loggable()
    {
        return $this->morphTo();
    }
}
