import React, { useState, useEffect } from 'react';
  import './Tracking.css'; // Import CSS file for styling
  const FitnessTracker = () => {
    const [progress, setProgress] = useState(0);
    const [level, setLevel] = useState(1);
    const [lastReward, setLastReward] = useState('');
    const [rewardsEarned, setRewardsEarned] = useState([]);
    const [tasks, setTasks] = useState([
      { id: 1, name: 'Running', xp: 20, completed: false },
      { id: 2, name: 'Cycling', xp: 30, completed: false },
      { id: 3, name: 'Weightlifting', xp: 40, completed: false },
      { id: 4, name: 'Yoga', xp: 25, completed: false },
      { id: 5, name: 'Swimming', xp: 35, completed: false },
      { id: 6, name: 'Hiking', xp: 30, completed: false },
      { id: 7, name: 'Dancing', xp: 25, completed: false },
      { id: 8, name: 'Jumping Rope', xp: 20, completed: false },
      { id: 9, name: 'Pilates', xp: 25, completed: false },
      { id: 10, name: 'Martial Arts', xp: 40, completed: false },
      // Add more tasks as needed
    ]);
  
    const [showReward, setShowReward] = useState(false); // State to control the visibility of the reward modal

   
    useEffect(() => {
      if (rewardsEarned.length > 0) {
        setLastReward(rewardsEarned[rewardsEarned.length - 1]);
      }
    }, [rewardsEarned]);

    const calculateProgressBarWidth = () => {
      const nextLevelXP = level * 100;
      const progressPercentage = (progress - (nextLevelXP-100));
      return `${progressPercentage}%`;
    };

    const markTaskAsFinished = (taskId, taskXp) => {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: true } : task
      );

      const updatedProgress = progress + taskXp;
      const nextLevelXP = level * 100;

      setProgress(updatedProgress);
      setTasks(updatedTasks);

      if (updatedProgress >= nextLevelXP) {
        setLevel(level + 1);
        const newReward = `${level} - ${level + 1} ${getRandomRewardName()}`;
        setRewardsEarned([...rewardsEarned, newReward]);
        setShowReward(true); // Show reward modal when level is completed
        setTimeout(() => setShowReward(false), 3000); // Hide reward modal after 3 seconds
      }
    };

    const getRandomRewardName = () => {
      const stylishRewardNames = [
        'Elite Achiever Badge',
        'Master of Fitness Medal',
        'Champion of Health Trophy',
        'Ultimate Wellness Award',
        'Fitness Guru Certificate',
        'Peak Performance Plaque',
        'Health Hero Honor',
        'Wellness Wizard Badge',
        'Exercise Excellence Ribbon',
        'Fitness Titan Trophy'
      ];
      const randomIndex = Math.floor(Math.random() * stylishRewardNames.length);
      return stylishRewardNames[randomIndex];
    };
    const handleback=()=>{
        window.location.href="/user";
      }
    return (
        <div>
            <div className="fitness-tracker-container">
                <h1>Fitness Tracker</h1>
                <div className="tracker-info">
                <div className="level-progress">

                    <p>{lastReward}</p>
                    <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: calculateProgressBarWidth() }}></div>
                    </div>
                </div>
                
                <div className="rewards">
                    <p>Progress: {progress} XP</p>
                    <p>Rewards Earned:</p>
                    <ul>
                    {rewardsEarned.map((reward, index) => (
                        <li key={index}>{reward}</li>
                    ))}
                    </ul>
                
                </div>
                </div>
                <div className="task-list">
                <h2>Today's Tasks</h2>
                <ul>
                    {tasks.map(task => !task.completed && (
                    <li key={task.id}>
                        <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => markTaskAsFinished(task.id, task.xp)}
                        />
                        <label>{task.name}</label>
                    </li>
                    ))}
                </ul>
                </div>
                {/* Reward modal */}
                {showReward && (
                <div className="reward-modal">
                    <div className="reward-content">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/007/818/959/small/trophy-icon-logo-design-template-free-vector.jpg" alt="Reward Logo" />
                    <p>Congratulations! You've earned a reward.</p>
                    </div>
                </div>
                )}
                
            </div>
            
        </div>
      
    );
  };

  export default FitnessTracker;