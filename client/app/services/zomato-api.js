import Service from '@ember/service';

export default class ZomatoApiService extends Service {

  apiKey_1 = "d8a8946182b91cbfbc6fd430c683afa0";
  apiKey_2= "bb93008aecdf8fc00e41d2b636ed6885";
  endPoint = "https://developers.zomato.com/api/v2.1/"
  defaultCityId = "297"; //Adelaide

  constructor() {
    super(...arguments);
  }

  load(params) {    
    let response = fetch( this.endPoint + (params? params: ""), {
      method: "GET",
      headers: {
       "user-key": this.apiKey_2,
       'Content-Type': 'application/json'
      }
    })   
    return response;
  }

  getRestaurantsByCategoryAndCuisine(city_id,queryCategories,queryCuisines) {
    return this.load("search?city_id="+city_id+"&category="+queryCategories+"&cuisines="+queryCuisines)
  }

  searchCity(city) {
    return this.load("cities?q="+ city);
  }

  getCuisines(city_id) {  
    return this.load("cuisines?city_id=" + city_id);    
  }

  getCategories() {
    return this.load("categories");
  }

  getRestaurants(city_id, start, count) {    
    return this.load("search?city_id="+city_id+"&start="+start+"&count="+count);
  }

}

