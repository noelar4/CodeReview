/**
 * A priority queue stores a list of items but each can have a numeric priority value.
 * Items with a higher priority are dequeued before items with a lower priority.
 * Implemented as a hash of arrays where the hash keys are priority values.
 */
//CRC:- converting function to class for more readability and best coding practice
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue() {
        var _this = this;
        this.store = {}; // keys are priorities, values are arrays of elements
        this.count = 0;
        this.changePriority = function (value, newPriority) {
            var foundItem = false;
            // CRC:- changed foreach to for in loop since this.store is an object not an array
            var keys = Object.keys(_this.store);
            for (var a = 0; a < keys.length; a++) {
                var key = keys[a];
                var bucket = _this.store[key];
                for (var index = 0; index < bucket.length; index++) {
                    var item = bucket[index];
                    if (item === value) {
                        bucket.splice(index, 1); // remove the item
                        _this.enqueue(value, newPriority);
                        foundItem = true;
                        return false; // early exit from forEach
                    }
                }
                if (foundItem)
                    return false;
            }
        };
        this.enqueue.bind(this);
    }
    //enqueues an item
    // priority must be an integer (higher value has higher priority)
    //CRC:-enqueueing types for arguments
    PriorityQueue.prototype.enqueue = function (value, priority) {
        if (this.store[priority] == undefined)
            this.store[priority] = [];
        this.store[priority].push(value);
        this.count++;
    };
    // returns the oldestenqueueed value with the highest priority
    PriorityQueue.prototype.dequeue = function () {
        //CRC:- declare the maxkey and make sure the priority keys are mapped as a number as the default return is an array of string
        var maxKey = Math.max.apply(Math, Object.keys(this.store).map(Number));
        this.count--;
        return this.store[maxKey].shift();
    };
    PriorityQueue.prototype.get_all_priorities = function () {
        console.log(Object.keys(this.store).map(Number));
        return Object.keys(this.store).map(Number);
    };
    // iterates through all the queue elements in priority-then-FIFO order
    //CRC:- declare argument for callback so we know what to expect
    PriorityQueue.prototype.forEach = function (callback) {
        var _a, _b;
        //CRC:-enqueueing optional chaining for null or undefined checks
        var keys = (_b = (_a = Object.keys(this.store)) === null || _a === void 0 ? void 0 : _a.sort()) === null || _b === void 0 ? void 0 : _b.map(Number);
        for (var a = keys.length - 1; a >= 0; a--) {
            //CRC: Before : Cannot read property this.store[a].length because undefined, soenqueueed keys array
            for (var b = 0; b < this.store[keys[a]].length; b++) {
                //CRC : store object is getting referenced by key using a
                callback(this.store[keys[a]][b]);
            }
        }
    };
    PriorityQueue.prototype.length = function () {
        return this.count;
    };
    return PriorityQueue;
}());
//Test logics
var priorityQueue = new PriorityQueue();
priorityQueue.enqueue(80, 3);
priorityQueue.enqueue(20, 6);
priorityQueue.enqueue(30, 9);
console.log("Afterenqueueing values", priorityQueue.store);
priorityQueue.changePriority(80, 7);
console.log("After changing priority for value 80", priorityQueue.store);
priorityQueue.dequeue();
console.log("After dequeue", priorityQueue.store);
priorityQueue.forEach(function (value) {
    console.log("--- Value --- " + value);
});
