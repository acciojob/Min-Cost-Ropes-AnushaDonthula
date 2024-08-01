document.getElementById('ropeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the input value and split it into an array of numbers
    const input = document.getElementById('ropes').value;
    const lengths = input.split(',').map(Number);
    
    // Calculate the minimum cost
    const minCost = calculateMinCost(lengths);
    
    // Display the result
    document.getElementById('result').textContent = `Minimum cost to connect ropes: ${minCost}`;
});

function calculateMinCost(arr) {
    // Create a min-heap from the array
    const heap = new MinHeap();
    arr.forEach(length => heap.insert(length));
    
    let totalCost = 0;
    
    while (heap.size() > 1) {
        // Remove the two shortest ropes
        const first = heap.extractMin();
        const second = heap.extractMin();
        
        // Calculate the cost to connect them
        const cost = first + second;
        
        // Add the new rope back into the heap
        heap.insert(cost);
        
        // Add the cost to the total cost
        totalCost += cost;
    }
    
    return totalCost;
}

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    size() {
        return this.heap.length;
    }
    
    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }
    
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        
        return min;
    }
    
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) break;
            
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    
    bubbleDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let swapIndex = null;
            
            if (leftChildIndex < length) {
                if (this.heap[leftChildIndex] < element) {
                    swapIndex = leftChildIndex;
                }
            }
            
            if (rightChildIndex < length) {
                if ((swapIndex === null && this.heap[rightChildIndex] < element) || 
                    (swapIndex !== null && this.heap[rightChildIndex] < this.heap[leftChildIndex])) {
                    swapIndex = rightChildIndex;
                }
            }
            
            if (swapIndex === null) break;
            
            [this.heap[index], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[index]];
            index = swapIndex;
        }
    }
}
