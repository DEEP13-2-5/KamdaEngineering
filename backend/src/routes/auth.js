import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readUsers, writeUsers } from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// Setup Default Admin
export const setupDefaultAdmin = async () => {
  const users = await readUsers();
  if (!users.find(u => u.email === 'admin@kamda.com')) {
    const defaultAdmin = {
      id: 'admin-001',
      name: 'Admin',
      email: 'admin@kamda.com',
      password: await bcrypt.hash('admin123', 10),
      company: 'Kamda Engineering Works',
      role: 'admin'
    };
    users.push(defaultAdmin);
    await writeUsers(users);
  }
};

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, company, role } = req.body;
  try {
    const users = await readUsers();
    
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      company: company || '',
      role: role === 'admin' ? 'admin' : 'user'
    };

    users.push(newUser);
    await writeUsers(users);

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '1d' });
    
    // Omit password from response
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await readUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
