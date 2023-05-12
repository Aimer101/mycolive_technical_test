<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;

$controller_prefix = 'App\Http\Controllers\\';

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return view('quiz');
    })->name('quiz');

   // move method here after 
});

Route::match(['GET', 'POST'], '/quiz', [QuizController::class, 'quiz'])->name('quiz.submit');
Route::get('/quiz/success',  $controller_prefix.'QuizController@success')->name('quiz.success');
Route::get('/quiz/fail/{score}',  $controller_prefix.'QuizController@fail')->name('quiz.fail');
Route::post('/retry',$controller_prefix.'QuizController@retry')->name('quiz.retry');

Route::match(['GET', 'POST'], 'login', $controller_prefix.'AuthController@login')->name('login');
Route::match(['GET', 'POST'], 'register', $controller_prefix.'AuthController@register')->name('register');
Route::post('/login/authenticate', $controller_prefix.'AuthController@authenticate')->name('login.authenticate');
Route::get('/register', $controller_prefix.'AuthController@showRegistrationForm')->name('register.show');
