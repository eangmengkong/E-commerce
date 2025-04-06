import { useState, useEffect } from 'react';

const CountdownTimer = ({
  initialDays = 7,       // Default: 7 days countdown
  onComplete = () => {}, // Function to run when timer finishes
  autoRestart = true,    // Should timer restart automatically?
  restartDelay = 1000    // 1 second delay before restarting
}) => {
  // State to store our time left
  const [timeLeft, setTimeLeft] = useState({
    days: initialDays,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Calculate total time in seconds (easier to work with)
    const totalSeconds = 
      timeLeft.days * 24 * 60 * 60 + // Convert days to seconds
      timeLeft.hours * 60 * 60 +     // Convert hours to seconds
      timeLeft.minutes * 60 +       // Convert minutes to seconds
      timeLeft.seconds;             // Add remaining seconds

    // When timer reaches zero
    if (totalSeconds <= 0) {
      onComplete(); // Run the completion function
      
      // If auto-restart is enabled, reset the timer after a delay
      if (autoRestart) {
        setTimeout(() => {
          setTimeLeft({
            days: initialDays,
            hours: 0,
            minutes: 0,
            seconds: 0
          });
        }, restartDelay);
      }
      return; // Exit early
    }

    // Set up our timer interval (runs every second)
    const timer = setInterval(() => {
      // Update the time left
      setTimeLeft(prevTime => {
        // Calculate each time unit
        let newSeconds = prevTime.seconds - 1;
        let newMinutes = prevTime.minutes;
        let newHours = prevTime.hours;
        let newDays = prevTime.days;

        // Handle seconds rollover
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        // Handle minutes rollover
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        // Handle hours rollover
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        // Return the updated time
        return {
          days: newDays < 0 ? 0 : newDays,       // Don't go below 0
          hours: newHours < 0 ? 23 : newHours,   // Roll over to 23 if negative
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    // Clean up the timer when component unmounts
    return () => clearInterval(timer);
  }, [timeLeft, initialDays, onComplete, autoRestart, restartDelay]);
  return (
    <div className="time flex gap-5 text-white">
      <span className="rounded-full bg-red-500 p-3 text-center">
        {timeLeft.days.toString().padStart(2, '0')} <br />
        Days
      </span>
      <span className="rounded-full bg-red-500 p-3 text-center">
        {timeLeft.hours.toString().padStart(2, '0')} <br />
        Hours
      </span>
      <span className="rounded-full bg-red-500 p-3 text-center">
        {timeLeft.minutes.toString().padStart(2, '0')} <br />
        Mins
      </span>
      <span className="rounded-full bg-red-500 p-3 text-center">
        {timeLeft.seconds.toString().padStart(2, '0')} <br />
        Sec
      </span>
    </div>
  );
};

export default CountdownTimer; 