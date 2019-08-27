const fs = require('fs')
import * as axios from 'axios'
import { getAuth } from './Auth/clientCredentials';
import { base64StringEncode } from './util/crypto';
import * as envLoad from 'dotenv'
import { getCategoryChildren, ALLEGRO_TOP_CATEGORY_ID, CategoryTree, getCategoryTree, getCategoryById, getCategoryParams } from './Category/category';
import { IOfferFeeRequest, IOfferDuration, IOfferType } from './Pricing/pricingInterfaces';
import { getFeePreview } from './Pricing/offerFeePreview';

//config
envLoad.config()

test()

async function test() {
  
  const cliendId = process.env.ALLEGRO_CLIENT_ID
  const clientSecret = process.env.ALLEGRO_CLIENT_SECRET
  
  const appToken = await getAuth(base64StringEncode(`${cliendId}:${clientSecret}`))

  
  const feeReq: IOfferFeeRequest = {
    includeQuotingBundles: false,
    offer: {
      category: {
        id: 257183
      },
      unitPrice: 100,
      duration: IOfferDuration.PT720H,
      type: IOfferType.shop
    }
  }

  const response = await getFeePreview(appToken, feeReq)
  console.log(response)

  // const testString = JSON.stringify(categoryTree)
  // fs.writeFile("test.json", testString, function(err) {
  //   if(err) {
  //       return console.log(err);
  //   }

  //   console.log("The file was saved!");
  //   })
}