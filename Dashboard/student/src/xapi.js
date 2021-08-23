//query functions
var wrapper = ADL.XAPIWrapper;


function changeEndpoint(endpoint, username, password){
const conf = {
    "endpoint": endpoint,
    "auth": "Basic " + toBase64( username + ":" + password )
};
wrapper.changeConfig(conf);
console.log("wrapper config changed");

};

// search for score of Week 4 Module 10: Center of Mass
let result = [];

function grabScores(){
    const parameters = wrapper.searchParams();
    parameters["activity"] = "https://elearn.ucr.edu/courses/3730";
    parameters["verb"] = "http://adlnet.gov/expapi/verbs/initialized";
    
    makeRequest(parameters, findModuleDesc);

    // queryData = wrapper.getStatements(parameters);
    // queryData.statements.forEach(findModuleDesc);
    // console.log(queryData);
    
    // while (queryData.more && queryData.more !== ""){

    //     const moreStatements = wrapper.getStatements(null, queryData.more);
    //     moreStatements.statements.forEach(findModuleDesc);
    //     queryData = moreStatements;

    //     console.log(moreStatements);
    //  }

   // console.log(result);
}

function makeRequest(parameters, func  ){
    queryData = wrapper.getStatements(parameters);
    queryData.statements.forEach(func);
    console.log(queryData);
    while (queryData.more && queryData.more !== ""){

        const moreStatements = wrapper.getStatements(null, queryData.more);
        moreStatements.statements.forEach(func);
        queryData = moreStatements;

       // console.log(queryData);
        console.log(moreStatements);
     }


};

function findModuleDesc(statement) {
    
if (statement.object.definition.name["en-US"] == "Week 2 Module 5: Equalibrium"){
    result.push(statement);
};
    
}



// const parameters = ADL.XAPIWrapper.searchParams();

// parameters["verb"] = "http://adlnet.gov/expapi/verbs/initialized";
// parameters["activity"] = "https://elearn.ucr.edu/courses/3730";

// const queryData = ADL.XAPIWrapper.getStatements(parameters)
// if (queryData.more && queryData.more !== "") {
//     const moreStatements = ADL.XAPIWrapper.getStatements(null, queryData.more);
//     console.log(more.statements);
// }



