export function formatThresholdNumber(num: number) {
    if (num === null || num === undefined || isNaN(num)) {
        return 'N/A';
    }

    const absNum = Math.abs(num);
    const sign = Math.sign(num);

    if (absNum < 1000) {
        return num.toString();
    } else if (absNum < 10000) { // e.g., 1000 to 9999
        return num.toString(); // Keep as is, or you could do 1.5K etc. if desired
    } else if (absNum < 100000) { // e.g., 10,000 to 99,999 -> X0K+
        const val = Math.floor(absNum / 1000); // Get thousands part (e.g., 10 for 10,000)
        return `${sign < 0 ? '-' : ''}${val}K+`;
    } else if (absNum < 1000000) { // e.g., 100,000 to 999,999 -> X00K+
        const val = Math.floor(absNum / 1000); // Get thousands part (e.g., 100 for 100,000)
        return `${sign < 0 ? '-' : ''}${val}K+`;
    } else if (absNum < 10000000) { // e.g., 1,000,000 to 9,999,999 -> X.X M+ or X M+
        const val = (absNum / 1000000);
        return `${sign < 0 ? '-' : ''}${val.toFixed(1).replace(/\.0$/, '')}M+`;
    } else if (absNum < 100000000) { // e.g., 10,000,000 to 99,999,999 -> X0 M+
        const val = Math.floor(absNum / 1000000); // Get millions part (e.g., 10 for 10,000,000)
        return `${sign < 0 ? '-' : ''}${val}M+`;
    } else if (absNum < 1000000000) { // e.g., 100,000,000 to 999,999,999 -> X00 M+
        const val = Math.floor(absNum / 1000000);
        return `${sign < 0 ? '-' : ''}${val}M+`;
    } else if (absNum < 10000000000) { // e.g., 1,000,000,000 to 9,999,999,999 -> X.X B+ or X B+
        const val = (absNum / 1000000000);
        return `${sign < 0 ? '-' : ''}${val.toFixed(1).replace(/\.0$/, '')}B+`;
    } else { // For numbers 10,000,000,000 and above
        const val = Math.floor(absNum / 1000000000);
        return `${sign < 0 ? '-' : ''}${val}B+`;
    }
}

export function filterDuplicates(arr: Record<string, unknown>[], key: string) {
    const map = new Map();
    for (const obj of arr) {
        if (!map.has(obj[key])) {
            map.set(obj[key], obj); // Store the first object encountered for each key
        }
    }
    return Array.from(map.values()); // Or [...map.values()]
}