import donut from '@assets/images/donut_1.jpg';
import matchaDonut from '@assets/images/matcha_donut.jpg';

export enum Donuts {
  VANILLA = 'Vanilla',

  THAI_TEA = 'Thai Tea',

  NUTELLA = 'Nutella',

  MATCHA = 'Matcha',
}

export interface IDonut {
  name: string;

  image: string;
}

export const donuts: IDonut[] = [
  {
    name: Donuts.VANILLA,
    image: donut,
  },
  {
    name: Donuts.MATCHA,
    image: matchaDonut,
  },
  {
    name: Donuts.THAI_TEA,
    image: donut,
  },
  {
    name: Donuts.NUTELLA,
    image: donut,
  },
];
