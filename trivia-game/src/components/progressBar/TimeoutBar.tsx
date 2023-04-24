import {  useEffect, useState } from "react";
import { Container, Progress } from ".";
import { TIMEOUT_DURATION } from "../../constants";
import { useNavigate } from "react-router-dom";

const TimeoutBar = () => {
    const [timeLeft, setTimeLeft] = useState<number>(TIMEOUT_DURATION);
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1000);
            }else {
               navigate('/result')
            }
        }, 1000);
  
        return () => clearInterval(interval);
    }, [timeLeft]);

  const width = (timeLeft / TIMEOUT_DURATION) * 100;

    return (
        <Container>
            <Progress progress={width} />
        </Container>
    );
};

export default TimeoutBar;