import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useToggle from '../../hooks/useToggle';

const About = () => {
  const [isDisplayed, toggle] = useToggle(false);
  return (
    <div className='width-80'>
      <br />
      {!isDisplayed ? (
        <Button color='inherit' onClick={toggle}>
          More Info &#x25BC;
        </Button>
      ) : (
        <Fragment>
          <Typography variant='h6'>
            Welcome to maxWellness!
            <br /> *** <br />
            Track all of your workouts and personal bests along with those of up
            to twenty clients
            <br /> *** <br />
            Access your account from anywhere in the world using a securely
            encrypted password
            <br /> *** <br />
            This service is totally free of charge and we will never share your
            data with any third party
            <br /> *** <br />
            Please feel free to contact us with questions, comments or concerns
            at
            <br /> maxwellnesscontact@gmail.com
          </Typography>
          <br />
          <Button color='inherit' onClick={toggle}>
            Hide Greeting &#x25B2;
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default About;
