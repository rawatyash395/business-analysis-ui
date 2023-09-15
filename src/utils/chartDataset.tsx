import { RevenueDataArray } from "../types/revenue";

export const sumOfACVDataset = (labels: Array<string>, data: RevenueDataArray) => {
    // Extract unique product names from the original data
    const uniqueProducts = [...new Set(data.map(item => item.product))];

    // Prepare an array of random colors for the datasets
    const randomColors = uniqueProducts.map(() => `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`);

    // Prepare the datasets based on unique products
    const datasets = uniqueProducts.map((product, index) => {
        const productData = data.filter(item => item.product === product);
        const productRevenueData = labels.map(month => {
            const matchingEntry = productData.find(item => item.month === month);
            return matchingEntry ? matchingEntry.revenue : 0;
        });


        return {
            label: product,
            data: productRevenueData,
            borderColor: randomColors[index],
            backgroundColor: `rgba(${randomColors[index]}, 0.5)`,
        };
    });

    // Final data structure
    return {
        labels,
        datasets,
    };
}