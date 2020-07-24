import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {set,action } from '@ember/object';
import {inject as service} from '@ember/service';
import {data} from '../utils/data';
import {constants} from '../utils/constants';
import {computed} from '@ember/object';
export default class MainViewComponent extends Component {

  @tracked
  selectedCityId;

  @tracked
  cuisines = [];

  @tracked
  categories = [];

  @tracked
  results = [];

  @tracked
  resultsList=[];

  @tracked
  costRange = {
    [constants.MINIMUM]:0,
    [constants.MAXIMUM]:500
  }

  @tracked
  ratingRange = {
    [constants.MINIMUM]:0,
    [constants.MAXIMUM]:5
  }

  @tracked
  costValues = [10,200]

  @tracked
  ratingValues = [3,5];

  @tracked
  selectedRatingRange = {
    [constants.MINIMUM]:this.ratingValues[0],
    [constants.MAXIMUM]:this.ratingValues[1]
  };

  @tracked
  selectedCostRange = {
    [constants.MINIMUM]:this.costValues[0],
    [constants.MAXIMUM]:this.costValues[1]
  };

  @tracked
  selectedRestaurant = false

  @service("zomato-api") api;

  constructor(owner,args) {
    super(owner,args);    
    this.init();
  }

  init() {
    this.selectedCityId = data.cityId;
    this.fetchCategories();
    this.fetchCuisines();
    this.getRestaurantsInTheCity();
  }

  fetchCuisines() {
    this.api.getCuisines(this.selectedCityId)
    .then(response =>  response.json())
    .then(results => {
      if(!results.cuisines) throw new Error("Failed to fetch cusine data");
      results = results.cuisines.map(c => c.cuisine);
      //Only display those cuisines which are listed in ..utils/data
      this.cuisines = results.filter(c => data.cuisines.includes(c.cuisine_name));       
      //add a new property called "selected" on  each cuisine to bind to checkbox
      this.cuisines.forEach(c => c[constants.SELECTED] =false);
    }).catch(e=> console.log(e));
  }

  fetchCategories() {
    this.api.getCategories()
    .then(response =>  response.json())
    .then(results => {
        if(!results.categories) {
          throw new Error("Failed to fetch categories data");
        }
        results = results.categories.map(c => c.categories);
        //Only include those categories which are listed in ..utils/data
        this.categories = results.filter(c => data.categories.includes(c.name))
        //Add property "selected" on each cuisine to bind to checkbox
        this.categories.forEach(c => c[constants.SELECTED] =false)
    });
  }  

  getRestaurantsByCategoryAndCuisine() {    
    /*Zomato-API sends 20 results at a time. Since there is no pagination for now,
    will fetch maximum 20 results that fit to the selected category and cuisines.*/
    let queryCuisines = this.cuisines.filter(c => c.selected===true).map(c=>c.cuisine_id).join("%2C");
    let queryCategories = this.categories.filter(c => c.selected === true).map(c => c.id).join("%2C");
    let cityId = this.selectedCityId;
    this.results = [];
    this.resultsList = [];
    this.api.getRestaurantsByCategoryAndCuisine(cityId,queryCategories,queryCuisines)
      .then(response => response.json())
      .then(results => {
        if(!results.restaurants) {
          throw new Error("Failed to fetch restaurants data");
        } 
        this.results = results.restaurants.map(r=>r.restaurant);
        this.resultsList = this.results;
        this.applyRatingAndCostFilters();
      }).catch(e => console.log(e));
  }

  getRestaurantsInTheCity() {
    // Set the maximum result count to 0 since there is no pagination in the mockup.
    let start = 0, count = 20;
    this.api.getRestaurants(this.selectedCityId,start,count)
    .then(response => response.json())
    .then(results => {
      this.results = results.restaurants.map(r=>r.restaurant);
      this.resultsList = this.results;
      console.log(this.results);
      this.applyRatingAndCostFilters();
    }).catch(e => console.log(e));
  }

  @action
  showRestaurantDetail(value) {
    this.selectedRestaurant = value;
  }

  @action
  ratingSliderChange(value) {
    this.selectedRatingRange = {[constants.MINIMUM]:value[0],[constants.MAXIMUM]:value[1]};
    this.applyRatingAndCostFilters();
  }

  @action
  selectCuisine(index,value) {
    set(this.cuisines[index],constants.SELECTED,value);
    this.getRestaurantsByCategoryAndCuisine();
  }

  @action
  selectCategory(index,value) {
    set(this.categories[index],constants.SELECTED,value);
    this.getRestaurantsByCategoryAndCuisine();
  }

  costSliderChange(value) {
    this.selectedCostRange = {[constants.MINIMUM]:value[0],[constants.MAXIMUM]:value[1]};
    this.applyRatingAndCostFilters();
  }
  applyRatingAndCostFilters() {
    this.resultsList = this.results.filter(result => {
      return (
        this.selectedCostRange.min <= result.average_cost_for_two
        && this.selectedCostRange.max >= result.average_cost_for_two
        && this.selectedRatingRange.min <= result.user_rating.aggregate_rating
        && this.selectedRatingRange.max >= result.user_rating.aggregate_rating
      );
    })
  }

}