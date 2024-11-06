import { User } from '../models/user.js';

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(404).json({ error: 'email is already taken' });
    }
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.log('error from signup controller', error);
  }
};
