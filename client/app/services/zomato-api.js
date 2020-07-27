import Service from '@ember/service';

export default class ZomatoApiService extends Service {

  endPoint = "http://zm-mn.us-east-2.elasticbeanstalk.com/";
  //endPoint = "http://localhost:3000/"; If running server locally.
  defaultCityId = "297"; //Adelaide

  constructor() {
    super(...arguments);
  }

  load(params) {    
    let response = fetch( this.endPoint + (params? params: ""), {
      method: "GET",
      headers: {
       'Content-Type': 'application/json'
      }
    })   
    return response;
  }

  getRestaurantsByCategoryAndCuisine(city_id,queryCategories,queryCuisines) {
    let params = "search?city_id="+city_id;
    params += queryCategories.length? "&category="+queryCategories.join("%2C") : "";
    params += queryCuisines.length? "&cuisines="+queryCuisines.join("%2C"): "";
    console.log(params);
    return this.load("search?city_id="+city_id+"&category="+queryCategories+"&cuisines="+queryCuisines);
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