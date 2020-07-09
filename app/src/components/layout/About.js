import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useToggle from '../../hooks/useToggle';

const About = () => {
  const [isDisplayed, toggle] = useToggle(false);
  return (
    <div className='width-80'>
      <br />
      <TransitionGroup className='page'>
        {!isDisplayed ? (
          <CSSTransition key={1} timeout={500}>
            <Button color='inherit' onClick={toggle}>
              More Info &#x25BC;
            </Button>
          </CSSTransition>
        ) : (
          <CSSTransition key={2} timeout={500} classNames='fade'>
            <div>
              <Typography variant='h6'>
                Welcome to maxWellness!
                <br /> *** <br />
                Track all of your workouts and personal bests along with those
                of up to twenty clients
                <br /> *** <br />
                Access your account from anywhere in the world using a securely
                encrypted password
                <br /> *** <br />
                This service is totally free of charge and we will never share
                your data with any third party
                <br /> *** <br />
                Please direct questions, comments or concerns to
                <br /> maxwellnesscontact@gmail.com
              </Typography>
              <br />
              <Button color='inherit' onClick={toggle}>
                Hide Greeting &#x25B2;
              </Button>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default About;
