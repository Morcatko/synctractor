import * as React from 'react';

export const App = () => {
    const [counter, setCounter] = React.useState(0);

    const startTimer = () => {
        console.log('clicked');
        setTimeout(() => {
            console.log('timeouted');
            setCounter(counter + 1);
        }, 2000);
    }

    return <div>
        <div>This is React sample</div>
        <button id="btn" onClick={startTimer}>Click Me</button>
        <div>
            Timer Completed:
      <span id="cnt">{counter}</span>
        </div>
    </div>;
}