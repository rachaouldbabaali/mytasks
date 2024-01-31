const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    const result = await user.save();

    const { password, ...savedUser } = await result.toJSON();

    res.status(201).send(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(404).json({ error: 'Password is not correct' });
        }

    const token = jwt.sign(
        { id: user._id, name: user.name },
        "secret"
    );

    res.setHeader('Set-Cookie', `jwt=${token}; path=/; HttpOnly`);

    res.status(200).json({ message: 'Login successful' });
}
);

router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, "secret", { ignoreExpiration: false });

        if (!claims) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        console.log('User ID from claims:', claims.id);
        const user = await User.findOne({ _id: claims.id });
        console.log('Fetched user:', user);

        const { password, ...data } = await user.toJSON();

        res.status(200).json(data);
    } catch (error) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
});

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 });

    res.status(200).json({ message: 'Logout successful' });
}
);

module.exports = router;
