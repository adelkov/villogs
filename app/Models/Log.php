<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $fillable = ['baby_id', 'user_id', 'loggable_id', 'loggable_type', 'started_at', 'ended_at'];


    public function loggable()
    {
        return $this->morphTo();
    }
}
