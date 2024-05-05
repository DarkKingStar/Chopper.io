import { useEffect, useState } from 'react';
import moment from 'moment';

function useGreetings() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentTime = moment();
    const hour = currentTime.hour();
    let newGreeting = '';

    if (hour >= 0 && hour < 12) {
      newGreeting = 'Ohayo';
    } else if (hour >= 12 && hour < 18) {
      newGreeting = 'Konichiwa';
    } else if (hour >= 18 && hour <= 23) {
      newGreeting = 'Konbanwa';
    }
    else{
      newGreeting = 'Oyasumi';
    }
    setGreeting(newGreeting);
  }, []);

  return greeting;
}

export default useGreetings;
