let endpoint = "https://sample-lrs-rinnuja.lrs.io/xapi/analyze";
let username = "username";
let password = "password";
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
$.ajax({
    url: endpoint,
    method: "post",
    data: JSON.stringify(vqlQuery),
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password),
  },
  contentType: "application/json",
  success: function (yourVQL_result) {
    vqlRender("this-is-the-div", yourVQL_result);
}
})