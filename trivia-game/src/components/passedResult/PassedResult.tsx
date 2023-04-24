import React from "react";
import { Container, Title } from "../triviaGame";

const PassedResult = () => {
    return (
        <Container>
            <Title>Trivia Game</Title>
            <p style={{color: 'white'}}>Congratulation {`username`}</p>
            <p style={{color: 'white'}}>
                You have passed the trivia game, you are among the very best as
                succeded the 88% threshold
            </p>
            <p></p>
        </Container>
    );
};

export default PassedResult;
