import { compareAsc, compareDesc } from 'date-fns';

export const sortByDate = sortDir => (d1, d2) => {
    const sortFn = sortDir === 'asc' ? compareAsc : compareDesc;
    return sortFn(d1.date, d2.date);
}
export const mapToTableData = (data) => {
    return data.map((entry, idx) => {
        return {
            id: idx,
            dedupId: `${entry.timestamp}${entry.id}`,
            date: entry.timestamp,
            userid: entry.id,
            oldVal: entry.diff[0].oldValue,
            newVal: entry.diff[0].newValue
        }
    })
}
    
export const uniqify = (arr1, arr2) => {
    return [...new Set([...arr1, ...arr2])];
}

export const uniqueBy = (arr, key) => {
    const seen = [];
    const result = [];

    arr.forEach(elem => {
        if (!seen.includes(elem[key])) {
            seen.push(elem[key]);
            result.push(elem);
        }
    })
    return result;
}