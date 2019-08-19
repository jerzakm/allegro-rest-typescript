export interface SearchOptions {
    categoryId?: string
    phrase?: string
    sellerID?: string
    searchMode?: SearchMode    
    offset: number
    limit?: number
    sort?: SearchSort
    include?: string
    filters?: SearchFilter[]

}

export enum SearchMode {
    REGULAR, DESCRIPTIONS, CLOSED
}

export enum SearchSort {
    RELEVANCE = 'relevance',
    PRICE_ASC = '+price',
    PRICE_DESC = '-price',
    DELIVERY_PRICE_ASC = '+withDeliveryPrice',
    DELIVERY_PRICE_DESC = '-withDeliveryPrice',
    POPULARITY_DESC = '-popularity',
    END_TIME_ASC = '+endTime',
    START_TIME_DESC = '-startTime'
}

export interface SearchFilter {
    parameterId: string
    value: string
}