import { useRef, useEffect, useState } from 'react';
import './App.css'
import Button from '@material-ui/core/Button';

function App() {
  const [quotes, setQuotes] = useState(null)
  const TextRef = useRef(null)
  const AuthorRef = useRef(null)

  const getQuote = async () => {
    const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json");
    const data = await response.json();
    const { quotes } = data;
    setQuotes(quotes);
    showNewQuote;
  }

  useEffect(() => {
    getQuote();
  }, [])

  useEffect(() => {
    if (quotes) {
      showNewQuote();
    }
  }, [quotes]);

  const showNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * (quotes.length - 0 + 1)) + 0;
    const { author, quote } = quotes[randomIndex]
    TextRef.current.textContent = quote;
    AuthorRef.current.textContent = `~ ${author}`
  }

  return (
    <>
      <div id="wrapper">
        <div id="quote-box">
          <p ref={TextRef} id='text'></p>
          <p ref={AuthorRef} id='author'></p>
          <div className="flex">
            <a target='_blank' href="twitter.com/intent/tweet" id='tweet-quote'>
              <img id='logo' src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" />
            </a>
            <Button variant="contained" onClick={showNewQuote}
              style={{ backgroundColor: 'black', color: 'aqua' }}
            >
              New Quote</Button>
          </div>
        </div>
        <footer>
          By Namit
        </footer>
      </div>
    </>
  )
}

export default App
