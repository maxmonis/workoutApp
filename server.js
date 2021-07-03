const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/workouts', require('./routes/workouts'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('app/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'app', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
