interface ChildSeatPriceHistory {
    id: string,
    carType: string,
    amount: number,
    description: string,
    validFrom: Date,
    validTo: Date | null,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}

export type {
    ChildSeatPriceHistory
}