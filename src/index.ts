const fs = require('fs')
import * as axios from 'axios'
import { getAuth } from './Auth/clientCredentials';
import { base64StringEncode } from './util/crypto';
import * as envLoad from 'dotenv'
import { getCategoryChildren, ALLEGRO_TOP_CATEGORY_ID, CategoryTree, getCategoryTree } from './Category/category';

//config
envLoad.config()

test()

async function test() {
  
  const cliendId = process.env.ALLEGRO_CLIENT_ID
  const clientSecret = process.env.ALLEGRO_CLIENT_SECRET
  
  const authToken = await getAuth(base64StringEncode(`${cliendId}:${clientSecret}`))
  const categoryTree = await getCategoryTree(authToken)  

  fs.writeFile("test.json", JSON.stringify(categoryTree), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
})
}