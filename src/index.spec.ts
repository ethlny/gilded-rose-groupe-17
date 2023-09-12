import GildedRose, { Item } from './index';

describe('GildedRose', () => {
  it('devrait diminuer la qualité et les valeurs de sellIn pour les objets normaux', () => {
    const items: Item[] = [new Item('Normal Item', 10, 20)];
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(9);
    expect(updatedItems[0].quality).toBe(19);
  });

  it('devrait augmenter la qualité de Aged Brie', () => {
    const items: Item[] = [new Item('Aged Brie', 10, 20)];
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(9);
    expect(updatedItems[0].quality).toBe(21);
  });

  it('devrait augmenter la qualité des Backstage passes correctement', () => {
    const items: Item[] = [new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20)];
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(10);
    expect(updatedItems[0].quality).toBe(21);
  });

  it('ne devrait pas diminuer la qualité de Sulfuras', () => {
    const items: Item[] = [new Item('Sulfuras, Hand of Ragnaros', 10, 80)];
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(10);
    expect(updatedItems[0].quality).toBe(80);
  });

  it('devrait gérer laugmentation de la qualité des Backstage passes près de la date de SellIn', () => {
    const items: Item[] = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)];
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(9);
    expect(updatedItems[0].quality).toBe(22);
  });

  it('deoit gérer laugmentation de la qualité des Backstage passes près de la date de SellIn (2ème étape)', () => {
    const items: Item[] = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)];
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(4);
    expect(updatedItems[0].quality).toBe(23);
  });

  it('devrai gérer laugmentation de la qualité des Backstage passes près de la date de SellIn (3ème étape)', () => {
    const items: Item[] = [new Item('Backstage passes to a TAFKAL80ETC concert', 1, 20)];
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(0);
    expect(updatedItems[0].quality).toBe(23);
  });

  it('ne devrait pas diminuer la qualité en dessous de 0', () => {
    const items: Item[] = [new Item('Normal Item', 10, 0)];
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(9);
    expect(updatedItems[0].quality).toBe(0);
  });

  it('devrait gérer la diminution de la qualité des objets normaux après la date de SellIn', () => {
    const items: Item[] = [new Item('Normal Item', 0, 20)];
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(-1);
    expect(updatedItems[0].quality).toBe(19);
  });

  it('doit définir la qualité à 0 lorsque "Backstage passes" a un sellIn inférieur à 0', () => {
    const items: Item[] = [new Item('Backstage passes to a TAFKAL80ETC concert', -1, 20)];
    const gildedRose = new GildedRose(items);
  
    const updatedItems = gildedRose.updateQuality();
  
    expect(updatedItems[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(updatedItems[0].quality).toBe(0);
  });
  
  
  it('devrait gérer la diminution de la qualité des objets normaux après la date de SellIn avec une qualité supérieure à 0', () => {
    const normalItem: Item = new Item('Normal Item', -1, 20);
    const gildedRose = new GildedRose([normalItem]);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(-2);
    expect(updatedItems[0].quality).toBe(18);
  });
});
