export interface IOfferFeeRequest {
    includeQuotingBundles: boolean,
    offer: IParametersForPreviewPrice
}

export interface IParametersForPreviewPrice{
    category: {
        id: number
    }
    unitPrice: number
    condition?: IItemCondition
    duration?: IOfferDuration
    hasAnyQuantity?: boolean
    numberofBigPhotos?: number
    numberOfPhotos?: number
    quantity?: number
    soldQuantity?: number
    type?: IOfferType
    bold?: boolean
    highlight?: boolean
    departmentPage?: boolean
    emphasized?: boolean
    emphasizedHighlightBoldPackage?: boolean
    multiVariant?: number
}

export enum IOfferType {
    shop, offer, advertisement
}

export enum IItemCondition{
    NEW, USED, OTHER
}

export enum IOfferDuration {
    PT72H, PT120H, PT168H, PT240H, PT336H, PT480H, PT720H
}

export interface IListingFee {
    fee: {
        amount: string
        currency: string
    }
    name: string
    type: string
}

export interface ICommissionFee {
    fee: {
        amount: string
        currency: string
    }
    name: string
    type: string
    cycleDuration: string
}

export interface IOfferFeePreview {
    commissions: ICommissionFee[]
    quotes: IListingFee[]
}