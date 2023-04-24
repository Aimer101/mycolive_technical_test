import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContainer, Container, FormContainer, Wrapper, ButtonSubmit, Span, Input, Title } from "../register/index";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const endpoint = `http://localhost:8000/api/user?username=${username}&password=${password}`;

    async function handleRegistr(e: any) {
        e.preventDefault();
        navigate('/')

        try {
            const login = await axios({ method: "POST", url: endpoint });
            console.log("login::::::", login);
        } catch (e) {
            console.log("err", e);
        }
    }

    return (
        <Container>
            <Wrapper>
                <AuthContainer onSubmit={(e: any) => handleRegistr(e)}>
                    <Title>Log in</Title>
                    <FormContainer>
                        <Input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}
                        />
                        <span></span>
                    </FormContainer>
                    <FormContainer>
                        <Input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                        />
                        <span></span>
                    </FormContainer>
                    <ButtonSubmit type="submit">Start Game</ButtonSubmit>
                    <Span>
                        Already have an account?{" "}
                        <Link to={"/register"}>Register here</Link>
                    </Span>
                </AuthContainer>
            </Wrapper>
        </Container>
    );
};

export default Register;