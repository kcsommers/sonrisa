import { Doughnuts } from './Doughnuts';

const images = {
  [Doughnuts.VANILLA]: [
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455065/Sonrisa/vanilla-2.jpg',
  ],
  [Doughnuts.MATCHA]: [
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455068/Sonrisa/matcha-2.jpg',
  ],
  [Doughnuts.NUTELLA]: [
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455067/Sonrisa/nutella-2.jpg',
  ],
  [Doughnuts.THAI_TEA]: [
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455067/Sonrisa/thai-2.jpg',
  ],
  [Doughnuts.STRAWBERRY]: [
    'https://res.cloudinary.com/kcsommers/image/upload/v1625455068/Sonrisa/strawberry-2.jpg',
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
    BLJ7F5PTENWNIM5NFJ2PWKDH: images[Doughnuts.STRAWBERRY],
    // rotating special
    SPECIAL: images[Doughnuts.SPECIAL],
  },
  production: {
    F5ARMOGCBXH4OAKMCFA52BGX: images[Doughnuts.VANILLA],
    AROGK7HG7DRU2W65CEJWVAAJ: images[Doughnuts.MATCHA],
    LJ45EWF7HREN6QLWNOQH7XE2: images[Doughnuts.NUTELLA],
    MHNMSOME7LVP55SLKREXSQB2: images[Doughnuts.THAI_TEA],
    BLJ7F5PTENWNIM5NFJ2PWKDH: images[Doughnuts.STRAWBERRY],
    // rotating special
    SPECIAL: images[Doughnuts.SPECIAL],
  },
};
