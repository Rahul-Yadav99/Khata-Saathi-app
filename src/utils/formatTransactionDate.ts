export const formatTransactionDate = (date: string) => {
    if (!date) return '';

    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(new Date(date));
};