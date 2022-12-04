
export function calculateTotalProductsCount(data) {
    let total = 0;
    for(let key in data) {
        for(let item of data[key]) {
            total += item.ProductsCount;
        }
    }
    return total;
}

export function calculateTotalPrice(data) {
    let total = 0;
    for(let key in data) {
        for(let item of data[key]) {
            total += item.TotalPrice;
        }
    }
    return total;
}