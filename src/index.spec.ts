import { ALL } from 'dns';
import { Item, GildedRose } from './index';


// SellIn value : Jour restant avant péremption
// Quality : Valeur de l'objet

describe('GildedRose', () => {
  describe('updateItems', () => {
    
    // Règles de base : 

    // Chaque jour la qualité baisse 
    it('should decrease the quality and sellIn values for a normal item', () => {
      const items = [new Item('Normal Item', 10, 20, 'Normal')];
      const gildedRose = new GildedRose(items);
      
      const updatedItems = gildedRose.updateItems();
      
      expect(updatedItems[0].sellIn).toBe(9);
      expect(updatedItems[0].quality).toBe(19);
    });
    
    // La qualité ne peut pas être inférieur à 0, à la date de péremption l'objet ne vaut juste plus rien
    it('should never let the quality of an item be negative', () => {
      const items = [new Item('Normal Item', 0, 0, 'Normal')];
      const gildedRose = new GildedRose(items);
      
      const updatedItems = gildedRose.updateItems();

      expect(updatedItems[0].name).toBe('Normal Item');
      expect(updatedItems[0].sellIn).toBe(-1);
      expect(updatedItems[0].quality).toBe(0);
    });
    
    // Quand la date de péremption est dépassée, la qualité baisse 2fois plus vite
    it('should decrease the Quality values twice for a normal item when SellIn quality has passed', () => {
      const items = [new Item('Normal Item', 0, 10, 'Normal')];
      const gildedRose = new GildedRose(items);
      
      const updatedItems = gildedRose.updateItems();
      
      expect(updatedItems[0].name).toBe('Normal Item');
      expect(updatedItems[0].sellIn).toBe(-1);
      expect(updatedItems[0].quality).toBe(8);
    });
    
    // La qualité d'un objet ne peut pas dépassé 50
    it('should never let the quality of an item be over 50', () => {
      const items = [new Item('Normal Item', 40, 50, 'Brie')];
      const gildedRose = new GildedRose(items);
      
      const updatedItems = gildedRose.updateItems();
      
      expect(updatedItems[0].sellIn).toBe(39);
      expect(updatedItems[0].quality).toBe(50);
    });
    


    // CONJURED
    // La qualité baisse 2fois plus vite (peu importe la date)
    it('should decrease the Quality values twice for a cojured item', () => {
      const items = [new Item('Conjured Item', 10, 20, 'Conjured')];
      const gildedRose = new GildedRose(items);
    
      const updatedItems = gildedRose.updateItems();
    
      expect(updatedItems[0].name).toBe('Conjured Item');
      expect(updatedItems[0].sellIn).toBe(9);
      expect(updatedItems[0].quality).toBe(18);
    });
    
    

    // BRIE
    // Chaque jour la qualité du brie augmente
    it('should increase the quality of Aged Brie as it ages', () => {
      const items = [new Item('Aged Brie', 10, 20, 'Brie')];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateItems();

      expect(updatedItems[0].sellIn).toBe(9);
      expect(updatedItems[0].quality).toBe(21);
    });



    // PLACE BACKSTAGE
    // Chaque jour la qualité des places backstages augmente
    it('should increase the quality of Backstage passes as the sellIn value approaches', () => {
      const items = [new Item('Backstage passes', 20, 30, 'Ticket')];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateItems();

      expect(updatedItems[0].sellIn).toBe(19);
      expect(updatedItems[0].quality).toBe(31);
    });

    // La qualité des places backstages augmente de 2 quand il reste 10jours ou moins
    it('should increase the quality of Backstage passes by 2 as the sellIn value is 10 or less', () => {
      const items = [new Item('Backstage passes',11, 20, 'Ticket')];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateItems();

      expect(updatedItems[0].sellIn).toBe(10);
      expect(updatedItems[0].quality).toBe(22);
    });

    // La qualité des places backstages augmente de 3 quand il reste 5jours ou moins
    it('should increase the quality of Backstage passes by 3 as the sellIn value is 5 or less', () => {
      const items = [new Item('Backstage passes',6, 20, 'Ticket')];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateItems();

      expect(updatedItems[0].sellIn).toBe(5);
      expect(updatedItems[0].quality).toBe(23);
    });

    // La qualité des places backstages retourne à 0 quand le concert est passé
    it('should decrease the quality of Backstage passes to 0 as the sellIn value is under 0', () => {
      const items = [new Item('Backstage passes', 0, 20, 'Ticket')];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateItems();

      expect(updatedItems[0].sellIn).toBe(-1);
      expect(updatedItems[0].quality).toBe(0);
    });
    // La qualité des places backstages retourne à 0 quand le concert est passé
    it('should never the quality of Backstage passes be over 50', () => {
      const items = [new Item('Backstage passes', 2, 49, 'Ticket')];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateItems();

      expect(updatedItems[0].sellIn).toBe(1);
      expect(updatedItems[0].quality).toBe(50);
    });

    // SULFURAS LEGENDARY ITEM
    // ne peut pas être vendu ni perdre en qualité
    it('should not be sold or decrease in quality', () => {
      const items = [new Item('Sulfuras', 20, 30, 'Legendary')];
    });


  });
});
