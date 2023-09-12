import { GildedRose, Item } from './index';

describe('GildedRose', () => {
  describe('updateQuality', () => {
    it('should decrease quality and sellIn for normal items', () => {
      const normalItem = new Item('Normal Item', 5, 10);
      const gildedRose = new GildedRose([normalItem]);

      gildedRose.updateQuality();

      expect(normalItem.quality).toBe(9);
      expect(normalItem.sellIn).toBe(4);
    });

    it('should not decrease quality below 0', () => {
      const lowQualityItem = new Item('Low Quality Item', 5, 0);
      const gildedRose = new GildedRose([lowQualityItem]);

      gildedRose.updateQuality();

      expect(lowQualityItem.quality).toBe(0);
    });

    it('should increase quality for Aged Brie', () => {
      const agedBrie = new Item('Aged Brie', 5, 10);
      const gildedRose = new GildedRose([agedBrie]);

      gildedRose.updateQuality();

      expect(agedBrie.quality).toBe(11);
    });

    it('should not increase quality above 50 for Aged Brie', () => {
      const agedBrie = new Item('Aged Brie', 5, 50);
      const gildedRose = new GildedRose([agedBrie]);

      gildedRose.updateQuality();

      expect(agedBrie.quality).toBe(50);
    });

    it('should increase quality for Backstage passes', () => {
      const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10);
      const gildedRose = new GildedRose([backstagePasses]);

      gildedRose.updateQuality();

      expect(backstagePasses.quality).toBe(11);
    });

    it('should increase quality by 2 for Backstage passes when sellIn is 10 or less', () => {
      const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10);
      const gildedRose = new GildedRose([backstagePasses]);

      gildedRose.updateQuality();

      expect(backstagePasses.quality).toBe(12);
    });

    it('should increase quality by 3 for Backstage passes when sellIn is 5 or less', () => {
      const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10);
      const gildedRose = new GildedRose([backstagePasses]);

      gildedRose.updateQuality();

      expect(backstagePasses.quality).toBe(13);
    });

    it('should not increase quality above 50 for Backstage passes', () => {
      const backstagePasses = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49);
      const gildedRose = new GildedRose([backstagePasses]);

      gildedRose.updateQuality();

      expect(backstagePasses.quality).toBe(50);
    });

    it('should not change quality or sellIn for Sulfuras', () => {
      const sulfuras = new Item('Sulfuras, Hand of Ragnaros', 5, 80);
      const gildedRose = new GildedRose([sulfuras]);

      gildedRose.updateQuality();

      expect(sulfuras.quality).toBe(80);
      expect(sulfuras.sellIn).toBe(5);
    });
  });
});
