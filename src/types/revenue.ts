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
    S_no: number;
}

// Define an array type for the data
export type RevenueDataArray ={data:RevenueData[]} ;

// Get the chart data
export type MonthData = {
    January: number;
    February: number;
    March: number;
    April: number;
    May: number;
    June: number;
    July: number;
    August: number;
    September: number;
    October: number;
    November: number;
    December: number;
};


