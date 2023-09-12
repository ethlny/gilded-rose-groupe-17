export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  //  Mettre à jour la qualité des articles
  updateQuality() {
    this.items.forEach((currentItem) => {
      this.updateItemQuality(currentItem);
      this.updateSellIn(currentItem);
    });

    return this.items;
  }

  /* Met à jour la qualité de l'article
    en fonction de son type */
  private updateItemQuality(item: Item) {
    if (item.name === "Aged Brie") {
      this.increaseQuality(item); // Augmente la qualité pour "Aged Brie"
    } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      this.handleBackstagePass(item); // Gère les "Backstage passes"
    } else if (item.name !== "Sulfuras, Hand of Ragnaros") {
      this.decreaseQuality(item); // Réduit la qualité pour les autres articles
    }
  }

  /* Augmente la qualité de l'article,
    en respectant la limite de 5*/
  private increaseQuality(item: Item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  /* Réduit la qualité de l'article
   en évitant les valeurs négatives */
  private decreaseQuality(item: Item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
  }

  /* Gère les "Backstage passes" en augmentant
    la qualité selon les conditions spécifiques */
  private handleBackstagePass(item: Item) {
    if (item.quality < 50) {
      item.quality += 1;

      if (item.sellIn < 11 && item.quality < 50) {
        item.quality += 1;
      }

      if (item.sellIn < 6 && item.quality < 50) {
        item.quality += 1;
      }
    }
  }

  /* Met à jour la valeur sellIn (jours restants) 
    de l'article mais du coup paspour "Sulfuras" */
  private updateSellIn(item: Item) {
    if (item.name !== "Sulfuras, Hand of Ragnaros") {
      item.sellIn -= 1;
    }
  }
}
