<?php

namespace App\Contracts;

interface Loggable
{
    public function add(array $data);

    public function updateLog(array $data);

    public function deleteLog();
}
