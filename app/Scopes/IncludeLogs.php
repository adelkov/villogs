<?php

namespace App\Scopes;

use App\Enums\TransactionStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class IncludeLogs implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        $builder->with('sleepLogs')->with('breastFeedLogs')->with('diaperChangeLogs');
    }
}
