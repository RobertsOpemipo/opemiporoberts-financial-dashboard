export const calculateAverage = (data) => {
    const total = data.reduce((acc, curr) => acc + curr, 0);
    return total / data.length || 0; 
};


export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
};


export const isValidNumber = (num) => {
    return typeof num === 'number' && !isNaN(num);
};