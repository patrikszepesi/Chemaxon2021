import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory(); // to access props because this is not a component only a spinner, because browserrouter provides the history props

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(currentCount => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push('/');
    // cleanup
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;

//The clearInterval() method of the WindowOrWorkerGlobalScope mixin cancels a timed,
//repeating action which was previously established by a call to setInterval().

//In some cases, you might need to make JavaScript stop setInterval() from being executed before the times comes. You'll need to use the clearInterval() method.
//It's meant to stop the timer set by using the setInterval JavaScript function
