<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Note: API routes are loaded by bootstrap/app.php using the 'api' key.
// The `routes/api.php` file will be registered with the `api` middleware group.
