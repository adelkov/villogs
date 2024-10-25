<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            // belongs to a baby model by baby id
            $table->foreignId('baby_id')->constrained();
            $table->string('type');
            $table->morphs('loggable'); // Polymorphic relationship
        });

        // sleep_logs table migration
        Schema::create('sleep_logs', function (Blueprint $table) {
            $table->id();
            $table->dateTime('started_at');
            $table->dateTime('ended_at')->nullable();
            $table->timestamps();
        });

// breastfeed_logs table migration
        Schema::create('breastfeed_logs', function (Blueprint $table) {
            $table->id();
            $table->dateTime('started_at');
            $table->dateTime('ended_at')->nullable();
            $table->enum('side', ['left', 'right']);
            $table->timestamps();
        });

// diaper_change_logs table migration
        Schema::create('diaper_change_logs', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['pee', 'poop', 'both', 'empty']);
            $table->dateTime('started_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
        Schema::dropIfExists('sleep_logs');
        Schema::dropIfExists('breastfeed_logs');
        Schema::dropIfExists('diaper_change_logs');
    }
};
