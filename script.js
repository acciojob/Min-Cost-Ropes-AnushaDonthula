document.getElementById('calculateBtn').addEventListener('click', () => {
    const input = document.getElementById('ropeLengths').value;
    const lengths = input.split(',').map(Number).filter(n => !isNaN(n));
    
    if (lengths.length === 0) {
        alert('Please enter valid rope lengths.');
        return;
    }

    const minCost = calculateMinCost(lengths);
    document.getElementById('result').textContent = `Minimum cost to connect ropes: ${minCost}`;
});

function calculateMinCost(arr) {
    const heap = arr.slice();
    heap.sort((a, b) => a - b);
    
    let totalCost = 0;
    
    while (heap.length > 1) {
        const first = heap.shift();
        const second = heap.shift();
        
        const cost = first + second;
        totalCost += cost;
        
        let i = 0;
        while (i < heap.length && heap[i] < cost) i++;
        heap.splice(i, 0, cost);
    }
    
    return totalCost;
}