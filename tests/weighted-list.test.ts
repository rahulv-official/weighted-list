import { describe, it, expect, beforeEach } from 'vitest';
import { WeightedList } from "../src";
import { WeightedListItem } from "../src";

describe('WeightedList', () => {
    let weightedList: WeightedList<string>;

    beforeEach(() => {
        weightedList = new WeightedList<string>();
    });

    it('should add items with weight', () => {
        weightedList.add("item1", 5);
        weightedList.add("item2", 10);
        expect(weightedList.remove("item1")).toEqual(new WeightedListItem("item1", 5));
        expect(weightedList.remove("item2")).toEqual(new WeightedListItem("item2", 10));
    });

    it('should remove items by object', () => {
        weightedList.add("item1", 5);
        weightedList.add("item2", 10);
        const item1 = weightedList.remove("item1");
        expect(item1).toEqual(new WeightedListItem("item1", 5));
        expect(weightedList.remove("item1")).toBeNull();
    });

    it('should remove items by WeightedListItem', () => {
        weightedList.add("item1", 5);
        const item1 = new WeightedListItem("item1", 5);
        expect(weightedList.removeItems(item1)).toEqual(item1);
        expect(weightedList.removeItems(item1)).toBeNull();
    });

    it('should pick random item', async () => {
        weightedList.add("item1", 5);
        weightedList.add("item2", 10);
        const randomItem = weightedList.pickRandom();
        expect(["item1", "item2"]).toContain(randomItem);
    });

    it('should throw error if list is empty when picking random', async () => {
        expect(() => weightedList.pickRandomEntry()).toThrow("This weighted list is empty.");
    });

    it('should clear the list', () => {
        weightedList.add("item1", 5);
        weightedList.add("item2", 10);
        weightedList.clear();
        expect(weightedList.remove("item1")).toBeNull();
        expect(weightedList.remove("item2")).toBeNull();
    });
});
