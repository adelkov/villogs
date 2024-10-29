<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SleepLog>
 */
class SleepLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'baby_id' => 1,
            // random time in past 1-2 days
            'started_at' => now()->subDays(rand(1, 2)),
            // random time 1-2 hours after started_at
            'ended_at' => now()->subDays(rand(1, 2))->addHours(rand(1, 2)),
        ];
    }
}
