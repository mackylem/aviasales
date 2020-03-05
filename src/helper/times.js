function getTimeFromMins(mins, duration) {
    let startHours = +mins.slice(0, 2);
    let startMinutes = +mins.slice(3, 5);
    let allMinutes = (startHours * 60 + startMinutes + duration);
    let hours = Math.trunc(allMinutes % 1440 / 60);
    let minutes = allMinutes % 60;
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return hours + ':' + minutes;
}
function getTime(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return hours + 'h ' + minutes + 'm ';
}
function allFromArr(item) {
    let line = '';
    if (item !== undefined) {
        for (let i = 0; i<item.length; i++) {
            line = line + item[i] +  ' ';
        }
    }
    return line;
}

export {getTime, allFromArr, getTimeFromMins}
