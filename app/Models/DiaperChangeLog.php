<?php

namespace App\Models;

use App\Contracts\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiaperChangeLog extends Model implements Loggable
{

    use HasFactory;

    public function add(array $data)
    {
        // Implement add functionality
    }

    public function updateLog(array $data)
    {
        // Implement update functionality
    }

    public function deleteLog()
    {
        // Implement delete functionality
    }
}
