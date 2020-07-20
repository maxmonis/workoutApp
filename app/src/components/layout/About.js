import React, { Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useToggle from '../../hooks/useToggle';

const About = () => {
  const [isDisplayed, toggle] = useToggle(false);
  const email = 'maxwellnesscontact@gmail.com';
  const handleClick = () => {
    const input = document.createElement('input');
    input.value = email;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  };
  return (
    <div className='width-80'>
      <br />
      <TransitionGroup className='page'>
        {!isDisplayed ? (
          <CSSTransition key={1} timeout={500} classNames='fade'>
            <Button color='inherit' onClick={toggle}>
              More Info &#x25BC;
            </Button>
          </CSSTransition>
        ) : (
          <CSSTransition key={2} timeout={500} classNames='fade'>
            <Fragment>
              <Typography variant='h6'>
                Thanks for visiting maxWellness!
                <br /> *** <br />
                Track your workouts and personal bests along with those of up to
                twenty clients
                <br /> *** <br />
                Access your account from anywhere in the world using a securely
                encrypted password
                <br /> *** <br />
                Free of charge, ad-free and we will never share your data with
                any third party
                <br /> *** <br />
                Please direct questions, comments or concerns to
                <br />
                <span style={{ cursor: 'pointer' }} onClick={handleClick}>
                  {email}
                </span>
              </Typography>
              <br />
              <Button color='inherit' onClick={toggle}>
                Hide Greeting &#x25B2;
              </Button>
            </Fragment>
          </CSSTransition>
        )}
      </TransitionGroup>
      <br />
    </div>
  );
};

export default About;
