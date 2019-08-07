import * as axios from 'axios'
import { getAuth } from './Auth/clientCredentials';
import { base64StringEncode } from './util/crypto';

test()

async function test() {
  const cliendId = ''
  const clientSecret = ''
  
  const g = await getAuth(base64StringEncode(`${cliendId}:${clientSecret}`))
  
  console.log(g)  
}