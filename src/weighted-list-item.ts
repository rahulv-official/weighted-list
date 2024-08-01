export class WeightedListItem<T> {
    #obj: T;
    #weight: number;

    constructor(obj: T, weight: number) {
        this.#obj = obj;
        this.#weight = weight;
    }

    get obj(): T {
        return this.#obj;
    }

    get weight(): number {
        return this.#weight;
    }
}
