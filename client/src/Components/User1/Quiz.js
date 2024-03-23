import React, { useState } from 'react';
import './Quiz.css';
// Import axios for making HTTP requests
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function App() {
  const [info,setdata]=useState("");
  const questions = [
    {
        //Q1 
        questionText: 'Question 1: How many hours of sleep do you get per night?',
        image:'https://img.freepik.com/free-photo/photorealistic-style-clouds-man_23-2151058951.jpg?size=626&ext=jpg',
        answerOptions: [
            { answerText: 'Less than 5 hours', value: 1 },
            { answerText: '5-7 hours', value: 2 },
            { answerText: '7-9 hours', value: 3 },
            { answerText: 'More than 9 hours', value: 4 },
        ],
    },
    {
      questionText: 'Question 2: On a typical Day ,how much physical activity  do you get?',
      image:'https://img.freepik.com/premium-photo/couple-running-together-footpath_1048944-10962004.jpg?w=740',
      answerOptions: [
          { answerText: 'Less than 30 minutes', value: 1 },
          { answerText: '30 mins - 1 hour', value: 2 },
          { answerText: '1 hour-1hr:30mins', value: 3 },
          { answerText: 'More than 1hr:30min', value: 4 },
      ],
    },
    {
      questionText: 'Question 3:How would you rate your fitness level?',
      image:'https://t4.ftcdn.net/jpg/02/43/13/15/240_F_243131531_jmNppYX9Ux2Hj2RV9yYR1swicwcYr8EQ.jpg',
      answerOptions: [
          { answerText: 'Poor', value: 1 },
          { answerText: 'Fair', value: 2 },
          { answerText: 'Good', value: 3 },
          { answerText: 'Excellent', value: 4 },
      ],
    },
    {
      questionText: 'Question 4:Have you undergone any hand/leg surgeries?',
      image:'https://t.ly/dn5su',
      answerOptions: [
        { answerText: 'Major surgery', value: 1 },
        { answerText: 'Minor Leg Injury', value: 2 },
        { answerText: 'Minor Hand Injury', value: 3 },
        { answerText: 'None', value: 4 },
      ],
    },
    {
      questionText: 'Question 5:How many Sugary Drinks(Soda,Sports drink,flavored milk) do you drink a day?',
      image:'https://t.ly/5L833',
      answerOptions: [
          { answerText: 'More than 3', value: 1 },
          { answerText: '3', value: 2 },
          { answerText: '1-2', value: 3 },
          { answerText: '0', value: 4 },
      ],
    },
    {
      questionText:'How often do you consume processed or fast food?',
      image:'https://t.ly/hAjEu',
      answerOptions:[
        {answerText:'Rarely or Never',value :4},
        {answerText:'Occasional',value:3},
        {answerText:'Sometimes',value:2},
        {answerText:'Frequent',value:1},
      ]
    },
    {
      questionText:'How often do you experience digestive issues?',
      image:'https://t.ly/bPqml',
      answerOptions:[
        {answerText:'Rarely or Never',value :4},
        {answerText:'Occasional',value:3},
        {answerText:'Sometimes',value:2},
        {answerText:'Frequent',value:1},
      ]
    },
    {
      questionText:'What are your current fitness goals?',
      image:'https://banner2.cleanpng.com/20190311/cfk/kisspng-clip-art-meditation-portable-network-graphics-imag-yoga-clip-meditation-transparent-amp-png-clipart-5c8639c7e84a26.7482503915523004879515.jpg ',
      answerOptions:[
        {answerText:'Stress Management',value:4},
        {answerText:'Improve flexibility ',value:4},
        {answerText:'Weight Loss',value:4},
        {answerText:'Muscle Gain',value:4},
        
      ]
    }
    // Add more questions here
];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const mx = questions.length * 4;
    const [showcard, setShowCard] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [exercise,setexercise] = useState("")
    const [activeButton, setActiveButton] = useState(null);

    const handleAnswerOptionClick = (value, answerText) => {
        setScore(score + value);
        setSelectedAnswers([...selectedAnswers, { question: questions[currentQuestion].questionText, answer: answerText }]);
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowCard(true);
        }
    };

    

  const handleButtonClick = (type) => {
    setActiveButton(type); 
    if (type === 'dietPlan') {
      fetch('http://127.0.0.1:5000/generate', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedAnswers }),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(data => {
          // Handle response from server
          setdata(data);
          console.log(data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
    } else if (type === 'recommendedExercises') {
        fetch('http://127.0.0.1:5000/training', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ selectedAnswers }),
          })
          .then(response => response.text())
          .then(data => {
              // Handle response from server
              setdata(data);
              console.log(data);
    
          })
          .catch(error => {
              console.error('Error:', error);
          });
      }
    
  };
  

    return (
        <div className="app">
            {showcard ? (
              <div>

                <div className='progressbar'>
                    
                    {/* <h2>Selected Answers:</h2>
                    <ul>
                        {selectedAnswers.map((selectedAnswer, index) => (
                            <li key={index}>{`${selectedAnswer.question}: ${selectedAnswer.answer}`}</li>
                        ))}
                    </ul> */}
                    <CircularProgressbar value={score*100/mx} text={`${(score * 100 / mx).toFixed(2)}%`} strokeWidth={5} />            
                    </div>
                    <h1 className='text-center'> Get Weekly Meal Plan</h1>
                    <button onClick={() => handleButtonClick('dietPlan')} className={`btn btn-success mt-3 ${activeButton === 'dietPlan' ? 'active' : ''}`}>Get Your Diet Plan</button>
          <button onClick={() => handleButtonClick('recommendedExercises')} className={`btn btn-success mt-3 mx-5 ${activeButton === 'recommendedExercises' ? 'active' : ''}`}>Recommended Exercises</button>
                
                </div>
            ) : (
                <div className='mt-5'>
                    <div className="question-section">
                        <div className="question-count">
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className="question-text">{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className='imagecontainer'>
                        <img src={questions[currentQuestion].image} alt="question" />
                    </div>
                    <div className="answer-section">
                        {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <button key={answerOption.value} onClick={() => handleAnswerOptionClick(answerOption.value, answerOption.answerText)}>
                                {answerOption.answerText}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
        <pre>{info}</pre>
        <pre>{exercise}</pre>
        </div>
    );
}

export default App;