import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  let myName = 'Fulano';

  const [time, setTime] = useState('00:00');
  const [greeting, setGreeting] = useState('--');
  const [phrase, setPhrase] = useState('');
  const [phraseAuthor, setPhraseAuthor] = useState('');

  useEffect(() => {
    const getPhrase = async () => {
      const req = await fetch('https://api.quotable.io/quotes/random');
      const json = await req.json();
      setPhrase(json.content);
      setPhraseAuthor(json.author);
    }
    getPhrase();
  }, []);

  useEffect(() => {
    let timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    updateGreeting();
  }, [time]);

  const updateTime = () => {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let hourStr = hours < 10 ? '0' + hours : hours.toString();
    let minStr = minutes < 10 ? '0' + minutes : minutes.toString();

    setTime(`${hourStr}:${minStr}`);
  }

  const updateGreeting = () => {
    let now = new Date();
    let hours = now.getHours();
    if (hours > 0 && hours < 12) {
      setGreeting(`Bom dia, ${myName}.`);
    } else if (hours >= 12 && hours < 18) {
      setGreeting(`Boa tarde, ${myName}.`);
    } else {
      setGreeting(`Boa noite, ${myName}.`);
    }
  }

  return (
    <div className="App">
      <div className="top"></div>
      <div className="middle">
        <h1>{time}</h1>
        <h3>{greeting}</h3>
      </div>
      <div className="bottom">
        <div className="phrase">
          "{phrase}"
          <div className="author">{phraseAuthor}</div>
        </div>
      </div>
    </div>
  );
}

export default App;