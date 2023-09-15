export type RevenueData = {
    _id: string;
    line_of_business: string;
    revenue_type: string;
    product: string;
    year: number;
    month: string;
    acv: number;
    tcv: number;
    revenue: number;
}

// Define an array type for the data
export type RevenueDataArray = RevenueData[];

