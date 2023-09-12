export class Item {
  name: string
  sellIn: number
  quality: number

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}


export default class GildedRose {
  items: Array<Item>

  constructor(items: Array<Item> = []) {
    this.items = items
  }

  updateQuality(): Array<Item> {
    for (const item of this.items) {
      // Gérer la mise à jour de la qualité en fonction du nom de l'élément
      switch (item.name) {
        case 'Aged Brie':
          // La qualité de "Aged Brie" augmente si elle est inférieure à 50
          if (item.quality < 50) {
            item.quality += 1
          }
          break
        case 'Backstage passes to a TAFKAL80ETC concert':
          // La qualité de 'Backstage passes' augmente selon les règles du readme
          if (item.quality < 50) {
            item.quality += 1
            if (item.sellIn < 11 && item.quality < 50) {
              item.quality += 1
            }
            if (item.sellIn < 6 && item.quality < 50) {
              item.quality += 1
            }
          }
          // Si la date de vente est passée, la qualité passe a 0
          if (item.sellIn < 0) {
            item.quality = 0
          }
          break
        case 'Sulfuras, Hand of Ragnaros':
          // Sulfuras n'a pas de changement de qualité ni de date de vente
          break
        default:
          // Pour tous les autres éléments, la qualité diminue si elle est supérieure à zéro
          if (item.quality > 0) {
            item.quality -= 1
          }
          // Si la date de vente est passée, la qualité diminue à nouveau
          if (item.sellIn < 0 && item.quality > 0) {
            item.quality -= 1
          }
      }

      // Réduire la date de vente de 1, sauf pour Sulfuras
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.sellIn -= 1
      }
    }

    return this.items
  }
}
