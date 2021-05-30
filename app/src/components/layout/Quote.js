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
    <div>
      {!quote ? (
        <h5>Loading quote...</h5>
      ) : (
        <div onClick={getQuote}>
          <h5>{quote.text}</h5>
          <h6>-{quote.author || 'Anonymous'}</h6>
        </div>
      )}
    </div>
  );
};

export default Quote;
