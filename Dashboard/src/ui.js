
const module_name_array = ["Week 1 Module 1: Moments", "Week 1 Module 2: Forces and Vectors", "module 3 here", "Week 1 Module 4: Three Dim",
    "Week 2 Module 5: Equalibrium", "Week 2 Module 6: Equlibrium in 2D", "Week 2 Module 7: Method of Joints", "Week 2 Module 8: Method of Sections", "Week 3 Module 9: Analysis of Frames",
    "Week 4 Module 10: Center of Mass", "Week 4 Module 11: Distributed Loads", "Week 5 Module 12: Friction", "all modules"];


//TODO: Verb List
//TODO: Add object decription arrays for search

//function that will see what the options are in graphs


$(document).ready(function () {
    function resetConfig() {
        $("#endpoint").val("https://sample-lrs-rinnuja.lrs.io/xapi/");
        $("#username").val("username");
        $("#password").val("password");
        console.log("config reset to defaults");

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

        //call xapi changeEndpoint() from xapi.js
        changeEndpoint(endpoint, username, password);

    }
    
    function grabSelection() {//return selcted 

        // $("#select-graph-bundle").change(function(){
        //     alert($(this).val());
        //  });

        selection_name = $("#select-graph-bundle").val();
        console.log(selection_name);
        return selection_name;
    };

    function grabModuleSelection() {//return module

        selection_name = $("#search-module-name").val();
      //  console.log(selection_name);
        return selection_name;
    };

    $("#save-auth").click(function (e) {
        saveConfig();
        console.log("user has saved creds");
        e.preventDefault();
    })

    $("#reset-auth").click(function (e) { //e is the short var reference for event object which will be passed to event handlers. 
        //The event object essentially has lot of interesting methods and properties that can be used in the event handlers.
        //https://stackoverflow.com/questions/10323392/in-javascript-jquery-what-does-e-mean
        resetConfig();
        e.preventDefault();
    });

    $("#submit-graphs").click(function (e) {
        console.log("user has clicked submit graphs");
        saveConfig();
        console.log("user has saved config on button click");

        if(grabSelection() == "Module Overview"){ //aka general class data
        
          //create mod object

          const mod = new moduleObject( grabModuleSelection());
          console.log( "this is the selected module inside the mod object: " + mod.modName);
          moduleAvgScore(mod);

          // create general graphs



          //TODO:if student selected set student

        } else if(grabGraphSelection() == "Module Overview: Student Selection"){
            //run  createModuleStudentGraphs();
        }
     e.preventDefault();
    })
});


