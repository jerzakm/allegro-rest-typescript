export interface Rating {
    answer: {
        createdAt: string
        message: string
    }
    buyer: {
        id: string
        login: string
    }
    comment: string
    createdAt: string
    excludedFromAverageRates: boolean
    id: string
    order: {
        id: string
        offers: any[]  //TODO
    }
    rates: {
        delivery: number
        deliveryCost: number
        description: number
        service: number
    }
    recommended: boolean
    removal: {
        possibleTo: string
        request: {
            createdAt: string
            message: string
        }
    }
}

export interface UserBasicInfo {
    id: string
    login: string
    firstName: string
    lastName: string
    company: {
        name: string
    }
}