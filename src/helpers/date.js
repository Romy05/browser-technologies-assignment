export function checkForValidDateString(dateString) {
    const [day, month, year] = dateString.split('-')
    const dateToCheck = new Date(year, month - 1, day);
    return dateToCheck.getFullYear() == year
            && dateToCheck.getMonth() == month - 1
            && dateToCheck.getDate() == day;
}