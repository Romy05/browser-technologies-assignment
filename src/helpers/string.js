export function seperateCharactersByDot(string) {
    const normalizedString = string.split('.').join('');
    const capsString =  normalizedString.toUpperCase();

    return capsString
            .split('')
            .join('.')
            .concat('.');
}