export const JSONifyFormData = (formData) => {
    const obj = {}
    for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
        obj[pair[0]] = pair[1]
    }
    return obj;
}

export const cloner = obj => JSON.parse(JSON.stringify(obj));

export const humanifyDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const monthString = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
    return monthString + ' ' + year;
}