
//helper functions
//Need graphs JSONs
//global json VQL var to be used

let JSON_Query;
let chart = "1";
let selection_name;
const module_name_array = ["Week 1 Module 1: Moments", "Week 1 Module 2: Forces and Vectors", "module 3 here", "Week 1 Module 4: Three Dim",
    "Week 2 Module 5: Equalibrium", "Week 2 Module 6: Equlibrium in 2D", "Week 2 Module 7: Method of Joints", "Week 2 Module 8: Method of Sections", "Week 3 Module 9: Analysis of Frames",
    "Week 4 Module 10: Center of Mass", "Week 4 Module 11: Distributed Loads", "Week 5 Module 12: Friction"];
//TODO: Verb List
//TODO: Add object decription arrays for search

//function that will see what the options are in graphs
function vqlAvgScore(module_name){

    return avgScore = {
      "filter": null,
      "title": "module 7",
      "process": [
          {
              "$parallel": {
                  "stages": [
                      {
                          "$query": {
                              "filter": {
                                  "$and": [
                                      {
                                          "object.definition.name[\"en-US\"]": module_name
                                      }
                                  ]
                              },
                              "process": [
                                  {
                                      "$frequentValues": {
                                          "path": "actor.id",
                                          "limit": 100,
                                          "metrics": {
                                              "metric": {
                                                  "$avg": "result.score.scaled"
                                              }
                                          },
                                          "sort": {
                                              "count": "desc"
                                          }
                                      }
                                  },
                                  {
                                      "$toCanonicalDisplay": {
                                          "forceUnique": true
                                      }
                                  },
                                  {
                                      "$barChart": {
                                          "categoryPath": "canonical.display",
                                          "valuePath": "metric",
                                          "sortCategory": false,
                                          "seriesTitle": "New Series"
                                      }
                                  }
                              ]
                          }
                      }
                  ]
              }
          },
          {
              "$mergeCharts": {}
          }
      ]
    };
  
  };



$(document).ready(function () {
    function resetConfig() {
        $("#endpoint").val("https://sample-lrs-rinnuja.lrs.io/xapi/analyze");
        $("#username").val("username");
        $("#password").val("password");

    };

    function saveConfig() {
        //Grab Config From Default 
        endpoint = $("#endpoint").val();
        console.log(endpoint);
        username = $("#username").val();
        console.log(username);
        password = $("#password").val();
        console.log(password);
        console.log("save config has saved the above varibles");

    }

    function grabGraphSelection() {//return selcted graph

        // $("#select-graph-bundle").change(function(){
        //     alert($(this).val());
        //  });

        selection_name = $("#select-graph-bundle").val();
        console.log(selection_name);
        return selection_name;
    };

   
    function makeRequest(vql_JSON, chartID) { //take in JSON VQL result and div ID 
        $.ajax({
            url: endpoint,
            method: "post",
            data: JSON.stringify(vql_JSON),
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password), //creates a Base64-encoded ASCII string from a "string" of binary data ("btoa" should be read as "binary to ASCII").
            },
            contentType: "application/json",
            success: function (yourVQL_result) {
                vqlRender(chartID, yourVQL_result);
            }
        })

    }




    $("#save-auth").click(function (e) {
        saveConfig();
        console.log("user has saved creds");
        e.preventDefault();
    })
    //TODO: warning when we reset to default
    $("#reset-auth").click(function (e) { //e is the short var reference for event object which will be passed to event handlers. 
        //The event object essentially has lot of interesting methods and properties that can be used in the event handlers.
        //https://stackoverflow.com/questions/10323392/in-javascript-jquery-what-does-e-mean
        resetConfig();
        e.preventDefault();
    });

    function createModuleGraphs(){

        // iterate through the name array, find a match for selection and make request.

        for(let i = 0; i < 12; i++){
            console.log(module_name_array[i].slice(7, module_name_array[i].length) + "   this is the module name");
            console.log(grabGraphSelection()+ "  this is the graph selection");

            modName = module_name_array[i].slice(7, module_name_array[i].length);
            // if( modName == grabGraphSelection() ){
               // alert("MATCH");
            // };
            // selectName = grabGraphSelection()
            if( modName == grabGraphSelection() ){
                alert("MATCH");

                console.log("  this is the chart id: "+ chart);
                console.log(piechart_TotalActorStatementsPerModule(module_name_array[i]));

                makeRequest( piechart_TotalActorStatementsPerModule(module_name_array[i]) ,chart);
                chart++;
                console.log("this is the chart id: "+ chart);

                makeRequest( linechart_TimeStampActivityOverTime(module_name_array[i]) , chart );
                chart++;
                console.log("this is the chart id: "+ chart);

                makeRequest( barchart_ResultDurationForVerb(module_name_array[i]), chart);
                chart++;
                console.log("this is the chart id: "+ chart);

                makeRequest( linechart_TimeStampAvgScaledScore(module_name_array[i]), chart);
                chart++;
                console.log("this is the chart id: "+ chart);

                makeRequest( barchart_AvgScaledScore(module_name_array[i]), chart);
                    };

        };


    }

    $("#submit-graphs").click(function (e) {
        /* 
        12 Graphs max per pre bundled graphs
        TODO: Make 

        */

        console.log("user has clicked submit graphs");
        saveConfig();
        console.log("user has saved config on button click");
       
        //   makeRequest(vqlQuery, chart );
        //   chart++;
        // console.log("this is the chart id: "+ chart);
        // console.log(piechart_TotalActorStatementsPerModule(module_name_array[11]));

        // makeRequest( piechart_TotalActorStatementsPerModule(module_name_array[11]) ,chart);
        // chart++;
        // console.log("this is the chart id: "+ chart);

        // makeRequest( linechart_TimeStampActivityOverTime(module_name_array[11]) , chart );
        // chart++;
        // console.log("this is the chart id: "+ chart);

        // makeRequest( barchart_ResultDurationForVerb(module_name_array[11]), chart);
        // chart++;
        // console.log("this is the chart id: "+ chart);

        // makeRequest( linechart_TimeStampAvgScaledScore(module_name_array[11]), chart);
        // chart++;
        // console.log("this is the chart id: "+ chart);

        // makeRequest( barchart_AvgScaledScore(module_name_array[11]), chart);
        createModuleGraphs();
        
     e.preventDefault();
    })
});


