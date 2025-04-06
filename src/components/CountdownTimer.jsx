import { useState, useEffect } from 'react';

const CountdownTimer = ({ 
  initialDays = 7, 
  onComplete = () => {}, 
  autoRestart = true,
  restartDelay = 1000 // 1 second delay before restart
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: initialDays,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Calculate total seconds
    const totalSeconds = timeLeft.days * 24 * 60 * 60 + 
                        timeLeft.hours * 60 * 60 + 
                        timeLeft.minutes * 60 + 
                        timeLeft.seconds;

    if (totalSeconds <= 0) {
      onComplete();
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
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;
        const newDays = newHours < 0 ? prevTime.days - 1 : prevTime.days;

        return {
          days: newDays < 0 ? 0 : newDays,
          hours: newHours < 0 ? 23 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds
        };
      });
    }, 1000);

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