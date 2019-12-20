const fs = require("fs");
import { getAuth } from "./Auth/clientCredentials";
import { base64StringEncode } from "./util/crypto";
import * as envLoad from "dotenv";
import {
  getCategoryChildren,
  ALLEGRO_TOP_CATEGORY_ID,
  CategoryTree,
  getCategoryTree,
  getCategoryById,
  getCategoryParams
} from "./Category/category";
import {
  IOfferFeeRequest,
  IOfferDuration,
  IOfferType
} from "./Pricing/pricingInterfaces";
import { getFeePreview } from "./Pricing/offerFeePreview";
import { getUserBasicInfo, getUserRatings } from "./UserInfo/userInfo";
import { Rating } from "./UserInfo/userInfoInterfaces";
import { getSearchResults } from "./Search/search";
import { Category } from "./Category/categoryInterfaces";

//config
envLoad.config();

fetchCategoryOffers();

async function test() {
  const token = "";

  const userInfo = await getUserBasicInfo(token);

  const ratingsList: Rating[] = [];

  let responseSize = 1;
  let offset = 0;
  let limit = 100;

  while (responseSize > 0) {
    const ratings = await getUserRatings(token, userInfo.id, offset, limit);
    console.log(offset);
    ratingsList.push(...ratings);
    offset += limit;
    responseSize = ratings.length;
  }

  fs.writeFile("ratingsList.json", JSON.stringify(ratingsList), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

async function fetchCategoryTree() {
  const cliendId = process.env.ALLEGRO_CLIENT_ID;
  const clientSecret = process.env.ALLEGRO_CLIENT_SECRET;

  const appToken = await getAuth(
    base64StringEncode(`${cliendId}:${clientSecret}`)
  );

  const categoryTree = await getCategoryTree(appToken)

  fs.writeFile("categoryTree.json", JSON.stringify(categoryTree), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

async function fetchCategoryOffers() {
  const json = fs.readFileSync("categoryTree.json", "utf8");
  const categoryTree: Category[] = JSON.parse(json)


  const leafs: string[] = []
  categoryTree.map(category => category.leaf? leafs.push(category.id):null)

  const cliendId = process.env.ALLEGRO_CLIENT_ID;
  const clientSecret = process.env.ALLEGRO_CLIENT_SECRET;

  const appToken = await getAuth(
    base64StringEncode(`${cliendId}:${clientSecret}`)
  );

  for(const leaf of leafs){
    if(!fs.existsSync(`offers/${leaf}.json`)){
      const limit = 60
      const responses = []
      let responseSize = limit;
      let offset = 0;

      while(responseSize==limit){
        offset = responses.length
        const result = await getSearchResults(appToken, {offset, categoryId:leaf, limit})
        responseSize = result.items.promoted.length+result.items.regular.length
        responses.push(...result.items.promoted)
        responses.push(...result.items.regular)
      }
      if(responses.length>0){
        fs.writeFile(`offers/${leaf}.json`, JSON.stringify(responses), function(err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        });
      }
      console.log(`found ${responses.length} offers for category ${leaf}`)
    } else {
      console.log(`file for ${leaf} already exists`)
    }
  }
}