import * as axios from 'axios'
import { ALLEGRO_API_URL } from "../constants";
import { SearchOptions } from './searchInterfaces';

export const getSearchResults = (authToken: string, options: SearchOptions):Promise<any> => {
    const params: any = {}

    options.categoryId? params['category.id'] = options.categoryId : null
    options.phrase? params.phrase = options.phrase : null
    options.sellerId? params['seller.id'] = options.sellerId : null
    options.searchMode? params.searchMode = options.searchMode : null
    options.offset? params.offset = options.offset : null
    options.limit? params.limit = options.limit : null
    options.sort? params.sort = options.sort : null
    options.include? params.include = options.include : null
    if(options.filters){
        options.filters.map(filter => {
            params[filter.parameterId] = filter.value
        })
    }

    return new Promise((resolve, reject) => {
        axios.default({
            method: 'get',
            url: `${ALLEGRO_API_URL}/offers/listing`,
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: 'application/vnd.allegro.public.v1+json',
              'content-type': 'application/vnd.allegro.public.v1+json'
            },
            params: params
          }).then((response)=>{
            resolve(response.data)
          }).catch(function (error) {
            console.log(params)
            console.log(error)
            // reject(error)
          })
    });
  }