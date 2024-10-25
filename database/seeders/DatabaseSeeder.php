<?php

namespace Database\Seeders;

use App\Models\Baby;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $adel =  User::factory()->create([
            'name' => 'Adel',
            'email' => 'kovacsadel12@gmail.com',
        ]);

        $reka =  User::factory()->create([
            'name' => 'Reka',
            'email' => 'missrekabarath@gmail.com',
        ]);

        // Create babies and associate them with the user

        // Create babies and associate them with the user
        $babies = Baby::factory()->count(2)->create();

        // Ensure only an array of IDs is passed to attach
        $reka->babies()->attach($babies->pluck('id')->toArray());
        $adel->babies()->attach($babies->pluck('id')->toArray());


    }
}
