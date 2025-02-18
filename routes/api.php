<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\ConversionTextController;
use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\BlogTextController;

Route::prefix('v1')->group(function () {

    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {

        Route::post('logout', [AuthController::class, 'logout']);
        Route::apiResource('users', UserController::class);
        Route::apiResource('sites', SiteController::class);
        Route::apiResource('conversion-texts', ConversionTextController::class);
        Route::apiResource('blog-categories', BlogCategoryController::class);
        Route::apiResource('blog-texts', BlogTextController::class);
    });
});

