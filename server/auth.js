const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./models');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password });
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(400).send('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Invalid username or password');
    }
    const token = jwt.sign({ userId: user.id }, 'mysecret', { expiresIn: '1h' });
    res.send({ token });
});

module.exports = router;
