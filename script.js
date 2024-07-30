function mincost(arr) {
    if (!arr.length) return 0;

    // Convert the list into a min-heap
    const heap = arr.slice(); // Copy the array
    heap.sort((a, b) => a - b); // Simple way to simulate a min-heap

    let total_cost = 0;

    while (heap.length > 1) {
        // Extract the two smallest elements
        const first = heap.shift();
        const second = heap.shift();

        // Combine them
        const cost = first + second;
        total_cost += cost;

        // Push the combined rope back into the heap
        heap.push(cost);
        heap.sort((a, b) => a - b); // Maintain min-heap property
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