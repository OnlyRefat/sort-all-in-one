import moment from 'moment';

class AbnormalzSort {
  constructor(opts) {
    this.bubbleSort = this.bubbleSort.bind(this);
    this.selectionSort = this.selectionSort.bind(this);
    this.insertionSort = this.insertionSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.compare = this.compare.bind(this);
    this.quickSortSwap = this.quickSortSwap.bind(this);
    this.quickSortPartition = this.quickSortPartition.bind(this);
    this.merge = this.merge.bind(this);
    this.keyCheck = this.keyCheck.bind(this);
  }
  sort(opts) {
    if(opts.hasOwnProperty('algo')) {
      this.algo = opts.algo;
    } else {
      this.algo = 'default';
    }
    if (!this.keyCheck(opts)) {
      return false;
    }
    this.key = opts.key;
    this.orderBy = (opts.orderBy === 'desc') ? true : false;
    this.isDate = opts.date;
    this.comppareCount = 0;

    if (opts.array instanceof Array) {
      switch(this.algo) {
        case 'bubble':
          return this.bubbleSort( opts.array );
        case 'selection':
          return this.selectionSort( opts.array );
        case 'insertion':
          return this.insertionSort( opts.array );
        case 'quick':
          return this.quickSort( opts.array, 0, opts.array.length - 1 );
        case 'merge':
          return this.mergeSort( opts.array );
        default:
          return this.bubbleSort( opts.array );
      };
    }
  }
  keyCheck(opts) {
    if (!opts.hasOwnProperty('key') || !opts.array[0].hasOwnProperty(opts.key)) {
      return false;
    }
    return true;
  }
  compare(firstItem, secondItem) {
    if (this.isDate === true) {
      if (this.orderBy) {
        if (moment(firstItem[this.key]).isBefore(secondItem[this.key])) {
          this.comppareCount++;
          return true;
        }
      } else {
        if (moment(firstItem[this.key]).isAfter(secondItem[this.key])) {
          this.comppareCount++;
          return true;
        }
      }
      return false;
    }
    if (!this.orderBy && firstItem[this.key] > secondItem[this.key]) {
      this.comppareCount++;
      return true;
    }
    if (this.orderBy && firstItem[this.key] < secondItem[this.key]) {
      this.comppareCount++;
      return true;
    }
    return false;
  }
  bubbleSort(array)
  {
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < array.length - 1; i++) {
        if (this.compare(array[i], array[i + 1])) {
          const temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    return array;
  }
  selectionSort(array) {
    let minIdx, temp,
    len = array.length;
    for (let i = 0; i < len; i++) {
      minIdx = i;
      for (let j = i + 1; j < len; j++) {
        if (this.compare(array[j], array[minIdx])) {
          minIdx = j;
        }
      }
      temp = array[i];
      array[i] = array[minIdx];
      array[minIdx] = temp;
    }
    return array;
  }
  insertionSort(array) {
    let i, len = array.length, currentIndex, j;
    for (i = 1; i < len; i++) {
      currentIndex = array[i];
      j = i;
      while (j > 0 && this.compare(currentIndex, array[j - 1])) {
        array[j] = array[j - 1];
        j--;
      }
      array[j] = currentIndex;
    }
    return array;
  }
  quickSort(array, left, right) {
    let len = array.length,
    pivot,
    partitionIndex;
    if (left < right) {
      pivot = right;
      partitionIndex = this.quickSortPartition(array, pivot, left, right);
       //sort left and right
      this.quickSort(array, left, partitionIndex - 1);
      this.quickSort(array, partitionIndex + 1, right);
    }
    return array;
  }
  quickSortPartition(array, pivot, left, right){
    let pivotValue = array[pivot],
    partitionIndex = left;
    for (let i = left; i < right; i++) {
      if (this.compare(array[i], array[pivot])) {
        this.quickSortSwap(array, i, partitionIndex);
        partitionIndex++;
      }
    }
    
    (array, right, partitionIndex);
    return partitionIndex;
  }
  quickSortSwap(array, i, j){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  mergeSort(array) {
    let len = array.length;
    if (len < 2)
      return array;
    let mid = Math.floor(len/2),
      left = array.slice(0, mid),
      right = array.slice(mid);
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }
  merge(left, right) {
    const result = [];
    const lLen = left.length;
    const rLen = right.length;
    let l = 0;
    let r = 0;
    while (l < lLen && r < rLen) {
      if (this.compare(left[l], right[r])) {
        result.push(left[l++]);
      } else {
        result.push(right[r++]);
      }
    }
    return result.concat(left.slice(l)).concat(right.slice(r));
  }
  compareCount() {
    return this.comppareCount++;
  }
}

export default AbnormalzSort;
