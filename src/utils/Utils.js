export const JSONifyFormData = (formData) => {
    const obj = {}
    for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
        obj[pair[0]] = pair[1]
    }
    return obj;
}

export const addHistory = (form) => {
    const oldForm = JSON.parse(JSON.stringify(form));
    let newForm;
    const addHistoryToChild = (child, history, idx) => {
        switch (child.type) {
            case 'array':
                child.children = child.children.map((nextChild, nextChildId) => addHistoryToChild(nextChild, history + 'a' + nextChildId + '-', null))
                return child
            case 'group':
                child.fields = child.fields.map((nextChild, nextChildId) => addHistoryToChild(nextChild, history, nextChildId))
                return child
            default:
                child.history = history + idx;
                return child
        }
    }
    newForm = addHistoryToChild(oldForm, '', 0)
    return newForm;
}

export const cloner = obj => JSON.parse(JSON.stringify(obj));

export const humanifyDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const monthString = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
    return monthString + ' ' + year;
}