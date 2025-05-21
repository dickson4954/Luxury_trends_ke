
import kitchen1 from '../Images/kitchen.avif';
import garden1  from '../Images/garden.jpg';
import appliances1 from '../Images/appliances.jpeg';
import bedroom1 from '../Images/Bedroom.jpeg';

const products = [
  {
    id: 1,
    slug: 'appliances',
    name: 'Appliances',
    description: 'Top‑quality appliances to make your home run smoothly.',
    images: [appliances1, appliances1],  // add distinct second images if you have them
    price: 1440,
    date: '2024-01-20',
  },
  {
    id: 2,
    slug: 'bedroom-essentials',
    name: 'Bedroom Essentials',
    description: 'Cozy linens, pillows, and decor for a restful space.',
    images: [bedroom1, bedroom1],
    price: 2000,
    date: '2024-04-10',
  },
  {
    id: 3,
    slug: 'garden-tools',
    name: 'Garden Tools',
    description: 'Durable, ergonomic tools for every gardening task.',
    images: [garden1, garden1],
    price: 1200,
    date: '2023-11-01',
  },
  {
    id: 4,
    slug: 'kitchenware',
    name: 'Kitchenware',
    description: 'Premium kitchenware for chefs and home cooks alike.',
    images: [kitchen1, kitchen1],
    price: 1800,
    date: '2024-05-15',
  },
];

export default products;
