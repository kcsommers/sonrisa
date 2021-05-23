import matcha1 from '@assets/images/doughnuts/matcha-1.jpg';
import matchaTransparent from '@assets/images/doughnuts/matcha-transparent.png';
import strawberry1 from '@assets/images/doughnuts/strawberry-1.jpg';
import strawberryTransparent from '@assets/images/doughnuts/strawberry-transparent.png';
import vanilla1 from '@assets/images/doughnuts/vanilla-1.jpg';
import vanillaTransparent from '@assets/images/doughnuts/vanilla-transparent.png';
import nutella1 from '@assets/images/doughnuts/nutella-1.jpg';
import nutellaTransparent from '@assets/images/doughnuts/nutella-transparent.png';
import thai1 from '@assets/images/doughnuts/thai-1.jpg';
import thaiTransparent from '@assets/images/doughnuts/thai-transparent.png';
import { IOrderableItem, OrderableItem } from './OrderableItem';

export enum Doughnuts {
  VANILLA = 'Vanilla Custard',

  THAI_TEA = 'Thai Milk Tea',

  NUTELLA = "Fran's Nutella",

  MATCHA = 'Mulberry Matcha',

  STRAWBERRY = 'Strawberry Cream Cheese',
}

export const doughnuts: OrderableItem[] = [
  new OrderableItem(
    Doughnuts.VANILLA,
    [vanillaTransparent, vanilla1, matcha1],
    425,
    'Vanilla beans with Local WA Dairy'
  ),
  new OrderableItem(
    Doughnuts.MATCHA,
    [matchaTransparent, matcha1],
    425,
    'Mulberry green tea latte'
  ),
  new OrderableItem(
    Doughnuts.NUTELLA,
    [nutellaTransparent],
    425,
    "Fran's Chocolate made in Seattle with Nutella"
  ),
  new OrderableItem(
    Doughnuts.THAI_TEA,
    [thaiTransparent],
    425,
    'Original Thai milk tea blended with Ceylon tea,'
  ),
  new OrderableItem(
    Doughnuts.STRAWBERRY,
    [strawberryTransparent],
    425,
    'Housemade strawberry jam'
  ),
];
