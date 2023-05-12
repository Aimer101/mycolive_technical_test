@extends('layout.result')

@section('main')
{{-- YOU need to change {INSERT_USER_SCORE_HERE} with the authenticated users' score --}}

<body>
    <div class="container">
        <div class="wrapper">
            <div class="page-name">
                <h1>Trivia Game</h1>
            </div>
            <div class="result-page-container">

                <div class= "middle">
                    <p>You have answered correctly {{$score}} % of the trivia questions </p>
                </div>

                <div class="redirect">
                    <form action="{{ route('quiz.retry') }}" method="POST">
                        @csrf
                        <button type="submit" class="retry">
                            Retry Quiz
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
@endsection
