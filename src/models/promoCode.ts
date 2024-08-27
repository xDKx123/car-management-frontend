import { contractId, promoCodeId } from "./id"

interface IPromoCode {
    id: promoCodeId,
    discount: number,
    code: string,
    isUsed: boolean,
    createdAt: Date,
    updatedAt: Date | null,
    validFrom: Date
    validUntil: Date
    usedAt: Date | null
    usedBy: contractId | null
    deletedAt: Date | null
}