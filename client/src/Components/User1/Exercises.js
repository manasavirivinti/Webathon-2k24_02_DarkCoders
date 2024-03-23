import React, { useState } from 'react';
import './Exercises.css'; // Import your CSS file for ExercisePage styling

const ExercisePage = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Dummy data for exercises
  const beginnerExercises = [
    'Push-ups',
    'Jumping Jacks',
    'Bodyweight Squats',
    'Plank',
    'Lunges',
    'Russian Twists',
    'High Knees',
    'Wall Sit',
    'Bicycle Crunches',
    'Mountain Climbers',
    'Burpees',
    'Tricep Dips',
    'Calf Raises',
    'Sit-ups',
    'Side Plank',
    'Superman',
    'Bridge',
    'Arm Circles',
    'Leg Raises',
    'Flutter Kicks'
    // Add more beginner exercises...
  ];

  const intermediateExercises = [
    'Burpees',
    'Mountain Climbers',
    'Plank Rows',
    'Plyometric Lunges',
    'Jump Squats',
    'Push-up with Rotation',
    'Diamond Push-ups',
    'Reverse Lunges',
    'Side Plank with Leg Lift',
    'Spiderman Plank',
    'Squat Jumps',
    'Tricep Push-ups',
    'Walking Lunges',
    'Mountain Climber Twists',
    'Reverse Crunches',
    'Russian Twists with Dumbbell',
    'Single Leg Bridge',
    'Plank Jacks',
    'Dumbbell Rows',
    'Side Plank Dips'
    // Add more intermediate exercises...
  ];

  const hardExercises = [
    'Plank Rows',
    'Plyometric Lunges',
    'Jump Squats',
    'Push-up with Rotation',
    'Diamond Push-ups',
    'Reverse Lunges',
    'Side Plank with Leg Lift',
    'Spiderman Plank',
    'Squat Jumps',
    'Tricep Push-ups',
    'Walking Lunges',
    'Mountain Climber Twists',
    'Reverse Crunches',
    'Russian Twists with Dumbbell',
    'Single Leg Bridge',
    'Plank Jacks',
    'Dumbbell Rows',
    'Side Plank Dips',
    'Bulgarian Split Squats',
    'Handstand Push-ups',
    'L-sit',
    'Pike Push-ups',
    'Box Jumps',
    'Muscle-ups',
    'Pistol Squats',
    'Toes to Bar',
    'Kettlebell Swings',
    'Pull-ups',
    'Front Lever'
    // Add more hard exercises...
  ];
  const handleback=()=>{
    window.location.href="/user";
}
const handleStart=()=>{
  window.location.href="/user/tracking";
}
  // Render exercise list in card form
  const renderExerciseCards = (exerciseList) => {
    const cards = [];
    for (let i = 0; i < exerciseList.length; i += 5) {
      const cardExercises = exerciseList.slice(i, i + 5);
      cards.push(
        <div key={i} className="exercise-card">
          <h3>List {Math.floor(i / 5) + 1}</h3>
          <ul>
            {cardExercises.map((exercise, index) => (
              <li key={index}>{exercise}</li>
            ))}
          </ul>
        </div>
      );
    }
    return cards;
  };

  return (
    <div>
    <div className="exercise-page-container">
        <h1 className='mb-3'>Exercise Page</h1>
      <div className="level-buttons-container">
        <button className="level-button" onClick={() => setSelectedLevel('Beginner')}>Beginner</button>
        <button className="level-button" onClick={() => setSelectedLevel('Intermediate')}>Intermediate</button>
        <button className="level-button" onClick={() => setSelectedLevel('Hard')}>Hard</button>
      </div>
      {selectedLevel && (
        <div>
          <h2>{selectedLevel} Level Exercises</h2>
          <div className="exercise-cards-container">
            {selectedLevel === 'Beginner' && renderExerciseCards(beginnerExercises)}
            {selectedLevel === 'Intermediate' && renderExerciseCards(intermediateExercises)}
            {selectedLevel === 'Hard' && renderExerciseCards(hardExercises)}
            </div>
            <button className='btn btn-success' onClick={handleStart}>Start Practising</button>
          
        </div>
      )}
    </div>
    
    </div>
  );
};

export default ExercisePage;
