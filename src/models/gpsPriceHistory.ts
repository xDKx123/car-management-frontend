interface GpsPriceHistory  {
    id: string
    amount: number,
    description: string,
    validFrom: Date,
    validTo: Date
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}

export type {GpsPriceHistory}