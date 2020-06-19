import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

const Quote = () => {
  const [quotes, setQuotes] = useState([]);
  const randomize = () => Math.floor(Math.random() * 1643);
  const [index, setIndex] = useState(randomize());
  const handleClick = () => setIndex(randomize);
  useEffect(() => {
    const getQuotes = async () => {
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const target = 'https://type.fit/api/quotes';
      const api = await fetch(proxy + target);
      const quotes = await api.json();
      setQuotes(quotes);
    };
    getQuotes();
  }, []);
  return !quotes.length ? (
    <Spinner />
  ) : (
    <div className='quote' onClick={handleClick}>
      <h3>{quotes[index].text}</h3>
      <h4>-{quotes[index].author || 'Anonymous'}</h4>
    </div>
  );
};

export default Quote;
