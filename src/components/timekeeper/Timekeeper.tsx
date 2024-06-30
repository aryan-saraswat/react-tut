import { useEffect, useState } from "react";

function Timekeeper() {
  const [time, setTime] = useState<number>(5);

  useEffect(() => {
    if (time > 0) {
      const timeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [time]);

  return <p>{time}</p>;
}

export default Timekeeper;
