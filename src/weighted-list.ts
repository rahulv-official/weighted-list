import { IRNG, RNG } from "@rahulv.dev/rng";
import { WeightedListItem } from "./weighted-list-item";

export class WeightedList<T> {
    #items: WeightedListItem<T>[] = [];
    #totalWeight: number = 0;
    #rng: IRNG;

    constructor(rng?: IRNG) {
        if(rng) {
            this.#rng = rng;
        }
        else {
            this.#rng = new RNG();
        }
    }

    public add(item: T, weight: number): WeightedList<T> {
        if (weight < 0) {
            throw new Error("Weight must be greater than zero.");
        }

        this.#items.push(new WeightedListItem<T>(item, weight));
        this.#totalWeight += weight;

        return this;
    }

    public pickRandom(): T {
        return this.pickRandomEntry().obj;
    }

    public pickRandomEntry(): WeightedListItem<T> {
        if (this.#items.length === 0) {
            throw new Error("This weighted list is empty.");
        }

        const randomValue = this.#rng.next(this.#totalWeight);
        let cumulativeWeight = 0;

        for (const item of this.#items) {
            cumulativeWeight += item.weight;
            if (randomValue < cumulativeWeight) {
                return item;
            }
        }

        // This point should never be reached if the list is correctly maintained
        throw new Error("Failed to select a random entry.");
    }

    public clear(): void {
        this.#items = [];
        this.#totalWeight = 0;
    }

    public remove(item: T): WeightedListItem<T> | null {
        const index = this.#items.findIndex(entry => entry.obj === item);

        if (index === -1) {
            return null; // Item not found
        }

        const removedEntry = this.#items.splice(index, 1)[0];
        this.#totalWeight -= removedEntry.weight;

        return removedEntry;
    }

    public removeItems(item: WeightedListItem<T>): WeightedListItem<T> | null {
        return this.remove(item.obj);
    }
}
