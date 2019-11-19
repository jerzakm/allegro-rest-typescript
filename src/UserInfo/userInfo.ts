import { Rating, UserBasicInfo } from "./userInfoInterfaces";
import * as axios from 'axios'
import { ALLEGRO_API_URL } from "../constants";

export const getUserRatings = (authToken: string, userId: string, offset = 0, limit = 100):Promise<Rating[]> => {
    return new Promise((resolve, reject) => {
        axios.default({
            method: 'get',
            url: `${ALLEGRO_API_URL}/sale/user-ratings`,
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: 'application/vnd.allegro.public.v1+json',
              'content-type': 'application/vnd.allegro.public.v1+json'
            },
            params: {
                'user.id': userId,
                'offset': offset,
                'limit': limit
            }
          }).then((response)=>{
            resolve(response.data.ratings)
          }).catch(function (error) {
            reject(error)
          })
    });
}

export const getUserBasicInfo = (authToken: string):Promise<UserBasicInfo> => {
  return new Promise((resolve, reject) => {
      axios.default({
          method: 'get',
          url: `${ALLEGRO_API_URL}/me`,
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