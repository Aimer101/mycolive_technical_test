import styled from "styled-components";

export const Container = styled.div `
    width: 100dvw;
    height: 100dvh;
    background-color: whitesmoke;
`;
export const Wrapper = styled.div `
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;
export const AuthContainer = styled.form `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 30%;
    padding: 2rem 1rem;
    background-color: white;
    border-radius: 15px;
`;

export const Title = styled.h2 `
    font-weight: 900;
    letter-spacing: 4px;
    text-transform: uppercase;
    font-family: sans-serif;
`;

export const FormContainer = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
`;

export const Input = styled.input `
    width: 80%;
    padding: 0.5rem 1.2rem;
    border-radius: 10px;
    border: rgb(204, 204, 204) 1px solid;
`;

export const ButtonSubmit = styled.button `
    background-color: rgb(27, 83, 238);
    border: none;
    width: 80%;
    border-radius: 10px;
    padding: 0.8rem 0;
    cursor: pointer;
    color: white;
    margin-top: 1rem;
`;

export const Span = styled.span `
    font-size: 0.8rem;
`;

export const SpanWarning = styled.span `
    font-size: 0.8rem;
    color: red;
`;