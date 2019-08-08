export interface CategoryOptions {
    advertisement: boolean
    advertisementPriceOptional: boolean
    variantsByColorPatternAllowed: boolean
    offersWithProductPublicationEnabled: boolean
    productCreationEnabled: boolean    
}

export interface Category {
    id: number
    leaf: boolean
    name: string
    options: CategoryOptions
    parent: CategoryParent
}

export interface CategoryParent {
    id: number
}