const isNumber = (value: unknown): boolean => {
    return !isNaN(Number((value as any).toString()))
}

const getDateFormat = (): string => {
    //Return slovenian date format
    return 'dd.MM.yyyy'
}

const roundToTwoDecimalPlaces = (value: number): number => {
    return Number(value.toFixed(2));
}


export {
    isNumber,
    roundToTwoDecimalPlaces
}

