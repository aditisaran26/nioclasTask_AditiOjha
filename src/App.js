import React, { useState, useEffect } from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import './App.css';

const QuestionDisplay = ({ questionId }) => {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch(
        `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionId}`
      );
      const data = await response.json();
      setQuestion(data[0].Question);
    }
    fetchQuestion();
  }, [questionId]);

  return (
    <MathJaxContext version={3}>
      <MathJax>{question}</MathJax>
    </MathJaxContext>
  );
};

const App = () => {
  const questionIds = [
    "AreaUnderTheCurve_901",
    "BinomialTheorem_901",
    "DifferentialCalculus2_901",
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionIds.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
  <div>
    <div className='question__container'>
      <QuestionDisplay  questionId={questionIds[currentQuestionIndex]} />
      </div>
      <div className="button__container">  
            <button  onClick={handlePreviousQuestion}>Previous Question</button>
            <button onClick={handleNextQuestion}>Next Question</button>
      </div>
      
    
  </div>
  );
};

export default App;


