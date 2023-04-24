import React, { useContext } from "react";
import "./App.css";
import TriviaGameCard from "./components/triviaGame/TriviaGameCard";
import { Route, Routes } from "react-router-dom";
import FailledResult from "./components/failedResult/FailedResult";
import { Context } from "./ContextProvider";
import PassedResult from "./components/passedResult/PassedResult";
import Register from "./components/register/RegisterForm";
import Login from "./components/login/Login";

function App() {
  const { score, isRegistered } = useContext(Context);

    return (
        <div className="App">
            <Routes>
                <Route path="/" Component={isRegistered ? TriviaGameCard : Register} />
                <Route path="/result" Component={score < 10 ? FailledResult : PassedResult}/>
                <Route path="/register" Component={Register}/>
                <Route path="/login" Component={Login}/>
            </Routes>
        </div>
    );
}

export default App;
