import * as axios from 'axios'
import { ALLEGRO_URL } from '../constants';

export const getAuth = (clientBase64: string):Promise<string> => {
  return new Promise((resolve,reject)=> {
    axios.default({
      method: 'post',
      url: `${ALLEGRO_URL}/auth/oauth/token?grant_type=client_credentials`,
      headers: {
        Authorization: `Basic ${clientBase64}`
      }
    }).then((response)=>{
      const res:string = response.data.access_token         
      resolve(res)
    }).catch(function (error) {
      reject(error)
    })
  })
}