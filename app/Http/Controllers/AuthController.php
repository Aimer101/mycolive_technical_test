<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\View;

class AuthController extends Controller {
    
    public function login() {
        $result = Cache::remember('login_view', 60, function () {
            return View::make('login')->render();
        });

        return $result;
    }
    
    public function authenticate(Request $request) {     
        // $validator = Validator::make($request->all(), [
        //     'username' => 'required|unique:users|max:30|min:6',
        //     'password' => 'required|max:30|min:6',
        // ]);

        // if ($validator->fails()) {
        //     return back()->withErrors($validator)->withInput();
        // }

        // $credentials = $request->only('username', 'password');

        // if (Auth::attempt($credentials)) {
        //     // Authentication successful
        //     return redirect()->intended('/index');
        // }

        // Authentication failed
        return redirect()->route('quiz')->withErrors(['username' => 'Invalid credentials'])->withInput();
    }

    public function showRegistrationForm() {
        $result = Cache::remember('registration_view', 60, function () {
            return View::make('register')->render();
        });

        return $result;
    }

    public function register(Request $request) {
        // $validator = Validator::make($request->all(), [
        //     'username' => 'required|unique:users|min:6|max:30',
        //     'password' => 'required|min:6|max:30',
        //     'password_confirmation' => 'required|same:password'
        // ]);

        // if ($validator->fails()) {
        //     return back()->withErrors($validator)->withInput();
        // }

        // $user = new User();
        // $user->username = $request->username;
        // $user->password = Hash::make($request->password);
        // $user->save();

        return redirect()->route('login')->with('success', 'Registration successful. Please log in.');
    }
}
