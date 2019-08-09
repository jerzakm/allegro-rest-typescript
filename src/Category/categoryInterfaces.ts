export interface CategoryOptions {
    advertisement: boolean
    advertisementPriceOptional: boolean
    variantsByColorPatternAllowed: boolean
    offersWithProductPublicationEnabled: boolean
    productCreationEnabled: boolean    
}

export interface Category {
    id: string
    leaf: boolean
    name: string
    options: CategoryOptions
    parent: CategoryParent
}

export interface CategoryParent {
    id: string
}