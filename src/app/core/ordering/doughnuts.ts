import matcha1 from '@assets/images/doughnuts/matcha-1.jpg';
import matchaTransparent from '@assets/images/doughnuts/matcha-transparent.png';
import raspberry1 from '@assets/images/doughnuts/raspberry-1.jpg';
import raspberryTransparent from '@assets/images/doughnuts/raspberry-transparent.png';
import vanilla1 from '@assets/images/doughnuts/vanilla-1.jpg';
import vanillaTransparent from '@assets/images/doughnuts/vanilla-transparent.png';
import nutella1 from '@assets/images/doughnuts/nutella-1.jpg';
import nutellaTransparent from '@assets/images/doughnuts/nutella-transparent.png';
import thai1 from '@assets/images/doughnuts/thai-1.jpg';
import thaiTransparent from '@assets/images/doughnuts/thai-transparent.png';
import { IOrderableItem, OrderableItem } from './OrderableItem';

export enum Doughnuts {
  VANILLA = 'Vanilla',

  THAI_TEA = 'Thai Tea',

  NUTELLA = 'Nutella',

  MATCHA = 'Matcha',

  RASPBERRY = 'Raspberry',
}

export const doughnuts: OrderableItem[] = [
  new OrderableItem(Doughnuts.VANILLA, [vanillaTransparent], 200),
  new OrderableItem(Doughnuts.MATCHA, [matchaTransparent], 200),
  new OrderableItem(Doughnuts.NUTELLA, [nutellaTransparent], 200),
  new OrderableItem(Doughnuts.THAI_TEA, [thaiTransparent], 200),
  new OrderableItem(Doughnuts.RASPBERRY, [raspberryTransparent], 200),
];
