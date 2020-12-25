import React, { useState, useEffect, useMemo } from "react";
import "./progressBar.css";

// Can't perform a React state update on an unmounted component
// resava se tako sto pravilno koristis setinterval ili settimeout u useeffect
//i clearujes interval ili tajmaut u useefect cleanup funnkciji
const ProgressBar = ({ completed }) => {
  const [style, setStyle] = useState({});

  const newStyle = useMemo(() => {
    return {
      opacity: 1,
      width: `${completed >= 100 ? 100 : completed}%`,
    };
  }, [completed]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setStyle(newStyle);
    }, 1000);
    return () => clearInterval(timer);
  }, [newStyle]);

  return (
    <div className="progress">
      <div className="progressDone" style={style}>
        {completed}
      </div>
    </div>
  );
};

export default ProgressBar;
