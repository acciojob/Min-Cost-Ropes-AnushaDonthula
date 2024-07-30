class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.heapifyDown(0);
        }
        return min;
    }

    heapifyUp(index) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (index > 0 && this.heap[index] < this.heap[parentIndex]) {
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            this.heapifyUp(parentIndex);
        }
    }

    heapifyDown(index) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallest = index;

        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallest]) {
            smallest = leftChildIndex;
        }

        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallest]) {
            smallest = rightChildIndex;
        }

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.heapifyDown(smallest);
        }
    }
}

function mincost(arr) {
    if (arr.length === 0) return 0;

    const heap = new MinHeap();
    arr.forEach(length => heap.insert(length));

    let total_cost = 0;

    while (heap.heap.length > 1) {
        const first = heap.extractMin();
        const second = heap.extractMin();

        const cost = first + second;
        total_cost += cost;

        heap.insert(cost);
    }

    return total_cost;
}

function calculateMinCost() {
    const input = document.getElementById('ropeLengths').value;
    const lengths = input.split(',').map(Number).filter(n => !isNaN(n));

    if (lengths.length === 0) {
        document.getElementById('result').innerText = 'Please enter valid lengths.';
        return;
    }

    const result = mincost(lengths);
    document.getElementById('result').innerText = `Minimum cost to connect ropes: ${result}`;
}

function displayExample() {
    const exampleLengths = [8, 4, 6, 12, 10];
    const result = mincost(exampleLengths);
    document.getElementById('exampleResult').innerText = `Result for example input [8, 4, 6, 12, 10]: ${result}`;
}