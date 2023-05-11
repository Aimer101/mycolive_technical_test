@extends('layout.result')

@section('main')
<body>
    <div class="container">
        <div class="wrapper">
            <h1 class="page-name">Trivia Game</h1>
            <div class="progress-bar-wrapper">
                <div class="progress-bar__progress" style="width: {{ ($currentQuestionIndex + 1) / $totalQuestions * 100 }}%"></div>
                <div class="progress-bar-label">
                    {{ $currentQuestionIndex + 1 }}/{{ $totalQuestions }} Questions
                </div>
            </div>

            <div class="result-wrapper">
                @if ($currentQuestion)
                <h2 class="question">{{ $currentQuestion['question'] }}</h2>
                <div class="result-container">
                    @foreach ($currentQuestion['answers'] as $answer)
                    <form action="{{ route('quiz.submit') }}" method="POST">
                        @csrf
                        <input type="hidden" name="selectedAnswer" value="{{ $answer }}">
                        <button onclick="checkAnswer(this)" type="submit" class="answer-button">
                            <span class="button-text">{{ $answer }}</span>
                            <span class="feedback-text"></span>
                        </button>
                    </form>
                    @endforeach
                </div>
                @endif
            </div>
        </div>
    </div>
</body>
@endsection

<script>
    function checkAnswer(button) {
        button.classList.add('selected-answer');
        var correctAnswer = "{{ urldecode($currentQuestion['correct_answer']) }}";
        var buttonWrapper = button.querySelector('.button-text');
        var feedbackText = button.querySelector('.feedback-text');
        if (buttonWrapper.textContent === correctAnswer) {
            button.classList.add('correct-answer');
            feedbackText.textContent = 'Correct!';
        } else {
            button.classList.add('incorrect-answer');
            feedbackText.textContent = 'Incorrect!';
        }
        buttonWrapper.style.display = 'none';
    }
</script>
