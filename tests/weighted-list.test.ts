import { describe, it, expect, beforeEach } from 'vitest';
import { IRNG, RNG } from "@rahulv.dev/rng";
import { WeightedList } from "../src";
import { WeightedListItem } from "../src";

class MockRNG implements IRNG {
    nextRange(ranges: number[]): Promise<number[]> {
        throw new Error('Method not implemented.');
    }
    next(max: number): Promise<number> {
        return Promise.resolve(Math.floor(Math.random() * max));
    }
}

describe('WeightedList', () => {
    let rng: IRNG;
    let weightedList: WeightedList<string>;

    beforeEach(() => {
        rng = new MockRNG();
        weightedList = new WeightedList<string>(rng);
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
        const randomItem = await weightedList.pickRandom();
        expect(["item1", "item2"]).toContain(randomItem);
    });

    it('should throw error if list is empty when picking random', async () => {
        await expect(weightedList.pickRandomEntry()).rejects.toThrow("This weighted list is empty.");
    });

    it('should clear the list', () => {
        weightedList.add("item1", 5);
        weightedList.add("item2", 10);
        weightedList.clear();
        expect(weightedList.remove("item1")).toBeNull();
        expect(weightedList.remove("item2")).toBeNull();
    });
});
