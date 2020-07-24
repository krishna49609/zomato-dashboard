import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { data } from '../utils/data';
import { computed } from '@ember/object';

export default class RestaurantDetailComponent extends Component {

  @tracked
  restaurant = {};

  constructor(owner,args) {
    super(owner,args);
    //this.restaurant = data.restaurant;
  }

}
