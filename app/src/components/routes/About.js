import React from 'react';
import Typography from '@material-ui/core/Typography';

const About = () => {
  return (
    <div className='width-80'>
      <Typography variant='h3'>Welcome!</Typography>
      <Typography variant='h5'>
        This is probably the world's first and only fitness website 100%
        designed and programmed by a personal trainer.
        <br /> *** <br />
        Our simple user interface allows you to reliably track all of your
        workouts and personal bests along with those of any clients you're
        training.
        <br /> *** <br />
        Please feel free to contact me with questions, comments or concerns at
        maxwellnesscontact@gmail.com
      </Typography>
    </div>
  );
};

export default About;
