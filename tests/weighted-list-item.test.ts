import { describe, expect, it } from "vitest";
import { WeightedListItem } from "../src";

describe('WeightedListItem', () => {
    it('should store item and weight', () => {
        const item = new WeightedListItem("item1", 5);
        expect(item.obj).toBe("item1");
        expect(item.weight).toBe(5);
    });
});