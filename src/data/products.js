export const initialProducts = [
  {
    id: '1',
    category: 'Drink',
    name: 'Choco Mint Protein Shake',
    price: 45000,
    image: require('../../assets/images/chocomintproteinshake.jpeg'),
    description: 'Refreshing choco mint taste in 550ml, containing exactly 130cal.'
  },
  {
    id: '2',
    category: 'Drink',
    name: 'Chocolate Protein Shake',
    price: 45000,
    image: require('../../assets/images/chocolateproteinshake.jpeg'),
    description: 'Rich dark chocolate protein shake in 550ml, containing exactly 130cal.'
  },
  {
    id: '3',
    category: 'Drink',
    name: 'Strawberry Protein Shake',
    price: 45000,
    image: require('../../assets/images/strawberryproteinshake.jpeg'),
    description: 'Sweet and nutritious strawberry shake in 550ml, containing exactly 130cal.'
  },
  {
    id: '4',
    category: 'Food',
    name: 'Protein Ball (Chocolate)',
    price: 25000,
    image: require('../../assets/images/proteinballchocolate.jpeg'),
    description: 'Delicious bite-sized protein snacks. 3 pcs / 24cal total.'
  },
  {
    id: '5',
    category: 'Food',
    name: 'Protein Ball (Kacang)',
    price: 25000,
    image: require('../../assets/images/proteinballkacang.jpeg'),
    description: 'Peanut-butter based energy protein bites. 3 pcs / 24cal total.'
  },
  {
    id: '6',
    category: 'Food',
    name: 'Protein Ball (Wijen)',
    price: 25000,
    image: require('../../assets/images/proteinballwijen.jpeg'),
    description: 'Sesame coated healthy protein snacks. 3 pcs / 24cal total.'
  }
];

export const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#1F2937',
    primary: '#10B981', // green
    secondary: '#3B82F6', // blue
    card: '#F3F4F6',
    border: '#E5E7EB',
    danger: '#EF4444',
    accent: '#F59E0B' // yellow/orange
  },
  dark: {
    background: '#111827',
    text: '#F9FAFB',
    primary: '#10B981',
    secondary: '#3B82F6',
    card: '#1F2937',
    border: '#374151',
    danger: '#EF4444',
    accent: '#F59E0B'
  }
};
