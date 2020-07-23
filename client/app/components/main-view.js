import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';
import {inject as service} from '@ember/service';
import {data} from '../utils/data';
import {computed} from '@ember/object';
export default class MainViewComponent extends Component {


  @tracked
  selectedCityId = "297" //Adelaide

  @tracked
  cuisines = [];

  @tracked
  categories = [];

  @tracked
  results = [];

  @tracked
  costRange = {
    from:0,
    to:500
  }

  @service("zomato-api") api;

  constructor(owner,args) {
    super(owner,args);
    this.fetchCategories();
    this.fetchCuisines();
    window["xfetchRestaurants"] = this.fetchRestaurants;
  }

  fetchCuisines() {
    /*this.api.getCuisines(this.selectedCityId)
    .then(response =>  response.json())
    .then(result => {
        this.cuisines = result.cuisines;
        console.log(this.cuisines);
    })*/
    this.cuisines = data.cuisines;
    this.cuisines.forEach(cusine => cusine.selected = false)
    this.results = data.results;
    //console.log(this.cuisines);

  }

  fetchCategories() {
    /*this.api.getCategories()
    .then(response =>  response.json())
    .then(result => {
        this.categories = result.categories;
        console.log(this.categories);
    })*/
    this.categories = data.categories;
    this.categories.forEach(category => category.selected = false);
    console.log(this.categories);
  }

  @tracked
  costRange = { "min":0, "max":1000 }

  @tracked
  costValues = [50,300]

  @tracked
  ratingRange = { "min":0, "max":5 }

  @tracked
  ratingValues = [3,5];

  @tracked
  selectedRestaurant = {}

  @tracked
  selectedRatingRange = {
    "min":this.ratingValues[0],
    "max":this.ratingValues[1]
  };

  @tracked
  selectedCostRange = {
    "min":this.costValues[0],
    "max":this.costValues[1]
  };

  @action
  fetchRestaurants() {
    let queryCategories = this.categories.filter(c => c.selected === true).map(c => c.id);
    let queryCuisines = this.cuisines.filter(c => c.selected===true).map(c=>c.cuisine_id);
    console.log(queryCategories);
    console.log(queryCuisines);
  }

  getRestaurantsInACity() {
    //Todo
  }

  @action
  showRestaurantDetail(value) {
    this.selectedRestaurant = value;
  }

  @action
  ratingSliderChange(val) {
    this.selectedRatingRange = {"min":val[0],"max":val[1]};
    console.log(this.selectedRatingRange);
  }

  costSliderChange(val) {
    this.selectedCostRange = {"min":val[0],"max":val[1]};
    console.log(this.selectedCostRange);
  }

}

