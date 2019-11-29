export const JSONifyFormData = (formData) => {
    const obj = {}
    for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
        obj[pair[0]] = pair[1]
    }
    console.log('TCL: JSONifyFormData -> obj', obj);
    return obj;
}