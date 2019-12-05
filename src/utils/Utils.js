export const cloner = obj => {
    try {
        return JSON.parse(JSON.stringify(obj))
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const humanifyDate = (dateString) => {
    try {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const monthString = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
        return monthString + ' ' + year;
    } catch (error) {
        console.error(error);
        return '';
    }
}