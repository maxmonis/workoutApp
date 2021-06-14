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
      console.error(err);
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
  return (
    <div className='quote'>
      {!quote ? (
        <h4>Loading quote...</h4>
      ) : (
        <div onClick={getQuote}>
          <h4>{quote.text}</h4>
          <h5>-{quote.author || 'Anonymous'}</h5>
        </div>
      )}
    </div>
  );
};

export default Quote;
