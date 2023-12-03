import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  let myName = '';

  const [nameInput, setNameInput] = useState('');
  const [time, setTime] = useState('00:00');
  const [greeting, setGreeting] = useState('--');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const getAuthor = async () => {
      await fetch('https://api.quotable.io/random')
        .then(res => res.json())
        .then(
          (quote) => {
            setQuote(quote.content);
            setAuthor(quote.author);
          }
        );
    }
    getAuthor();
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

  const handleNameInputChange = () => {
    
  };

  return (
    <div className="App">
      <div className="top">
        <form action="">
          <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder="Qual o seu nome?"
            onChange={handleNameInputChange}
            />
          <input 
            id="send" 
            type="submit" 
            value="Enviar"
          />
        </form>
      </div>
      <div className="middle">
        <h1>{time}</h1>
        <h3>{greeting}</h3>
        
      </div>
      <div className="bottom">
        <div className="phrase">
          "{quote}"
          <div className="author">{author}</div>
        </div>
      </div>
    </div>
  );
}

export default App;