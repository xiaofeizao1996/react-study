import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

const INIT_BREAK_TIME = 5;
const INIT_SESSION_TIME = 25;

const Home = () => {
  const [breakTime, setBreakTime] = useState(INIT_BREAK_TIME);
  const [sessionTime, setSessionTime] = useState(INIT_SESSION_TIME);

  const [time, setTime] = useState(0);
  const [shouldCount, setShouldCount] = useState(false);

  useEffect(() => {
    if (shouldCount) {
      const interval = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [shouldCount, time]);

  const handleStart = () => {
    setShouldCount(!shouldCount);
  };

  const handleReset = () => {
    setShouldCount(false);
    setTime(0);
    setBreakTime(INIT_BREAK_TIME);
    setSessionTime(INIT_SESSION_TIME);
  };

  const getSessionTime = (sessionTime, breakTime, time) => {
    const rest = sessionTime * 60 - time;
    if (rest > 0) {
      return `${Math.floor(rest / 60)} : ${
        rest % 60 < 10 ? "0" + (rest % 60) : rest % 60
      }`;
    } else {
      const breakRest = breakTime * 60 + rest;
      if (breakRest === 0) {
        handleReset();
      }
      return `${Math.floor(breakRest / 60)} : ${
        breakRest % 60 < 10 ? "0" + (breakRest % 60) : breakRest % 60
      }`;
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.title}>25 + 5 Clock</div>
      <div className={styles.body}>
        <TimeSet
          title="Break Length"
          time={breakTime}
          callback={setBreakTime}
        />
        <TimeSet
          title="Session Length"
          time={sessionTime}
          callback={setSessionTime}
        />
      </div>
      <div className={styles.countdown}>
        <div>Session</div>
        <div style={{ fontSize: 40 }}>
          {getSessionTime(sessionTime, breakTime, time)}
        </div>
      </div>
      <div className={styles.tool}>
        <div onClick={handleStart}>start</div>
        <div onClick={handleStart}>pause</div>
        <div onClick={handleReset}>reset</div>
      </div>
    </div>
  );
};

const TimeSet = (props) => {
  const { title = "Break Length", time = 0, callback } = props;
  const handleSubtraction = () => {
    if (time > 1) {
      callback(time - 1);
    }
  };
  const handleAdd = () => {
    callback(time + 1);
  };
  return (
    <div>
      <div>{title}</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div onClick={handleSubtraction}>-</div>
        <div style={{ color: "red", margin: "0px 10px" }}>{time}</div>
        <div onClick={handleAdd}>+</div>
      </div>
    </div>
  );
};

export default Home;
