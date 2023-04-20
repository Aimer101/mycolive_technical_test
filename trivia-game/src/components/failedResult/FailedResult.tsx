import React, { useContext } from "react";
import { Container, Title } from "../triviaGame";
import { Context } from "../../ContextProvider";
import {Text} from '.';
import { useNavigate } from "react-router-dom";

const FailledResult = () => {
    const { score, setScore, setCurrentItemIndex } = useContext(Context);
    const navigate = useNavigate();

    function startNewGame() {
       setScore(0)
       setCurrentItemIndex(0)
       navigate('/')
    }

    return(
        <Container>
           <Title>Trivia Game</Title>
           <Text>You have answered correctly <b>{score * 10}%</b> of the trivia questions</Text>
           <button onClick={startNewGame}>
              Do you want to try again
           </button>
        </Container>
    )
}

export default FailledResult