import "./app.scss";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import QuizInstructions from "./components/quiz/QuizInstructions";
// import Play from "./components/quiz/Play";
import PlayClass from "./components/quiz/PlayClass";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/playquiz" exact element={<QuizInstructions />} />
        <Route path="/play/quiz" exact element={<PlayClass />} />
      </Routes>
    </Router>
  );
}

export default App;
