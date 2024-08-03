# @rahulv.dev/weighted-list

## Description

`@rahulv.dev/weighted-list` is a TypeScript library that provides a weighted list implementation. This allows you to add items with associated weights and then randomly select items based on those weights. The library is ideal for scenarios where you need to randomly pick elements with different probabilities.

This package depends on `@rahulv.dev/rng` for secure and cryptographic random number generation.

## Installation

Install both the weighted list and the RNG package:

```bash
npm install @rahulv.dev/weighted-list @rahulv.dev/rng
```

## Usage

### Importing the Packages

First, import the `WeightedList`, `WeightedListItem`, and `RNG` classes into your TypeScript or JavaScript project:

```typescript
import { WeightedList } from "@rahulv.dev/weighted-list";
import { RNG } from "@rahulv.dev/rng";
```

### Setting Up RNG

Initialize the RNG before using it in the `WeightedList`:

```typescript
const rng = RNG.init();
const weightedList = new WeightedList<string>(rng);
```

### Adding and Picking Items

You can add items with specific weights and pick them randomly:

```typescript
weightedList.add("apple", 10);
weightedList.add("banana", 20);
const randomItem = await weightedList.pickRandom();
console.log(randomItem); // Likely 'banana'
```

### Removing Items

You can remove items either by their object or by their `WeightedListItem`:

```typescript
const removedItem = weightedList.remove("apple");
const item = new WeightedListItem("banana", 20);
const removedEntry = weightedList.removeItems(item);
```

### Clearing the List

Clear all items from the list:

```typescript
weightedList.clear();
```

## API Reference

### WeightedList<T>

| Method                                                                | Description                                                                                                    |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `constructor(rng: IRNG)`                                              | Creates a new `WeightedList` instance with a random number generator. Will initialise own RNG if not provided. |
| `add(item: T, weight: number): WeightedList<T>`                       | Adds an item with a specified weight to the list.                                                              |
| `pickRandom(): T`                                                     | Picks a random item based on the weights.                                                                      |
| `pickRandomEntry(): WeightedListItem<T>`                              | Picks a random entry (item and weight).                                                                        |
| `remove(item: T): WeightedListItem<T> \| null`                        | Removes an item by its object value and returns the removed entry.                                             |
| `removeItems(item: WeightedListItem<T>): WeightedListItem<T> \| null` | Removes an item by its `WeightedListItem` instance.                                                            |
| `clear(): void`                                                       | Clears all items from the list.                                                                                |

### WeightedListItem<T>

| Property         | Description                            |
| ---------------- | -------------------------------------- |
| `obj: T`         | The object stored in the list item.    |
| `weight: number` | The weight associated with the object. |

## Dependency: `@rahulv.dev/rng`

This package requires `@rahulv.dev/rng`, a secure random number generator that uses the native Crypto API for generating cryptographic random numbers. You can generate random numbers within specific ranges or for multiple values at once.

Refer to the [@rahulv.dev/rng documentation](https://www.npmjs.com/package/@rahulv.dev/rng) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/rahulv-official/weighted-list/blob/main/LICENSE) file for details.

## Issues

If you encounter any issues, feel free to open a ticket on the [issues page](https://github.com/rahulv-official/weighted-list/issues).

## Author

Rahul Vashishtha – [https://rahulv.dev](https://rahulv.dev)
