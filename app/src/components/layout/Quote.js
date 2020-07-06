import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const getQuote = async () => {
    setQuote(null);
    try {
      const { data } = await axios.get('https://type.fit/api/quotes');
      const index = Math.floor(Math.random() * data.length);
      setQuote(data[index]);
    } catch (err) {
      console.log(err);
      setQuote({
        text: 'Be the change you want to see in the world',
        author: 'Mohandas Gandhi',
      });
    }
  };
  useEffect(() => {
    getQuote();
    // eslint-disable-next-line
  }, []);
  return !quote ? (
    <div>
      <h3>Loading quote...</h3>
    </div>
  ) : (
    <div className='quote' onClick={getQuote}>
      <h3>{quote.text}</h3>
      <h4>-{quote.author || 'Anonymous'}</h4>
    </div>
  );
};

export default Quote;
