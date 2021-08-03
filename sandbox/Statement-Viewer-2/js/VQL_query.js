
function VQL_RequestToConsole() {
    var settings = {
        "url": "https://sample-lrs-rinnuja.lrs.io/xapi/analyze",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "X-Requested-With": "XMLHttpRequest",
          "Authorization": "Basic dXNlcm5hbWU6cGFzc3dvcmQ=",
          "Content-Type": "application/json"
        },
        "data": "{\r\n    \"filter\": {},\r\n    \"process\": [\r\n        {\r\n            \"$frequentValues\": {\r\n                \"path\": \"actor.name\",\r\n                \"metrics\": {\r\n                    \"objects\": {\r\n                        \"$timeSeries\": {\r\n                            \"path\": \"timestamp\"\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        },\r\n        {\r\n            \"$serialChart\": {\r\n                \"categoryPath\": \"objects[*]._id\",\r\n                \"valuePath\": \"objects[*].count\",\r\n            }\r\n        }\r\n    ]\r\n}",
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
      });

};
var graphData;
function VQL_Request() {
    var settings = {
        "url": "https://sample-lrs-rinnuja.lrs.io/xapi/analyze",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "X-Requested-With": "XMLHttpRequest",
          "Authorization": "Basic dXNlcm5hbWU6cGFzc3dvcmQ=",
          "Content-Type": "application/json"
        },
        "data": "{\r\n    \"filter\": {},\r\n    \"process\": [\r\n        {\r\n            \"$frequentValues\": {\r\n                \"path\": \"actor.name\",\r\n                \"metrics\": {\r\n                    \"objects\": {\r\n                        \"$timeSeries\": {\r\n                            \"path\": \"timestamp\"\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        },\r\n        {\r\n            \"$serialChart\": {\r\n                \"categoryPath\": \"objects[*]._id\",\r\n                \"valuePath\": \"objects[*].count\",\r\n            }\r\n        }\r\n    ]\r\n}",
      };
      

      $.ajax(settings).done(function (response) {
        console.log(response); graphData = JSON.stringify(response);
      });
      
      alert(JSON.stringify(graphData));
      return JSON.stringify(graphData);
};




$(document).ready(function() {
    $("#trigger").click(function() {
        $("#demo").html( "This is on button click" );

    });
});