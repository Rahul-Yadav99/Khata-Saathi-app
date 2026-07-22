export const formatIndianCurrency = (amount: number = 0) =>
    `₹${new Intl.NumberFormat('en-IN').format(amount)}`;