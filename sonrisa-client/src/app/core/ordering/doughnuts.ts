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
import { IOrderableItem } from './IOrderableItem.interface';
import { createOrderableItem } from './ordering-utils';

export enum Doughnuts {
  VANILLA = 'Vanilla Custard',

  THAI_TEA = 'Thai Milk Tea',

  NUTELLA = "Fran's Nutella",

  MATCHA = 'Mulberry Matcha',

  STRAWBERRY = 'Strawberry Cream Cheese',
}

export const doughnuts: IOrderableItem[] = [
  createOrderableItem(
    Doughnuts.VANILLA,
    [vanillaTransparent, vanilla1, matcha1],
    425,
    'Vanilla beans with Local WA Dairy'
  ),
  createOrderableItem(
    Doughnuts.MATCHA,
    [matchaTransparent, matcha1],
    425,
    'Mulberry green tea latte'
  ),
  createOrderableItem(
    Doughnuts.NUTELLA,
    [nutellaTransparent, nutella1],
    425,
    "Fran's Chocolate made in Seattle with Nutella"
  ),
  createOrderableItem(
    Doughnuts.THAI_TEA,
    [thaiTransparent, thai1],
    425,
    'Original Thai milk tea blended with Ceylon tea,'
  ),
  createOrderableItem(
    Doughnuts.STRAWBERRY,
    [strawberryTransparent, strawberry1],
    425,
    'Housemade strawberry jam'
  ),
];
