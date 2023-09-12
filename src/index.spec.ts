import { Item, GildedRose } from './index';

describe('Item class', () => {
  it('should create an item with the correct properties', () => {
    const item = new Item('Test Item', 5, 10, 'QualityOverTime');
    expect(item.name).toBe('Test Item');
    expect(item.expiresIn).toBe(5);
    expect(item.quality).toBe(10);
    expect(item.type).toBe('QualityOverTime');
  });
});

describe('GildedRose class', () => {
  it('should correctly update the quality for a QualityOverTime item', () => {
    const item = new Item('Aged Brie', 5, 20, 'QualityOverTime');
    const gildedRose = new GildedRose([item]);

    gildedRose.updateEachItem();

    expect(item.quality).toBe(21);
    expect(item.expiresIn).toBe(4);
  });

  it('should correctly update the quality for a Conjured item', () => {
    const item = new Item('Conjured Item', 5, 20, 'Conjured');
    const gildedRose = new GildedRose([item]);

    gildedRose.updateEachItem();

    expect(item.quality).toBe(18);
    expect(item.expiresIn).toBe(4);
  });

  it('should correctly update the quality for a Normal item', () => {
    const item = new Item('Normal Item', 5, 20, 'Normal');
    const gildedRose = new GildedRose([item]);

    gildedRose.updateEachItem();

    expect(item.quality).toBe(19);
    expect(item.expiresIn).toBe(4);
  });

  describe("Test for ConcertTicket over time", () => {
    /*
    Item with type 'ConcertTicket', 
    - If the concert is more than 10 days away, the quality increases by 1 each day.
    - If the concert is 10 days or less away, the quality increases by 2 each day.
    - If the concert is 5 days or less away, the quality increases by 3 each day.
    - Once the concert has passed (i.e., the expiration date has reached 0), the quality drops to 0
    */
    it('Should remove 1 from quality if the concert is more than 10 days away', () => {
      const item = new Item('ConcertTicket', 11, 20, 'ConcertTicket');
      const gildedRose = new GildedRose([item]);

      gildedRose.updateEachItem();

      expect(item.quality).toBe(21);
      expect(item.expiresIn).toBe(10);
    });

    it('Should remove 2 from quality if the concert is 10 days or less away', () => {
      const item = new Item('ConcertTicket', 10, 20, 'ConcertTicket');
      const gildedRose = new GildedRose([item]);

      gildedRose.updateEachItem();

      expect(item.quality).toBe(22);
      expect(item.expiresIn).toBe(9);
    });

    it('Should remove 3 from quality if the concert is 5 days or less away', () => {
      const item = new Item('ConcertTicket', 5, 20, 'ConcertTicket');
      const gildedRose = new GildedRose([item]);

      gildedRose.updateEachItem();

      expect(item.quality).toBe(23);
      expect(item.expiresIn).toBe(4);
    }
    );

    it('Should have a quality of 0 if the concert has passed', () => {
      const item = new Item('ConcertTicket', 0, 20, 'ConcertTicket');
      const gildedRose = new GildedRose([item]);

      gildedRose.updateEachItem();

      expect(item.quality).toBe(0);
      expect(item.expiresIn).toBe(-1);
    });

  });

  describe("Test for Intangible over time", () => {
    /*
    Item with type 'Intangible', 
    - Never has to be sold or decreases in Quality
    */
    it('Should not change quality or expiration date', () => {
      const item = new Item('Sulfuras', 5, 20, 'Intangible');
      const gildedRose = new GildedRose([item]);

      gildedRose.updateEachItem();

      expect(item.quality).toBe(20);
      expect(item.expiresIn).toBe(5);
    });
  });
});
