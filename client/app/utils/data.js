/*
    Hard-Coded data modeled on zomato-api
    For development purpose
*/
export const data = {

    //Adelaide
    cityId:"297",

    //Predefined set of categories
    categories : [
      "Delivery",
      "Dine-out",
      "Takeaway",
      "Pubs & Bars"
    ],
    
    //Predefined set of cuisines
    cuisines: [
      "Cafe Food",
      "Coffee and Tea",
      "Chinese",
      "Asian",
      "Bakery",
      "Pizza",
      "Pub Food",
      "Fast Food",
      "Italian",
      "Others"
    ],
   
    //For reference
    restaurant : {
      "R": {
            "has_menu_status": {
            "delivery": -1,
            "takeaway": -1
            },
            "res_id": 18047914,
            "is_grocery_store": false
        },        
        "id": "18047914",
        "name": "The Mossy Cafe",
        "url": "",
        "location": {
            "address": "31 Pacific Street, Mossy Point",
            "locality": "Mossy Point",
            "city": "Mossy Point",
            "city_id": 2181,
            "latitude": "-35.8369730000",
            "longitude": "150.1796610000",
            "zipcode": "",
            "country_id": 14,
            "locality_verbose": "Mossy Point, Mossy Point"
        },
        "switch_to_order_menu": 0,
        "cuisines": "Cafe Food, Coffee and Tea",
        "timings": "7:30am – 3pm (Mon-Sun)",
        "average_cost_for_two": 50,             
        "thumb": "",
        "user_rating": {
            "aggregate_rating": "3.9",            
        },
        
        "has_online_delivery": 0,
        "is_delivering_now": 0,        
    }  


};
