import { useEffect, useState } from "react";

const Timer = () => {
  let timerNums: Array<number> = [0, 0, 0];

  const [formattedTime, setFormattedTime] = useState<string>("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      timerNums[2] += 1;
      if (timerNums[2] === 60) {
        timerNums[2] = 0;
        timerNums[1] += 1;
        if (timerNums[1] === 60) {
          timerNums[1] = 0;
          timerNums[0] += 1;
        }
      }

      let output =
        timerNums[0].toString().padStart(2, "0") +
        ":" +
        timerNums[1].toString().padStart(2, "0") +
        ":" +
        timerNums[2].toString().padStart(2, "0");

      setFormattedTime(output);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{formattedTime}</div>;
};

export default Timer;
