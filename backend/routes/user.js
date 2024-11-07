import express from 'express';
import {
  deleteUesr,
  getUsers,
  signup,
  updateUser,
} from '../controllers/user.js';

const router = express.Router();

router.post('/signup', signup);
router.get('/users', getUsers);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUesr);

export default router;
