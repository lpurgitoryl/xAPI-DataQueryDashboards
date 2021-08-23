
function moduleObject(modName, xAxis, yAxis) {
    this.modName = modName;
    this.studentName = ""; //single name
    this.xAxis = [];
    this.yAxis = [];
    this.studentArray = []; // array
    this.rawData = []; //array



}

function studentObject(modName, studentName, xAxis, yAxis) {
    this.modName = modName;
    this.studentName = studentName;
    this.xAxis = xAxis;
    this.yAxis = yAxis;



}




// INSTRUCTOR PLEASE CHANGE THE XAPI CREDS ON LINE 18 AND 19


// PLACE ENDPOINT, USERNAME/KEY, AND PASSWORD/SECRET IN DOUBLE QUOTES LIKE IN THE EXAMPLE BELOW

// const conf = {
//     "endpoint": "https://sample-lrs-lekofoa.lrs.io/xapi/",
//     "auth": "Basic " + toBase64("username:password")
//   };


// */
// const conf = {
//     "endpoint": "https://sample-lrs-rinnuja.lrs.io/xapi/",
//     "auth": "Basic " + toBase64( "username:password" )
// };

//DO NOT EDIT PAST THIS POINT

var wrapper = ADL.XAPIWrapper;


function changeEndpoint(endpoint, username, password) {
    const conf = {
        "endpoint": endpoint,
        "auth": "Basic " + toBase64(username + ":" + password)
    };
    wrapper.changeConfig(conf);
    console.log("wrapper config changed");

};


//gen caller to get xAPI data from lrs where the func depends on the type od graph selection

// function makeRequest(parameters, func  ){
//     queryData = wrapper.getStatements(parameters);
//     queryData.statements.forEach(func);
//     console.log(queryData);
//     while (queryData.more && queryData.more !== ""){

//         const moreStatements = wrapper.getStatements(null, queryData.more);
//         moreStatements.statements.forEach(func);
//         queryData = moreStatements;

//        // console.log(queryData);
//         console.log(moreStatements);
//      }


// };


//module over view

function moduleOverview(modObj) {

    //line bar chart total actor statements in module
    moduleAvgScore(modObj); //sets x and y
// 

};

//bar
function moduleAvgScore(modObj) {
    //get all actors, get their scaled score, graphs by actor = x, scaled score =y
    //grab data

    modObj.rawData = grabAllRawScores(modObj.modName); // contains all statements with a score section
    //set  rawscores as x and y as actors, no filter or optimizing

    for(let i = 0; i < modObj.rawData.length ; i++){
        if(modObj.rawData[i].result.score.raw != undefined){
        modObj.yAxis.push( modObj.rawData[i].result.score.raw );
        modObj.xAxis.push(modObj.rawData[i].actor.name);
        }
    };
   
console.log(modObj.xAxis + "/n"
    + modObj.yAxis );

    TESTER = document.getElementById('tester');
    Plotly.newPlot( TESTER, [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] }], {
    margin: { t: 0 } } );
    
    // chart = document.getElementById('1');
    // Plotly.newPlot( chart [{
    //     x: modObj.xAxis,
    //     y: modObj.yAxis   }],
    //     {margin: {t:0 }} )
    
        var data = [
            {
              x: modObj.xAxis,
              y: modObj.yAxis ,
              type: 'bar'
            }
          ];
          
          Plotly.newPlot('1', data);



};


function grabAllRawScores(name) { //return all students in array
    const parameters = wrapper.searchParams();
    parameters["activity"] = "https://elearn.ucr.edu/courses/3730"; //this will be replaced by mod name, aka url so that we dont have to search by desc
   // parameters["verb"] = "http://adlnet.gov/expapi/verbs/initialized"; //since everyone must intialize

    //check desciptions
    let result = [];

    queryData = wrapper.getStatements(parameters);

    console.log(queryData.statements.length);
    console.log(queryData.statements[0]);
    console.log(queryData.statements[0].object.definition.name["en-US"]);
    // queryData.statements.forEach(func);

//fetch statements and match module name ... with new version we dont have to do this
    for (let i = 0; i < queryData.statements.length; i++) {
       // console.log(queryData.statements[i]);
        if (queryData.statements[i].object.definition.name["en-US"] === name && queryData.statements[i].result.score != undefined  ) {
            let match = queryData.statements[i];
            console.log(match);
            console.log("iside first loop: " + queryData.statements[i]);
            result.push(match);
        };
    };
   
    while (queryData.more && queryData.more !== ""){

        const moreStatements = wrapper.getStatements(null, queryData.more);
      //  moreStatements.statements.forEach(func);
        for( let i = 0 ; i < moreStatements.statements.length ; i++){
            if (moreStatements.statements[i].object.definition.name["en-US"] === name && moreStatements.statements[i].result.score != undefined ){
                let match =moreStatements.statements[i]
                console.log(match);
                console.log("iside second loop: " + queryData.statements[i]);
                result.push(match);
            };
        };

        queryData = moreStatements;
    };

//

  

    return result;



};



// // search for score of Week 4 Module 10: Center of Mass
// let result = [];

// function grabScores(){
//     const parameters = wrapper.searchParams();
//     parameters["activity"] = "https://elearn.ucr.edu/courses/3730";
//     parameters["verb"] = "http://adlnet.gov/expapi/verbs/initialized";

//     makeRequest(parameters, findModuleDesc);

//     // queryData = wrapper.getStatements(parameters);
//     // queryData.statements.forEach(findModuleDesc);
//     // console.log(queryData);

//     // while (queryData.more && queryData.more !== ""){

//     //     const moreStatements = wrapper.getStatements(null, queryData.more);
//     //     moreStatements.statements.forEach(findModuleDesc);
//     //     queryData = moreStatements;

//     //     console.log(moreStatements);
//     //  }

//    // console.log(result);
// }



// function findModuleDesc(statement, modObj ) {

// if (statement.object.definition.name["en-US"] == modObj){
//     modObj.studentArray.push(statement);
// };

// }



