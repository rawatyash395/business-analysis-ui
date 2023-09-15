import { MonthData } from "../types/revenue";

export const sumOfACVDataset = (labels: Array<string>, data: Record<string, MonthData>, selectedProduct: string) => {
    const products = Object.keys(data)
    // Prepare an array of random colors for the datasets
    const randomColors = products.map(() => `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`);

    let datasets = []
    if (selectedProduct === 'all') {
        // Prepare the datasets based on unique products
        datasets = products.map((product, index) => {
            return {
                label: product,
                data: Object.values(data[product]),
                borderColor: randomColors[index],
                backgroundColor: `rgba(${randomColors[index]}, 0.5)`,
            };
        });
    } else {
        datasets = products.filter((productKey) => productKey === selectedProduct).map((product, index) => {
            return {
                label: product,
                data: Object.values(data[product]),
                borderColor: randomColors[index],
                backgroundColor: `rgba(${randomColors[index]}, 0.5)`,
            };
        });
    }


    // Final data structure
    return {
        labels,
        datasets,
    };
}