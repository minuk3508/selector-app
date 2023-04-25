import {useState, useEffect} from 'react';
import moment from 'moment';

const useRemainingTime = () => {
  const [remainingTime, setRemainingTime] = useState<{
    hours?: string;
    min?: string;
    sec?: string;
  }>({hours: '00', min: '00', sec: '00'});

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = moment();
      const tomorrow = moment().add(1, 'day').startOf('day').add(21, 'hours');
      const today = moment().startOf('day').add(21, 'hours');
      const tomorrowDiff = moment.duration(tomorrow.diff(now));
      const todayDiff = moment.duration(today.diff(now));

      if (tomorrowDiff.asHours() < 24) {
        const hours = Math.floor(tomorrowDiff.asHours())
          .toString()
          .padStart(2, '0');
        const minutes = tomorrowDiff.minutes().toString().padStart(2, '0');
        setRemainingTime({hours, min: minutes, sec: '00'});
      } else {
        const hours = Math.floor(todayDiff.asHours())
          .toString()
          .padStart(2, '0');
        const minutes = todayDiff.minutes().toString().padStart(2, '0');
        const sec = todayDiff.seconds().toString().padStart(2, '0');
        setRemainingTime({hours, min: minutes, sec});
      }
    };

    const intervalId = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return remainingTime;
};

export default useRemainingTime;
