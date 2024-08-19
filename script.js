
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculateBtn').addEventListener('click', () => {
        const input = document.getElementById('ropeLengths').value;
        const lengths = input.split(',')
                             .map(Number)
                             .filter(n => !isNaN(n) && n > 0);  // Ensure only positive numbers are allowed

        if (lengths.length < 2) {
            alert('Please enter at least two valid positive rope lengths.');
            return;
        }

        const minCost = calculateMinCost(lengths);
        const formattedCost = formatNumber(minCost);
        document.getElementById('result').textContent = `Minimum cost to connect ropes: ${formattedCost}`;
    });
});

function calculateMinCost(arr) {
    const minHeap = new MinHeap(arr);
    let totalCost = 0;

    while (minHeap.size() > 1) {
        const first = minHeap.remove();
        const second = minHeap.remove();
        
        const cost = first + second;
        totalCost += cost;
        
        minHeap.insert(cost);
    }

    return totalCost;
}

function formatNumber(number) {
    if (typeof number.toLocaleString === 'function') {
        return number.toLocaleString();
    } else {
        // Fallback: manually add commas as thousand separators
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

class MinHeap {
    constructor(arr = []) {
        this.heap = this.buildHeap(arr);
    }

    buildHeap(arr) {
        let parentIdx = Math.floor((arr.length - 2) / 2);
        for (let currentIdx = parentIdx; currentIdx >= 0; currentIdx--) {
            this.siftDown(currentIdx, arr.length - 1, arr);
        }
        return arr;
    }

    siftDown(currentIdx, endIdx, heap) {
        let childOneIdx = currentIdx * 2 + 1;
        while (childOneIdx <= endIdx) {
            const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
            let idxToSwap;
            if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
                idxToSwap = childTwoIdx;
            } else {
                idxToSwap = childOneIdx;
            }
            if (heap[idxToSwap] < heap[currentIdx]) {
                [heap[idxToSwap], heap[currentIdx]] = [heap[currentIdx], heap[idxToSwap]];
                currentIdx = idxToSwap;
                childOneIdx = currentIdx * 2 + 1;
            } else {
                return;
            }
        }
    }

    siftUp(currentIdx, heap) {
        let parentIdx = Math.floor((currentIdx - 1) / 2);
        while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
            [heap[parentIdx], heap[currentIdx]] = [heap[currentIdx], heap[parentIdx]];
            currentIdx = parentIdx;
            parentIdx = Math.floor((currentIdx - 1) / 2);
        }
    }

    peek() {
        return this.heap[0];
    }

    remove() {
        [this.heap[0], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[0]];
        const removed = this.heap.pop();
        this.siftDown(0, this.heap.length - 1, this.heap);
        return removed;
    }

    insert(value) {
        this.heap.push(value);
        this.siftUp(this.heap.length - 1, this.heap);
    }

    size() {
        return this.heap.length;
    }
}