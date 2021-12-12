import React, { Component } from "react";
import questions from "../../questions.json";
import isEmpty from "../../utils/is-empty";
import M from "materialize-css";
import { Link } from "react-router-dom";
import classnames from "classnames";

class PlayClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      showScore: false,
      correctAnswers: 0,
      wrongAnswers: 0,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
    };
    // this.handleQuitButtonClick = this.handleQuitButtonClick.bind(this);
  }

  componentDidMount() {
    const { questions, currentQuestion, previousQuestion, nextQuestion } =
      this.state;
    this.displayQuestions(
      questions,
      previousQuestion,
      nextQuestion,
      currentQuestion
    );
  }

  displayQuestions = (
    questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    //   let currentQuestionIndex;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];

      const answer = currentQuestion.answer;

      this.setState(
        {
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
        },
        () => {
          this.handleDisabledButton();
        }
      );
    }
  };

  handleOptionClick = (e) => {
    // console.log("option clicked");
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  };

  handleNextButtonClick = () => {
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    } else {
      this.setState({
        showScore: true,
      });
    }
  };

  handleQuitButtonClick = () => {
    if (window.confirm("Are you sure you want to quit?")) {
      //   this.props.history.location("/");
      window.location.assign("/");
    }
  };

  handlePrevButtonClick = () => {
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  correctAnswer = () => {
    M.toast({
      html: "Correct Answer",
      classes: "toast-valid",
      displayLength: 1000,
    });

    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endQuiz();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  wrongAnswer = () => {
    M.toast({
      html: "Wrong Answer!",
      classes: "toast-invalid",
      displayLength: 1000,
    });

    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.setState({
            showScore: true,
          });
          this.endQuiz();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  handleDisabledButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      });
    } else {
      this.setState({
        previousButtonDisabled: false,
      });
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextButtonDisabled: true,
        // showScore: true,
      });
    } else {
      this.setState({
        nextButtonDisabled: false,
      });
    }
  };

  endQuiz = () => {
    alert("Quiz has ended! Your score has been recorded.");
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
    };
    console.log(playerStats);
    // setTimeout(() => {
    //   window.location.assign(`/playquiz`);
    //   //   window.location.replace(`/play/summary?data=${playerStats}`);
    // }, 1000);
  };

  render() {
    console.log(this.state.showScore);
    // console.log(currentQuestion);
    const { currentQuestion, currentQuestionIndex, numberOfQuestions } =
      this.state;

    return (
      <div className="questions">
        {this.state.showScore ? (
          <>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
              My score: {this.state.score}
            </h3>
            <h5>Number of Questions: {this.state.numberOfQuestions}</h5>
            <h5>Correct Answer: {this.state.correctAnswers}</h5>
            {/* <h5>
              Questions attempted: {this.state.numberOfAnsweredQuestions}
            </h5> */}
            <h5>Wrong Answered: {this.state.wrongAnswers}</h5>
            <div className="button-container" style={{ width: "290px" }}>
              <button>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  I want to quit
                </Link>
              </button>
              <button>
                <Link
                  to="/playquiz"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  I Want to Play Again
                </Link>
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Play Quiz</h2>
            <div className="question-number">
              <span>
                {currentQuestionIndex + 1} of {numberOfQuestions}
              </span>
            </div>
            <h5>{currentQuestion.question}</h5>
            <div className="options-container">
              <p onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionA}
              </p>
              <p onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionB}
              </p>
            </div>
            <div className="options-container">
              <p onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionC}
              </p>
              <p onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionD}
              </p>
            </div>
            <div className="button-container">
              <button
                className={classnames("", {
                  disable: this.state.previousButtonDisabled,
                })}
                onClick={this.handlePrevButtonClick}
              >
                Prev
              </button>
              <button
                className={classnames("", {
                  disable: this.state.nextButtonDisabled,
                })}
                onClick={this.handleNextButtonClick}
              >
                Next
              </button>
              <button onClick={this.handleQuitButtonClick}>Quit</button>
              {/* <button>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Quit
            </Link>
          </button> */}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default PlayClass;
