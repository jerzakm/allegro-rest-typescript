const fs = require('fs')
import { getAuth } from './Auth/clientCredentials';
import { base64StringEncode } from './util/crypto';
import * as envLoad from 'dotenv'
import { getCategoryChildren, ALLEGRO_TOP_CATEGORY_ID, CategoryTree, getCategoryTree, getCategoryById, getCategoryParams } from './Category/category';
import { IOfferFeeRequest, IOfferDuration, IOfferType } from './Pricing/pricingInterfaces';
import { getFeePreview } from './Pricing/offerFeePreview';
import { getUserBasicInfo, getUserRatings } from './UserInfo/userInfo';
import { Rating } from './UserInfo/userInfoInterfaces';

//config
envLoad.config()

test()

async function test() {
  const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzQxOTAxMzEsInVzZXJfbmFtZSI6IjkxMTgwNjkiLCJqdGkiOiIxNDVhOGEwZS1jYjQ4LTQ4OGYtYjE5MC0xZmZkMjYyYTkxZWYiLCJjbGllbnRfaWQiOiI1MGEwZDE5Y2FkOWE0MWVmOThjMjM1MzlhZmVlZjViZCIsInNjb3BlIjpbImFsbGVncm9fYXBpIl19.RybalpwWvUvOfNy3BmHqROiwE4wHpEsJ_cz7xe8TYtJstjwpa9wJxXW4_jfbmw_i10k_bnTCTJoehfP26uLzvp0rXTE-xrxzudFkURQoUkbGOJ1upcPQyE4x9Obve6YrBiQRjydGUYupt63hpuCVQ6usib6Abwi_uvjM9ttEdlqRALFE_bc5jHSOlNYdVTfQXa8GAWOXFHx81pMXVtaoX3_R3EgM7HFN8OPcHTydLmllWJq1elOVC4yrSa33-DNjolQFys2IvElQRvM5k5ljaJ2TvP1befS9xVDhwf1oV-s87NQGsSUhbmIdpU2G7TDm2KVyZyf_3DCspIyZyvFt6Q`

  const userInfo = await getUserBasicInfo(token)

  const ratingsList: Rating[] = []

  let responseSize = 1
  let offset = 0
  let limit = 100

  while(responseSize>0){
    const ratings = await getUserRatings(token, userInfo.id, offset, limit)
    console.log(offset)
    ratingsList.push(...ratings)
    offset+=limit
    responseSize = ratings.length
  }

  fs.writeFile("ratingsList.json", JSON.stringify(ratingsList), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
    })

}

async function testFeePreview() {
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