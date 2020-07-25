const fetch = require('node-fetch');

const api_url = process.env.api_url || "https://developers.zomato.com/api/v2.1/";
apiKey_1 = "d8a8946182b91cbfbc6fd430c683afa0";
apiKey_2= "bb93008aecdf8fc00e41d2b636ed6885";

async function load(params){
  console.log(params);    
  let response = await fetch( api_url + (params? params: ""), {
    method: "GET",
    headers: {
     "user-key": apiKey_2,
     'Content-Type': 'application/json'
    }
  })
  let result = await response.json();   
  return result;
}

module.exports = {
    load : load,
}

