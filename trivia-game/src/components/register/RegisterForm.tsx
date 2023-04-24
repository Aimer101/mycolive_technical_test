import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    AuthContainer,
    Container,
    FormContainer,
    Wrapper,
    ButtonSubmit,
    Span,
    SpanWarning,
    Input,
    Title,
} from ".";
import { Context } from "../../ContextProvider";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isMatchedPassword, setIsMatchedPassword] = useState(true);
    const navigate = useNavigate();
    const { setIsRegistered } = useContext(Context);
    const endpoint = `http://localhost:8000/api/user?username=${username}&password=${password}`;

    async function handleRegistr(e: any) {
        e.preventDefault();
        if (password === passwordConfirmation) {
            navigate("/login");
            setIsRegistered(true);
            try {
                const register = await axios({ method: "POST", url: endpoint });
                console.log("register::::::", register);
            } catch (e) {
                console.log("err", e);
            }
        } else {
            setIsMatchedPassword(false)
        }
    }

    return (
        <Container>
            <Wrapper>
                <AuthContainer onSubmit={(e) => handleRegistr(e)}>
                    <Title>Sign up</Title>
                    <FormContainer>
                        <Input
                            type="text"
                            placeholder="username"
                            required
                            value={username}
                            minLength={6}
                            maxLength={30}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormContainer>
                    <FormContainer>
                        <Input
                            type="password"
                            placeholder="password"
                            required
                            value={password}
                            minLength={6}
                            maxLength={30}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormContainer>
                    <FormContainer>
                        <Input
                            type="password"
                            placeholder="password confirmation"
                            required
                            minLength={6}
                            maxLength={30}
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                        />
                        {!isMatchedPassword && <SpanWarning>Your password does not matched</SpanWarning>}
                    </FormContainer>
                    <ButtonSubmit type="submit">Signup</ButtonSubmit>
                    <Span>
                        Already have an account?{" "}
                        <Link to={"/login"}>Login here</Link>
                    </Span>
                </AuthContainer>
            </Wrapper>
        </Container>
    );
};

export default Register;
