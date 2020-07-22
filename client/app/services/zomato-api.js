import Service from '@ember/service';

export default class ZomatoApiService extends Service {

  apiKey = "d8a8946182b91cbfbc6fd430c683afa0";
  endPoint = "https://developers.zomato.com/api/v2.1/"

  constructor() {
    super(...arguments);
  }

  load(params) {    
    let response = fetch( this.endPoint + (params? params: ""), {
      method: "GET",
      headers: {
       "user-key": this.apiKey  
      }      
    })    
    return response;
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

  getRestaurants(city_id) {
    return this.load("collections?city_id="+city_id);
  }

}

