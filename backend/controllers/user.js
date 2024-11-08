import { User } from '../models/user.js';
import bcryptjs from 'bcryptjs';
// CRUD
// create
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //what if the user does not provide any of the three fields.
    if (!username || !email || !password) {
      return res.status(404).json({ error: 'All fileds are required.' });
    }
    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.status(404).json({ error: 'email is already taken' });
    }
    const existedUsername = await User.findOne({ username });
    if (existedUsername) {
      return res.status(404).json({ error: 'Username is already taken.' });
    }

    if (password.length < 6) {
      return res
        .status(404)
        .json({ error: 'password must be atleast 6 characters' });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log('error from signup controller', error);
  }
};
//readd

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return res.status(404).json({ error: 'no user found with this email.' });
    }
    const isCorrectPassword = bcryptjs.compare(existedUser.password, password);
    if (!isCorrectPassword) {
      return res.status(403).json({ error: 'Invaid Credentials.' });
    }

    const { password: pass, ...others } = existedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const newUser = await User.findByIdAndUpdate(
      id,
      {
        username,
      },
      { new: true }
    );
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUesr = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json({ message: 'user deleted successfully.' });
  } catch (error) {
    console.log(error);
  }
};
