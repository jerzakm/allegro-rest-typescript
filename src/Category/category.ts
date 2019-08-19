import * as axios from 'axios'
import { ALLEGRO_API_URL } from '../constants';
import { Category } from './categoryInterfaces';
import { sleep } from '../util/sleep';
const fs = require('fs')

//Allegro main category id
export const ALLEGRO_TOP_CATEGORY_ID = '954b95b6-43cf-4104-8354-dea4d9b10ddf' 

export const getCategoryChildren = (authToken: string, parent: string):Promise<Category[]> => {
    return new Promise((resolve, reject) => {
        axios.default({
            method: 'get',
            url: `${ALLEGRO_API_URL}/sale/categories`,
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: 'application/vnd.allegro.public.v1+json',
              'content-type': 'application/vnd.allegro.public.v1+json'
            },
            params: {
                'parent.id': parent
            }
          }).then((response)=>{                        
            resolve(response.data.categories)
          }).catch(function (error) {
            reject(error)
          })
    });
}

export const getCategoryById = (authToken: string, categoryId: string):Promise<Category> => {
    return new Promise((resolve, reject) => {
        axios.default({
            method: 'get',
            url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}`,
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: 'application/vnd.allegro.public.v1+json',
              'content-type': 'application/vnd.allegro.public.v1+json'
            }
          }).then((response)=>{                        
            resolve(response.data)
          }).catch(function (error) {
            reject(error)
          })
    });
}

export const getCategoryParams = (authToken: string, categoryId: string):Promise<Category> => {
    return new Promise((resolve, reject) => {
        axios.default({
            method: 'get',
            url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}/parameters`,
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: 'application/vnd.allegro.public.v1+json',
              'content-type': 'application/vnd.allegro.public.v1+json'
            }
          }).then((response)=>{                        
            resolve(response.data)
          }).catch(function (error) {
            reject(error)
          })
    });
}

export const getCategoryTree = async (authToken: string) => {
    const categoryArray:Category[] = []
    const queue: string[] = [ALLEGRO_TOP_CATEGORY_ID]

    let counter = 0

    while(queue.length>0){        
        try {
            const data = await getCategoryChildren(authToken, queue[0])
            console.log(`${counter} ${queue[0]}`)
            queue.shift()
            counter ++
            for(const category of data){
                categoryArray.push(category)
                if(!category.leaf){
                    queue.push(category.id)
                }
            }
        }        
        catch(e){
            console.log(e)
        }
    }

    return categoryArray
}

export interface CategoryTree {
    category: Category,
    children: CategoryTree[]
}