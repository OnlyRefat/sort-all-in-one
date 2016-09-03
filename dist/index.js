'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbnormalzSort = function () {
  function AbnormalzSort(opts) {
    _classCallCheck(this, AbnormalzSort);

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

  _createClass(AbnormalzSort, [{
    key: 'sort',
    value: function sort(opts) {
      if (opts.hasOwnProperty('algo')) {
        this.algo = opts.algo;
      } else {
        this.algo = 'default';
      }
      if (!this.keyCheck(opts)) {
        return false;
      }
      this.key = opts.key;
      this.orderBy = opts.orderBy === 'desc' ? true : false;
      this.isDate = opts.date;
      this.comppareCount = 0;

      if (opts.array instanceof Array) {
        switch (this.algo) {
          case 'bubble':
            return this.bubbleSort(opts.array);
          case 'selection':
            return this.selectionSort(opts.array);
          case 'insertion':
            return this.insertionSort(opts.array);
          case 'quick':
            return this.quickSort(opts.array, 0, opts.array.length - 1);
          case 'merge':
            return this.mergeSort(opts.array);
          default:
            return this.bubbleSort(opts.array);
        };
      }
    }
  }, {
    key: 'keyCheck',
    value: function keyCheck(opts) {
      if (!opts.hasOwnProperty('key') || !opts.array[0].hasOwnProperty(opts.key)) {
        return false;
      }
      return true;
    }
  }, {
    key: 'compare',
    value: function compare(firstItem, secondItem) {
      if (this.isDate === true) {
        if (this.orderBy) {
          if ((0, _moment2.default)(firstItem[this.key]).isBefore(secondItem[this.key])) {
            this.comppareCount++;
            return true;
          }
        } else {
          if ((0, _moment2.default)(firstItem[this.key]).isAfter(secondItem[this.key])) {
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
  }, {
    key: 'bubbleSort',
    value: function bubbleSort(array) {
      var swapped = void 0;
      do {
        swapped = false;
        for (var i = 0; i < array.length - 1; i++) {
          if (this.compare(array[i], array[i + 1])) {
            var temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
            swapped = true;
          }
        }
      } while (swapped);
      return array;
    }
  }, {
    key: 'selectionSort',
    value: function selectionSort(array) {
      var minIdx = void 0,
          temp = void 0,
          len = array.length;
      for (var i = 0; i < len; i++) {
        minIdx = i;
        for (var j = i + 1; j < len; j++) {
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
  }, {
    key: 'insertionSort',
    value: function insertionSort(array) {
      var i = void 0,
          len = array.length,
          currentIndex = void 0,
          j = void 0;
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
  }, {
    key: 'quickSort',
    value: function quickSort(array, left, right) {
      var len = array.length,
          pivot = void 0,
          partitionIndex = void 0;
      if (left < right) {
        pivot = right;
        partitionIndex = this.quickSortPartition(array, pivot, left, right);
        //sort left and right
        this.quickSort(array, left, partitionIndex - 1);
        this.quickSort(array, partitionIndex + 1, right);
      }
      return array;
    }
  }, {
    key: 'quickSortPartition',
    value: function quickSortPartition(array, pivot, left, right) {
      var pivotValue = array[pivot],
          partitionIndex = left;
      for (var i = left; i < right; i++) {
        if (this.compare(array[i], array[pivot])) {
          this.quickSortSwap(array, i, partitionIndex);
          partitionIndex++;
        }
      }

      array, right, partitionIndex;
      return partitionIndex;
    }
  }, {
    key: 'quickSortSwap',
    value: function quickSortSwap(array, i, j) {
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }, {
    key: 'mergeSort',
    value: function mergeSort(array) {
      var len = array.length;
      if (len < 2) return array;
      var mid = Math.floor(len / 2),
          left = array.slice(0, mid),
          right = array.slice(mid);
      return this.merge(this.mergeSort(left), this.mergeSort(right));
    }
  }, {
    key: 'merge',
    value: function merge(left, right) {
      var result = [];
      var lLen = left.length;
      var rLen = right.length;
      var l = 0;
      var r = 0;
      while (l < lLen && r < rLen) {
        if (this.compare(left[l], right[r])) {
          result.push(left[l++]);
        } else {
          result.push(right[r++]);
        }
      }
      return result.concat(left.slice(l)).concat(right.slice(r));
    }
  }, {
    key: 'compareCount',
    value: function compareCount() {
      return this.comppareCount++;
    }
  }]);

  return AbnormalzSort;
}();

exports.default = AbnormalzSort;