import * as axios from 'axios'
import { getAuth } from './Auth/clientCredentials';
import { base64StringEncode } from './util/crypto';
import * as envLoad from 'dotenv'

//config
envLoad.config()

test()

async function test() {
  


  const cliendId = process.env.ALLEGRO_CLIENT_ID
  const clientSecret = process.env.ALLEGRO_CLIENT_SECRET
  
  const g = await getAuth(base64StringEncode(`${cliendId}:${clientSecret}`))
  
  console.log(g)  
}