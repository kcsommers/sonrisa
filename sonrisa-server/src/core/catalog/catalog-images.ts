import { Doughnuts } from './Doughnuts';

const images = {
  [Doughnuts.VANILLA]: [
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455065/Sonrisa/vanilla-2.jpg',
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455065/Sonrisa/vanilla-3.jpg',
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455065/Sonrisa/vanilla-4.jpg',
  ],
  [Doughnuts.MATCHA]: [
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455068/Sonrisa/matcha-2.jpg',
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455068/Sonrisa/matcha-3.jpg',
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455068/Sonrisa/matcha-4.jpg',
  ],
  [Doughnuts.NUTELLA]: [
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455067/Sonrisa/nutella-2.jpg',
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455067/Sonrisa/nutella-3.jpg',
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455067/Sonrisa/nutella-4.jpg',
  ],
  [Doughnuts.THAI_TEA]: [
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455067/Sonrisa/thai-2.jpg',
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455067/Sonrisa/thai-3.jpg',
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455067/Sonrisa/thai-4.jpg',
  ],
  [Doughnuts.SPECIAL]: [
    'https://res.cloudinary.com/kcsommers/image/upload/v1625978476/Sonrisa/rotating-special.png',
  ],
};

export const catalogImages = {
  development: {
    F5ARMOGCBXH4OAKMCFA52BGX: images[Doughnuts.VANILLA],
    AROGK7HG7DRU2W65CEJWVAAJ: images[Doughnuts.MATCHA],
    LJ45EWF7HREN6QLWNOQH7XE2: images[Doughnuts.NUTELLA],
    MHNMSOME7LVP55SLKREXSQB2: images[Doughnuts.THAI_TEA],
    // rotating special
    SPECIAL: images[Doughnuts.SPECIAL],
  },
  production: {
    MJU3RB7WNNZMHGAFYYQEP5BS: images[Doughnuts.VANILLA],
    PWZ27YDAOEEJLYXAFGZ75DS5: images[Doughnuts.MATCHA],
    PQ3EIHBOZJ2QXMCF5RXTXHAS: images[Doughnuts.NUTELLA],
    MDNUEK57BINWEAEEF7SAWOJS: images[Doughnuts.THAI_TEA],
    // rotating special
    SPECIAL: images[Doughnuts.SPECIAL],
  },
};
