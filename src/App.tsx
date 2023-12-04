import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  

  const [nameInput, setNameInput] = useState('');
  const [time, setTime] = useState('00:00');
  const [greeting, setGreeting] = useState('--');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  // Pega Author e frase
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
  // Pega Hora e minuto
  useEffect(() => {
    let timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);
  // Atualiza o greeting ao carregar pagina
  useEffect(() => {
    updateGreeting();
  }, [time]);
  // Atualiza tempo
  const updateTime = () => {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let hourStr = hours < 10 ? '0' + hours : hours.toString();
    let minStr = minutes < 10 ? '0' + minutes : minutes.toString();

    setTime(`${hourStr}:${minStr}`);
  }
  // Atualiza o greeting
  const updateGreeting = () => {
    const myName = nameInput;
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
  // Pega nome digitado no input
  const handleNameInputChange = (event) => {
    setNameInput(event.target.value);
  }
  // Aparece o nome digitado no greeting
  const userName = (event) => {
    event.preventDefault();
    // console.log(nameInput);
    updateGreeting();
  }

  return (
    <div className="App">
      <div className="top">
        <form action="">
          <input id='name' type='text' name='name' onChange={handleNameInputChange} placeholder='Digite seu nome' />
          <button id='send' onClick={userName}>Enviar</button>
        </form>
      </div>

      <div className="middle">
        <h1>{time}</h1>
         {nameInput &&
          <h3>{greeting}</h3>
         }               
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