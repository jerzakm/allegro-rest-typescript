import * as axios from 'axios'
import { getAuth } from './Auth/clientCredentials';
import { base64StringEncode } from './util/crypto';
import * as envLoad from 'dotenv'
import { getCategoryChildren, ALLEGRO_TOP_CATEGORY_ID } from './Category/category';

//config
envLoad.config()

test()

async function test() {
  


  const cliendId = process.env.ALLEGRO_CLIENT_ID
  const clientSecret = process.env.ALLEGRO_CLIENT_SECRET
  
  const authToken = await getAuth(base64StringEncode(`${cliendId}:${clientSecret}`))
  const res = await getCategoryChildren(authToken, ALLEGRO_TOP_CATEGORY_ID)
  console.log(res)  
}