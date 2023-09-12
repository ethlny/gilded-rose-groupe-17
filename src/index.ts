export class Item {
  name: string;
  expiresIn: number;
  quality: number;
  /*
  Item with type 'QualityOverTime' will increase in quality as it ages
  Item with type 'Conjured' will decrease in quality twice as fast as normal items
  Item with type 'Normal' will decrease in quality as it ages
  Item with type 'ConcertTicket', 
    - If the concert is more than 10 days away, the quality increases by 1 each day.
    - If the concert is 10 days or less away, the quality increases by 2 each day.
    - If the concert is 5 days or less away, the quality increases by 3 each day.
    - Once the concert has passed (i.e., the expiration date has reached 0), the quality drops to 0
  */
  type : 'QualityOverTime' | 'Conjured' | 'Normal' | 'ConcertTicket' | 'Intangible';

  constructor(name, expiresIn, quality, type) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.quality = quality;
    this.type = type;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateItemQuality(item: Item) {

    const itemExpiresIn = item.expiresIn;
    const itemQuality = item.quality;
    const itemType = item.type;

    if (itemType === 'QualityOverTime') {
      if (itemQuality < 50) {
        item.quality = itemQuality + 1;
      }
    }

    if (itemType === 'Conjured') {
      if (itemQuality => 2) {
        item.quality = itemQuality - 2;
      }
    }

    if (itemType === 'Normal') {
      if (itemQuality > 0) {
        item.quality = itemQuality - 1;
      }
    }

    if (itemType === 'ConcertTicket') {
      if (itemQuality < 50) {
        if (itemExpiresIn > 10) {
          item.quality = itemQuality + 1;
        }
        if (itemExpiresIn <= 10 && itemExpiresIn > 5) {
          item.quality = itemQuality + 2;
        }
        if (itemExpiresIn <= 5 && itemExpiresIn > 0) {
          item.quality = itemQuality + 3;
        }
        if (itemExpiresIn <= 0) {
          item.quality = 0;
        }
      }
    }

    if (itemType === 'Intangible') {
      return;
    }

    item.expiresIn = itemExpiresIn - 1;

  }

  updateEachItem() {
    this.items.forEach(item => {
      this.updateItemQuality(item);
    });

    return this.items;
  }

}
