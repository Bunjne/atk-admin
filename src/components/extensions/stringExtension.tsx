export function toPascalCase(text: string | null | undefined) {
    const lowerText = text?.toLocaleLowerCase()
    return `${lowerText}`
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w*)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
        )
        .replace(new RegExp(/\w/), s => s.toUpperCase());
}

export function toTwoDigitsWithComma(input: number) {
    return input.toLocaleString(undefined, { maximumFractionDigits: 2 });
}