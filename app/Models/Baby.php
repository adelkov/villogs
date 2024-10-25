<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Baby extends Model
{
    use HasFactory;

    public function logs(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Log::class, 'loggable');
    }

    // belongs to many users
    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
