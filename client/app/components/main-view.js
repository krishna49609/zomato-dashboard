import Component from '@glimmer/component';
import {action} from "@ember/object";
import {tracked} from "@glimmer/tracking";
import {inject as service} from '@ember/service';

export default class MainViewComponent extends Component {


  @tracked
  selectedCityId = "297" //Adelaide  

  @tracked 
  cuisines = [];

  @tracked
  categories = [];
  
  @service("zomato-api") api;
  constructor(owner,args) {
    super(owner,args);
    this.fetchCategories();
    this.fetchCuisines();
  }

  fetchCuisines() {
    this.api.getCuisines(this.selectedCityId)
    .then(response =>  response.json())
    .then(result => {
        this.cuisines = result.cuisines;
        console.log(this.cuisines);        
    })    
  }

  fetchCategories() {
    this.api.getCategories()
    .then(response =>  response.json())
    .then(result => {
        this.categories = result.categories;
        console.log(this.categories);        
    })
  }  
  

}
