import React, { useState } from 'react';
import './Quiz.css';


import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function App() {
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
    const mx=questions.length*4;
    const [showcard,setShowCard]=useState(false);
    

    const handleAnswerOptionClick = (value) => {
        setScore(score+value);
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            alert('Quiz completed!!!');
            setCurrentQuestion(0);            
            setShowCard(true);
        }
    };

    return (
          <div className="app">
            {showcard ? (
              <div>
                
                <div className='progressbar'>
                <CircularProgressbar value={score*100/mx} text={`${(score * 100 / mx).toFixed(2)}%`} strokeWidth={5} />            
                </div>
                <button className='btn btn-secondary mt-3'>Here is your Diet Plan</button>
                <button className='btn btn-secondary mt-3 mx-5'>Personalised Recommendations</button>
              </div>
            ) : (
                <div>
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
                            <button key={answerOption.value} onClick={() => handleAnswerOptionClick(answerOption.value)}>
                                {answerOption.answerText}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;