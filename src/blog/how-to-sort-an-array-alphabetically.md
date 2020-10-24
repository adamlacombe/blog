---
title: How to sort an array alphabetically
date: October 25, 2020
url: /blog/how-to-sort-an-array-alphabetically
author: Adam LaCombe
twitter: adamlacombe
description: Learn the best method for sorting an array alphabetically.
tags: Javascript, Performance
img: /assets/blog/images/how-to-sort-an-array-alphabetically/CoverImage.png
---

## String.localeCompare()
If you're working with a relatively small array, you could use [localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare).

```typescript
const arr = [
  {
    name: "Orange"
  },
  {
    name: "Banana"
  },
  {
    name: "Carrot"
  },
  {
    name: "Apple"
  }
];

// [{"name":"Apple"},{"name":"Banana"},{"name":"Carrot"},{"name":"Orange"}]
console.log(arr.sort((a, b) => a.name.localeCompare(b.name)));
```


## Intl.Collator()

If you're working with a large array, I would recommend using [Intl.Collator()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator) for performance reasons.

```typescript
const arr = [
  {
    name: "Orange"
  },
  {
    name: "Banana"
  },
  {
    name: "Carrot"
  },
  {
    name: "Apple"
  }
];
const collator = new Intl.Collator();

// [{"name":"Apple"},{"name":"Banana"},{"name":"Carrot"},{"name":"Orange"}]
console.log(arr.sort((a, b) => collator.compare(a.name, b.name)));
```


## Benchmarks

### 1,000 strings
Here is a [benchmark](https://jsben.ch/ir0YX) where we're sorting an array of 1,000 strings. As you can see, [Intl.Collator()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator) is 25% faster than [localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare).

<al-img src="/assets/blog/images/how-to-sort-an-array-alphabetically/1000-collator-faster.png" alt="Benchmark 1,000 strings"></al-img>


### 25 strings
Here is a [benchmark](https://jsben.ch/LJzX9) where we're sorting an array of only 25 strings. In this case, [localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) is 13% faster than [Intl.Collator()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator).

<al-img src="/assets/blog/images/how-to-sort-an-array-alphabetically/25-localeCompare-faster.png" alt="Benchmark 25 strings"></al-img>