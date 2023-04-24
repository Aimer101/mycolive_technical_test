import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
    margin-inline: auto;
    background-color: black;
    padding-block-start: 40px;
    padding-block-end: 20px;
    margin-block-start: 100px;
    border-radius: 10px;
`;

export const Title = styled.h1`
    margin: 0;
    padding-block-end: 20px;
    color: white;
`;

export const ProgressBarWrapper = styled.div`
    display: flex;
`;

export const ProgressBarLabel = styled.span`
    border: 1px solid white;
    padding: 5px 20px;
    color: white;
`;
export const Question = styled.h3`
    color: white;
    padding-inline: 10px;
`;
export const AnswersOptionsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 300;
    justifywcontent: center;
    row-gap: 10px;
    column-gap: 20px;
    margin-block-end: 20px;

`;

export const AnswerOption = styled.button`
    color: white;
    flex-basis: 40%; 
    border: 1px solid white;
    padding-block: 10px;
    cursor: pointer;
    border-radius: 2px;
    font-size: 16px;
`;