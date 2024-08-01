import { IRNG } from "@rahulv.dev/rng";
import { WeightedListItem } from "./weighted-list-item";

export class WeightedList<T> {
    #items: WeightedListItem<T>[] = [];
    #totalWeight: number = 0;
    #rng: IRNG;

    constructor(rng: IRNG) {
        this.#rng = rng;
    }

    public add(item: T, weight: number): WeightedList<T> {
        if (weight < 0) {
            throw new Error("Weight must be greater than zero.");
        }

        this.#items.push(new WeightedListItem<T>(item, weight));
        this.#totalWeight += weight;

        return this;
    }

    public async pickRandom(): Promise<T> {
        return (await this.pickRandomEntry()).obj;
    }

    public async pickRandomEntry(): Promise<WeightedListItem<T>> {
        if (this.#items.length === 0) {
            throw new Error("This weighted list is empty.");
        }

        const randomValue = await this.#rng.next(this.#totalWeight);
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
