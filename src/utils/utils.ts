const isNumber = (value: unknown): boolean => {
    return !isNaN(Number((value as any).toString()))
}

const getDateFormat = (): string => {
    //Return slovenian date format
    return 'dd.MM.yyyy'
}


export {
    isNumber
}

