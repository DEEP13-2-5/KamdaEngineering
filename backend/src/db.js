import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.resolve('src/data');
const USERS_FILE = path.join(DB_PATH, 'users.json');
const LISTINGS_FILE = path.join(DB_PATH, 'listings.json');
const QUOTES_FILE = path.join(DB_PATH, 'quotes.json');

const ensureFileExists = async (filePath, initialData) => {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(DB_PATH, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(initialData, null, 2));
  }
};

export const initDB = async () => {
  await ensureFileExists(USERS_FILE, []);
  
  const defaultListings = [
    {
      id: 'listing-1',
      name: 'SS Belt Conveyor System',
      category: 'conveyor-systems',
      price: '₹2,50,000',
      image: 'https://images.pexels.com/photos/4491443/pexels-photo-4491443.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      material: 'SS316',
      capacity: '500 kg/hr',
      description: 'Heavy-duty stainless steel belt conveyor for pharmaceutical applications',
      specifications: ['SS316 Construction', 'Variable Speed Drive', 'Food Grade Belt'],
      createdBy: 'admin-001',
      createdAt: '2026-03-01'
    },
    {
      id: 'listing-2',
      name: 'Pharmaceutical Mixing Tank',
      category: 'mixing-agitators',
      price: '₹4,75,000',
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      material: 'SS316L',
      capacity: '1000L',
      description: 'High-efficiency mixing tank with agitator for pharmaceutical processing',
      specifications: ['SS316L Construction', 'Jacketed Design', 'CIP Compatible'],
      createdBy: 'admin-001',
      createdAt: '2026-03-05'
    }
  ];

  await ensureFileExists(LISTINGS_FILE, defaultListings);
  await ensureFileExists(QUOTES_FILE, []);
  console.log('Database initialized');
};

export const readUsers = async () => {
  const data = await fs.readFile(USERS_FILE, 'utf-8');
  return JSON.parse(data);
};

export const writeUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

export const readListings = async () => {
  const data = await fs.readFile(LISTINGS_FILE, 'utf-8');
  return JSON.parse(data);
};

export const writeListings = async (listings) => {
  await fs.writeFile(LISTINGS_FILE, JSON.stringify(listings, null, 2));
};

export const readQuotes = async () => {
  const data = await fs.readFile(QUOTES_FILE, 'utf-8');
  return JSON.parse(data);
};

export const writeQuotes = async (quotes) => {
  await fs.writeFile(QUOTES_FILE, JSON.stringify(quotes, null, 2));
};
