### sort-all-in-one
***A lite, tinny package that is less than 20 KB in size.***

####Dependencies:

[momentjs](http://momentjs.com/)

####Overview:

A sorting package that gives the option to sort array of objects sort with several alogithms based on any key of that objects. currently we are offering the several algorithms
* **Bubble Sort**
* **Selection Sort**
* **Merge Sort**
* **Quick Sort**
* **Insertion Sort**

####Features:
* **Collection sorting (array of objects)**
* **Based on Any key**
* **Date type key based sorting**

####Installation:
```
npm install sort-all-in-one
```
####Usage:
```javascript
const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  }
];
```

If we want to sort the array of objects based on its key **name** or based on its key **year** 

```javascript
let opts = {
  algo: 'default',    // bubble,selection,insertion,quick,merge
  array: languages,
  key: 'year',
  orderBy: 'desc',      // asc,desc
  date: true,          // if the key is a date or false if not
},

const Sorting = new NpmSorting();
const sortedList = Sorting.sort(opts);
```
####Demo
```
Coming Soon
```

####Contributer
The original author is [Rafi Ud Daula Refat](https://github.com/onlyrefat) and [Mashuk Sadman](https://github.com/halumz)
