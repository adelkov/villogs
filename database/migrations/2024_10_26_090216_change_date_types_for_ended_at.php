<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('sleep_logs', function (Blueprint $table) {
            $table->string('ended_at')->nullable()->change();
        });
        Schema::table('breast_feed_logs', function (Blueprint $table) {
            $table->string('ended_at')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sleep_logs', function (Blueprint $table) {
            $table->dateTime('ended_at')->nullable()->change();
        });
        Schema::table('breast_feed_logs', function (Blueprint $table) {
            $table->dateTime('ended_at')->nullable()->change();
        });
    }

};


