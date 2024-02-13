import { useEffect, useState } from 'react';
import moment from 'moment';

function useGreetings() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentTime = moment();
    const hour = currentTime.hour();
    let newGreeting = '';

    if (hour >= 0 && hour < 12) {
      newGreeting = 'Ohayo Otaku';
    } else if (hour >= 12 && hour < 18) {
      newGreeting = 'Konichiwa Otaku';
    } else if (hour >= 18 && hour <= 23) {
      newGreeting = 'Konbanwa Otaku';
    }
    else{
      newGreeting = 'Oyasumi Otaku';
    }
    setGreeting(newGreeting);
  }, []);

  return greeting;
}

export default useGreetings;
