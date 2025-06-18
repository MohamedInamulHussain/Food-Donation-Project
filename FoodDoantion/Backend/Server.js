const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/database');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

connectDatabase();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/pages'));

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});