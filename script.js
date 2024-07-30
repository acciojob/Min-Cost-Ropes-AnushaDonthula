function mincost(ropes) {
    if (ropes.length === 0) return 0;

    // Min-Heap implementation
    function MinHeap() {
        this.heap = [];
    }
    MinHeap.prototype.insert = function(val) {
        this.heap.push(val);
        this.heap.sort((a, b) => a - b);
    };
    MinHeap.prototype.remove = function() {
        return this.heap.shift();
    };
    MinHeap.prototype.size = function() {
        return this.heap.length;
    };

    const minHeap = new MinHeap();
    for (let length of ropes) {
        minHeap.insert(length);
    }

    let totalCost = 0;

    while (minHeap.size() > 1) {
        let first = minHeap.remove();
        let second = minHeap.remove();
        let cost = first + second;
        totalCost += cost;
        minHeap.insert(cost);
    }

    return totalCost;
}

// Function to handle button click and display the result
function calculateMinCost() {
    const input = document.getElementById('ropeLengths').value;
    const ropeLengths = input.split(',').map(Number);
    const result = mincost(ropeLengths);
    document.getElementById('result').textContent = `Minimum Cost: ${result}`;
}
