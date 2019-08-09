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

export const getCategoryTree = (authToken: string) => {
    return new Promise((resolve, reject) => {
        const categoryArray:Category[] = []

        let counter = 0

        iterateCategoryTree(ALLEGRO_TOP_CATEGORY_ID)

        async function iterateCategoryTree(id:string) {
            const catData = await getCategoryChildren(authToken, id)        
            counter++
            console.log(counter)
            await sleep(1000)
            categoryArray.push(...catData)

            catData.map(category => {
                if(!category.leaf){
                    iterateCategoryTree(category.id)
                }
            })
        }    
        resolve(categoryArray)
    });

    // const categoryArray:Category[] = []

    // let counter = 0

    // iterateCategoryTree(ALLEGRO_TOP_CATEGORY_ID)

    // async function iterateCategoryTree(id:string) {
    //     const catData = await getCategoryChildren(authToken, id)        
    //     counter++
    //     console.log(counter)
    //     await sleep(10)
    //     categoryArray.push(...catData)

    //     catData.map(category => {
    //         if(!category.leaf){
    //             iterateCategoryTree(category.id)
    //         }
    //     })
    // }

    // return categoryArray
}

export interface CategoryTree {
    category: Category,
    children: CategoryTree[]
}