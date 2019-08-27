import * as axios from 'axios'
import { ALLEGRO_API_URL } from '../constants';
import { IOfferFeePreview, IOfferFeeRequest } from './pricingInterfaces';
const fs = require('fs')

export const getFeePreview = (authToken: string, request: IOfferFeeRequest):Promise<IOfferFeePreview> => {
    return new Promise((resolve, reject) => {
        axios.default({
            method: 'post',
            url: `${ALLEGRO_API_URL}/pricing/fee-preview`,
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: 'application/vnd.allegro.public.v1+json',
              'content-type': 'application/vnd.allegro.public.v1+json'
            },
            data: JSON.stringify(request)
          }).then((response)=>{                        
            resolve(response.data)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
    });
}