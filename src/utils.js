function toPascalCase (str) {
    let words = str.split(' ');
    words = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return words.join(' ');
}

function fDate (dateIn) {
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let date = new Date(dateIn);
    let dateFull = date.getDate() + 1 + ' de ' + monthNames[date.getMonth()] + ' del ' + date.getFullYear();
    return dateFull;
}

function checkEmail (str) {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
    if (regex.test(str) && str !== "") {
        return true
    } else return false
}


export {toPascalCase, fDate, checkEmail};