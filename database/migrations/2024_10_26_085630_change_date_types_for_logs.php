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
            $table->string('started_at')->change();
        });
        Schema::table('breast_feed_logs', function (Blueprint $table) {
            $table->string('started_at')->change();
        });
        Schema::table('diaper_change_logs', function (Blueprint $table) {
            $table->string('started_at')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sleep_logs', function (Blueprint $table) {
            $table->date('started_at')->change();
            $table->date('ended_at')->change();
        });
        Schema::table('breast_feed_logs', function (Blueprint $table) {
            $table->date('started_at')->change();
        });
        Schema::table('diaper_change_logs', function (Blueprint $table) {
            $table->dateTime('started_at')->change();
        });
    }
};
