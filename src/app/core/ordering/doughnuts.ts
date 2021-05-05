import matcha1 from '@assets/images/doughnuts/matcha-1.jpg';
import raspberry1 from '@assets/images/doughnuts/raspberry-1.jpg';
import vanilla1 from '@assets/images/doughnuts/vanilla-1.jpg';
import nutella1 from '@assets/images/doughnuts/nutella-1.jpg';
import thai1 from '@assets/images/doughnuts/thai-1.jpg';
import { IOrderableItem, OrderableItem } from './OrderableItem';

export enum Doughnuts {
  VANILLA = 'Vanilla',

  THAI_TEA = 'Thai Tea',

  NUTELLA = 'Nutella',

  MATCHA = 'Matcha',

  RASPBERRY = 'Raspberry',
}

export const doughnuts: OrderableItem[] = [
  new OrderableItem(Doughnuts.VANILLA, [vanilla1], 200),
  new OrderableItem(Doughnuts.MATCHA, [matcha1], 200),
  new OrderableItem(Doughnuts.NUTELLA, [nutella1], 200),
  new OrderableItem(Doughnuts.THAI_TEA, [thai1], 200),
  new OrderableItem(Doughnuts.RASPBERRY, [raspberry1], 200),
];
