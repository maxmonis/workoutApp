import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const getIndex = (length) => Math.floor(Math.random() * length);
  const getQuote = async () => {
    setQuote(null);
    try {
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const target = 'https://type.fit/api/quotes';
      const res = await fetch(proxy + target);
      const quotes = await res.json();
      setQuote(quotes[getIndex(quotes.length)]);
    } catch (err) {
      console.log(err);
      setQuote({
        text: 'Be the change you want to see in the world',
        author: 'Gandhi',
      });
    }
  };
  useEffect(() => {
    getQuote();
    // eslint-disable-next-line
  }, []);
  return !quote ? (
    <Spinner />
  ) : (
    <div className='quote' onClick={getQuote}>
      <h3>{quote.text}</h3>
      <h4>-{quote.author || 'Anonymous'}</h4>
    </div>
  );
};

export default Quote;
