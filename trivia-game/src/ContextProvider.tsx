import { useState, createContext, useEffect, useRef } from "react";
import { TriviaGame } from "./constants/type";
import axios from "axios";
import { endpoint } from "./constants";

const initialValue = {};

const Context = createContext<any>({});

function ContextProvider({ children }: any) {
    const [triviaGamesData, setTriviaGamesData] = useState<TriviaGame[]>([]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<any[]>([]);
    const [options, setOptions] = useState([]);
    const currentQuestionIndex = currentItemIndex + 1;
    const [isRegistered, setIsRegistered] = useState(false);
    const btnRef = useRef<any>(null);

    async function getTriviaGameData() {
        const data = await axios({ method: "get", url: endpoint });
        setTriviaGamesData(data.data?.results);
    }

    useEffect(() => {
        getTriviaGameData();
    }, []);

    useEffect(() => {
        const dataFormatted = triviaGamesData?.map((res: TriviaGame) => {
            return {
                ...res,
                options: [...res.incorrect_answers, res.correct_answer]
                    .sort(() => {
                        return 0.5 - Math.random();
                    })
                    .map((opt: string, index: number) => ({
                        id: index,
                        className: "",
                        option: opt,
                    })),
            };
        });
        setAnswers(dataFormatted);
    }, [triviaGamesData, currentItemIndex]);

    useEffect(() => {
        if (!!answers.length) {
            setOptions(answers[currentItemIndex]?.options);
        }
    }, [answers]);

    return (
        <Context.Provider
            value={{
                answers,
                currentQuestionIndex,
                triviaGamesData,
                currentItemIndex,
                btnRef,
                score,
                options,
                isRegistered,
                setIsRegistered,
                setOptions,
                setScore,
                setCurrentItemIndex,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export { ContextProvider, Context };
