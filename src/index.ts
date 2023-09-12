export class Item {
  name: string;
  sellIn: number;
  quality: number;
  type : 'Normal' | 'Conjured' | 'Brie' | 'Ticket' | 'Legendary';

  constructor(name, sellIn, quality, type) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.type = type;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }
  
  updateQuality(item: Item) {

    let itemSellIn = item.sellIn;
    let itemQuality = item.quality;
    let itemType = item.type;


// ---------------------------------------------------------------------------------

    if (itemType === 'Normal') {
      // Si date de péremption dépassée : - 2
      if (itemSellIn <= 0 && itemQuality >= 2 ) {
        item.quality = itemQuality - 2;
      } 
      // Sinon : -1 jusqu'à 0
      else if (itemQuality > 0){
        item.quality = itemQuality - 1;
      }
    }

// ---------------------------------------------------------------------------------

    // Si item Conjured: -2
    if (itemType === 'Conjured') {
      if (itemQuality >= 2) {
        item.quality = itemQuality - 2;
      }
      // Pour ne pas dépasser 0
      if (itemQuality === 1) {
        item.quality = itemQuality - 1;
      }
    }

// ---------------------------------------------------------------------------------

    // Si Brie, augmente tant que qualité < 50
    if (itemType === 'Brie') {
      if (itemQuality < 50) {
        item.quality = itemQuality + 1;
      }
    }

// ---------------------------------------------------------------------------------

    // Si item Légendaire, objet invendable, la qualité ne peut baisser
    if (itemType === 'Legendary') {
      return;
    }

// ---------------------------------------------------------------------------------
// Ici je met des valeurs tels que 6 ou 11 au lieu de 5 et 10 pour obtenir le résultat souhaité
// car je considère que la réduction se fait le jour même et non après,
// donc à 6j : 22€ et à 5j : 25€ (et pas 24 car on fait directement +3 au lieu de +2 car +3 est "dès la 5è jour")

    // Si Ticket ...
    if (itemType === 'Ticket') {
      
      if ( itemQuality < 50 ) {
        // > J-10 : +1
        if ( itemSellIn > 11) {
          item.quality = itemQuality + 1;
        }
        // J-10 -> J-6 : +3
        if ( itemSellIn <= 11 &&  itemSellIn > 6) {
          if (itemQuality >= 48) {
            item.quality = 50
          } else {
            item.quality = itemQuality + 2;
          }
        }
        // J-5 -> jour-J : +3
        if ( itemSellIn <= 6 && itemSellIn >= 1) {
          if (itemQuality >= 47) {
            item.quality = 50
          } else {
            item.quality = itemQuality + 3;
          }
        }
        // 0 = Jour-J : place tj vendable

        // Date dépassée : 0
        if ( itemSellIn <= 0 ) {
          item.quality = 0;
        }
      }
      
      // Au cas où itemQuality dépasserais 50  
      if ( itemQuality >= 50 ) {
        item.quality = 50;
      }

    }
    item.sellIn = itemSellIn - 1;
    
  }
// ---------------------------------------------------------------------------------

  updateItems() {
    this.items.forEach
      (item => {
        this.updateQuality(item);
      })

    return this.items;
  }

}
