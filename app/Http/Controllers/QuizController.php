<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Session;

class QuizController extends Controller {

    public function fetchQuestions() {
        $url = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&encode=url3986';

        $client = new Client();
        $response = $client->get($url);

        $statusCode = $response->getStatusCode();
        $data = json_decode($response->getBody(), true);

        // Process the response data
        $processedData = [];
        foreach ($data['results'] as $result) {
            $answers = array_map('urldecode', $result['incorrect_answers']);
            $answers[] = urldecode($result['correct_answer']);

            $processedResult = [
                'question' => urldecode($result['question']),
                'answers' => $answers,
                'correct_answer' => urldecode($result['correct_answer'])
            ];

            $processedData[] = $processedResult;
        }

        // Calculate the total number of questions
        $totalQuestions = count($processedData); 

        return [
            'questions' => $processedData,
            'totalQuestions' => $totalQuestions,
        ];
    }

    public function quiz(Request $request) {
        $quizData = $this->fetchQuestions();
        $questions = $quizData['questions'];
        $totalQuestions = $quizData['totalQuestions'];
        $currentQuestionIndex = Session::get('currentQuestionIndex', null);
        $score = Session::get('score', 0);

        // Check if the current question index is null or out of bounds
        if ($currentQuestionIndex === null || $currentQuestionIndex >= $totalQuestions) {
            $currentQuestionIndex = 0; // Reset to the first question
            $score = 0; // Reset the score
        }

        $currentQuestion = isset($questions[$currentQuestionIndex]) ? $questions[$currentQuestionIndex] : null;

        $isCorrect = false;

        if ($request->has('selectedAnswer')) {
            $selectedAnswer = $request->input('selectedAnswer');

            // Check if the selected answer is correct
            $isCorrect = ($selectedAnswer === urldecode($currentQuestion['correct_answer']));
            $currentQuestion['isCorrect'] = $isCorrect;
            $currentQuestion['selectedAnswer'] = $selectedAnswer;

            // Increment the current question index
            $currentQuestionIndex++;

            // Increment the score if the answer is correct
            if ($isCorrect) {
                $score++;
                Session::put('score', $score);
            }

            if ($currentQuestionIndex === $totalQuestions) {
                // Store the questions and correct answers in the session
                Session::put('questions', $questions);

                // Check if all answers are correct
                if ($score !== $totalQuestions) {
                    Session::forget('currentQuestionIndex');
                    return redirect()->route('quiz.fail', ['score' => $score]);
                } else {
                    Session::forget('currentQuestionIndex');
                    return redirect()->route('quiz.success');
                }
            }

            Session::put('currentQuestionIndex', $currentQuestionIndex);
        } else {
            // Reset progress when the user reloads the page without selecting an answer
            Session::forget('currentQuestionIndex');
            Session::forget('score');
        }

        return view('quiz', compact('currentQuestion', 'currentQuestionIndex', 'questions', 'totalQuestions', 'isCorrect'));
    }

    public function success() {
        $questions = Session::get('questions');
        $correctAnswersCount = $this->calculateCorrectAnswersCount($questions);

        if ($questions && is_array($questions) && $correctAnswersCount === count($questions)) {
            Session::forget('questions');
            Session::forget('currentQuestionIndex');
            Session::forget('score');
            return view('success');
        }

        return redirect()->route('quiz.success');
    }

    public function fail($score) {
        $questions = Session::get('questions');
        $correctAnswersCount = $this->calculateCorrectAnswersCount($questions);

        if ($questions && is_array($questions)) {
            Session::forget('questions');
            return view('fail', compact('score', 'correctAnswersCount'));
        }
    }

    public function retry(Request $request) {
        Session::forget('currentQuestionIndex');
        Session::forget('score');
        Session::forget('questions');

        return redirect()->route('quiz');
    }

    private function calculateCorrectAnswersCount($questions) {
        $count = 0;

        foreach ($questions as $question) {
            if (isset($question['isCorrect']) && $question['isCorrect']) {
                $count++;
            }
        }

        return $count;
    }
}
    