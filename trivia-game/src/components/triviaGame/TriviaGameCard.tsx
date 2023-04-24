import { useContext } from "react";
import ProgressBar from "../progressBar/ProgressBar";
import {
    Container,
    Title,
    ProgressBarWrapper,
    ProgressBarLabel,
    Question,
    AnswersOptionsWrapper,
    AnswerOption,
} from ".";
import TimeoutBar from "../progressBar/TimeoutBar";
import { Context } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";

interface Option {
    id: number;
    option: string;
    className: string;
}

const TriviaGameCard = () => {
    const {
        answers,
        currentQuestionIndex,
        triviaGamesData,
        currentItemIndex,
        options,
        setOptions,
        setScore,
        setCurrentItemIndex,
    } = useContext(Context);
    const navigate = useNavigate();

    function displayNextItem(id: number) {
        const correctAnswer = answers[currentItemIndex].correct_answer;

        const optionsFormatted = options.map((option: Option) => {
            if (option.option === correctAnswer) {
                setScore((prevScore: number) => prevScore + 1);
                return {
                    ...option,
                    className: "correct",
                };
            } else if (option.option !== correctAnswer && option.id === id) {
                return {
                    ...option,
                    className: "incorrect",
                };
            } else {
                return {
                    ...option,
                    className: "",
                };
            }
        });

        setOptions(optionsFormatted);

        setTimeout(() => {
            if (currentQuestionIndex < 10) {
                setCurrentItemIndex((currentItemIndex + 1) % answers.length);
            } else {
                navigate("/result");
            }
        }, 300);
    }

    return (
        <>
            {answers.length !== 0 ? (
                <Container>
                    <Title>Trivia Game</Title>
                    <ProgressBarWrapper>
                        <ProgressBar progress={currentQuestionIndex} />
                        <ProgressBarLabel>
                            {currentQuestionIndex}/Questions
                        </ProgressBarLabel>
                    </ProgressBarWrapper>
                    <Question>
                        {decodeURIComponent(
                            triviaGamesData[currentItemIndex]?.question
                        )}
                    </Question>
                    <AnswersOptionsWrapper>
                        {options.map((opt: Option) => (
                            <AnswerOption
                                key={opt.id}
                                className={`answer-btn ${opt.className}`}
                                value={decodeURIComponent(opt.option)}
                                onClick={() => displayNextItem(opt.id)}
                            >
                                {decodeURIComponent(opt.option)}
                            </AnswerOption>
                        ))}
                    </AnswersOptionsWrapper>
                    <ProgressBarWrapper>
                        <TimeoutBar />
                        <ProgressBarLabel>timeout bar</ProgressBarLabel>
                    </ProgressBarWrapper>
                </Container>
            ) : (
                <p>...Loading</p>
            )}
        </>
    );
};

export default TriviaGameCard;
