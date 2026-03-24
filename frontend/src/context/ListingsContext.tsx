import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Listing {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  material: string;
  capacity: string;
  description: string;
  specifications: string[];
  createdBy: string;
  createdAt: string;
}

interface ListingsContextType {
  listings: Listing[];
  addListing: (listing: Omit<Listing, 'id' | 'createdBy' | 'createdAt'>) => void;
  deleteListing: (id: string) => void;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

// Default listings to seed
const defaultListings: Listing[] = [
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
    createdAt: '2026-03-01',
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
    createdAt: '2026-03-05',
  },
  {
    id: 'listing-3',
    name: 'Laboratory Work Bench',
    category: 'laboratory-furniture',
    price: '₹85,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    material: 'SS304',
    capacity: '6ft x 3ft',
    description: 'Ergonomic laboratory workbench with storage and electrical fittings',
    specifications: ['SS304 Top', 'Storage Drawers', 'Electrical Panel'],
    createdBy: 'admin-001',
    createdAt: '2026-03-10',
  },
  {
    id: 'listing-4',
    name: 'Chemical Storage Tank',
    category: 'storage-tanks',
    price: '₹3,25,000',
    image: 'https://images.pexels.com/photos/4846084/pexels-photo-4846084.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    material: 'SS316L',
    capacity: '5000L',
    description: 'Corrosion-resistant storage tank for chemical applications',
    specifications: ['SS316L Construction', 'Dished Ends', 'Level Indicator'],
    createdBy: 'admin-001',
    createdAt: '2026-03-12',
  },
  {
    id: 'listing-5',
    name: 'Precision Clamp Assembly',
    category: 'clamping-solutions',
    price: '₹45,000',
    image: 'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    material: 'SS316',
    capacity: '50-200mm',
    description: 'High-precision clamping solution for industrial applications',
    specifications: ['SS316 Construction', 'Quick Release', 'Adjustable'],
    createdBy: 'admin-001',
    createdAt: '2026-03-15',
  },
  {
    id: 'listing-6',
    name: 'Roller Conveyor System',
    category: 'conveyor-systems',
    price: '₹1,85,000',
    image: 'https://images.pexels.com/photos/4491443/pexels-photo-4491443.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    material: 'SS304',
    capacity: '300 kg/hr',
    description: 'Gravity roller conveyor for light-duty material handling',
    specifications: ['SS304 Rollers', 'Modular Design', 'Easy Assembly'],
    createdBy: 'admin-001',
    createdAt: '2026-03-18',
  },
];

const getStoredListings = (): Listing[] => {
  try {
    const data = localStorage.getItem('kamda_listings');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveStoredListings = (listings: Listing[]) => {
  localStorage.setItem('kamda_listings', JSON.stringify(listings));
};

const seedDefaultListings = () => {
  const existing = getStoredListings();
  if (existing.length === 0) {
    saveStoredListings(defaultListings);
    return defaultListings;
  }
  return existing;
};

export const ListingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const data = seedDefaultListings();
    setListings(data);
  }, []);

  const addListing = (listing: Omit<Listing, 'id' | 'createdBy' | 'createdAt'>) => {
    if (!user || user.role !== 'admin') return;

    const newListing: Listing = {
      ...listing,
      id: `listing-${Date.now()}`,
      createdBy: user.id,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updated = [...listings, newListing];
    setListings(updated);
    saveStoredListings(updated);
  };

  const deleteListing = (id: string) => {
    if (!user || user.role !== 'admin') return;

    const updated = listings.filter(l => l.id !== id);
    setListings(updated);
    saveStoredListings(updated);
  };

  return (
    <ListingsContext.Provider value={{ listings, addListing, deleteListing }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = (): ListingsContextType => {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
};
