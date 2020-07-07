import React from 'react';
import Typography from '@material-ui/core/Typography';

const About = () => {
  return (
    <div className='width-80'>
      <Typography variant='h3'>Welcome!</Typography>
      <Typography variant='h5'>
        <br /> My name is Max. In my career as a personal trainer I've never
        found an app for record keeping that I prefer to a word processor or
        pencil and paper. In May of 2019 I decided to create one. I'd never
        written a line of code at the time.
        <br /> *** <br /> This website is the product of many hours of hard work
        since then. It's probably the world's first and only app 100% designed
        and programmed by a personal trainer, for personal trainers. While
        that's largely because there aren't many fitness professionals who also
        understand the MERN stack, I'm proud of the likely distinction.
        <br /> *** <br /> Our simple user interface allows you to easily add and
        remove clients from your active roster while reliably tracking all of
        their workouts and personal bests. I find it very useful to have the
        entire history of each client at hand while planning their next training
        session and I hope you will too.
        <br /> *** <br /> In the coming months and years maxWellness will expand
        greatly and incorporate new features to make our lives easier by
        allowing us to consolidate even more of our information in one
        well-organized repository. I welcome and greatly appreciate any feedback
        and suggestions you, the maxWellness community, can provide regarding
        ways the app can improve and grow. Please feel free to contact me with
        questions, comments or concerns at maxwellnesscontact@gmail.com
      </Typography>
    </div>
  );
};

export default About;
