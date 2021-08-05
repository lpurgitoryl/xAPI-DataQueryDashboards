//intialize gloabl default AUTH varibles
// let endpoint = "https://sample-lrs-rinnuja.lrs.io/xapi/analyze";
// let username = "username";
// let password = "password";
let vqlQuery = {
  "filter": {},
  "process": [
      {
          "$frequentValues": {
              "path": "actor.name",
              "metrics": {
                  "objects": {
                      "$timeSeries": {
                          "path": "timestamp"
                      }
                  }
              }
          }
      },
      {
          "$serialChart": {
              "categoryPath": "objects[*]._id",
              "valuePath": "objects[*].count",
          }
      }
  ]
}
// $.ajax({
//     url: endpoint,
//     method: "post",
//     data: JSON.stringify(vqlQuery),
//     headers: {
//       "Authorization": "Basic " + btoa(username + ":" + password), //creates a Base64-encoded ASCII string from a "string" of binary data ("btoa" should be read as "binary to ASCII").
//   },
//   contentType: "application/json",
//   success: function (yourVQL_result) {
//     vqlRender("this-is-the-div", yourVQL_result);
// }
// })

// this begins me trying to use functions to make the requests
//goal is to save credentials in browser in encrypted format
//then generate graphs 
//intially graphs will show agregate data of courses
// then you can psuedo query using the input feilds and generate the specfic graphs
// well see how this goes

// minium functions 
//resetConfig() defaults on button click 
//saveConfig() grab keys, encode keys, then save to local storage on button click
//setupConfig() find keys from local storage or grab new keys from input 
//onSubmitAndGenerate() generates graphs based on submit. Posts ajax Requests
//grabSelection() to grab selections
//generateVQLQuery() based on selections
//makeRequest() the ajax request
let endpoint = "blank";
let username = "blank";
let password = "blank";
let ID = "this-is-the-div";

//to search by id's use the # sybmbol before the identifier 

$( document ).ready(function() {
  function resetConfig(){
    $("#endpoint").val("https://sample-lrs-rinnuja.lrs.io/xapi/analyze");
    $("#username").val("username");
    $("#password").val("password");

  };

  function saveConfig(){ 
    //Grab Config From Default 
    endpoint = $("#endpoint").val();
    console.log(endpoint);
    username = $("#username").val();
    console.log(username);
    password = $("#password").val();
    console.log(password);
    console.log("save config has saved the above varibles");
    
  }
  
  function makeRequest(vql_JSON, chartID){
    $.ajax({
      url: endpoint,
      method: "post",
      data: JSON.stringify(vql_JSON),
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password), //creates a Base64-encoded ASCII string from a "string" of binary data ("btoa" should be read as "binary to ASCII").
      },
      contentType: "application/json",
      success: function (yourVQL_result) {
        vqlRender(chartID , yourVQL_result);
      }
    })

  }

  

  $("#save-auth").click(function(e){
    saveConfig();
    console.log("user has saved creds");
    e.preventDefault();
  })
  //TODO: warning when we reset to default
  $("#reset-auth").click(function(e) { //e is the short var reference for event object which will be passed to event handlers. 
                                        //The event object essentially has lot of interesting methods and properties that can be used in the event handlers.
                                        //https://stackoverflow.com/questions/10323392/in-javascript-jquery-what-does-e-mean
    resetConfig();
    e.preventDefault();
  });
  $("#submit-graphs").click(function(e){
    console.log("user has clicked submit graphs");
    saveConfig();
    console.log("user has saved config on button click");
    makeRequest(vqlQuery, ID );
    console.log("request has been made");
    e.preventDefault();
  })
});