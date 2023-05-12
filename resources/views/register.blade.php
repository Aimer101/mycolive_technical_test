@extends('layout.auth')

@section('main')
<body>
    <div class="container">
        <div class="wrapper">
            <form class="auth-container" method="POST" action="{{ route('register.show') }}">
                {{ csrf_field() }}

                <div class="page-title">
                    <h2>SIGN UP</h2>
                </div>

                <div class="form-container">
                    <input type="text" name="username" placeholder="Username" required>
                    @if ($errors->has('username'))
                    <span class="text-red-500">{{ $errors->first('username') }}</span>
                    @endif
                </div>

                <div class="form-container">
                    <input type="password" name="password" placeholder="Password" required>
                    @if ($errors->has('password'))
                    <span class="text-red-500">{{ $errors->first('password') }}</span>
                    @endif
                </div>

                <div class="form-container">
                    <input type="password" name="password_confirmation" placeholder="Confirm Password" required>
                    @if ($errors->has('password_confirmation'))
                    <span class="text-red-500">{{ $errors->first('confirm_password') }}</span>
                    @endif
                </div>

                <button class="button-submit" type="submit">Signup</button>

                <span class="redirect">
                    Already have an account? <a href="{{ route('login') }}">Login here</a>
                </span>
            </form>
        </div>
    </div>
</body>
@endsection
