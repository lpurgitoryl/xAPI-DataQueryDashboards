//module overview
function piechart_TotalActorStatementsPerModule(module_name){//use array[index] or string
    console.log("reuqest one has been made");

    return one = {
        "filter": null,
        "title": "Actor Statements Module 12",
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
                                            "limit": 250,
                                            "metrics": null,
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
                                        "$pieChart": {
                                            "categoryPath": "canonical.display",
                                            "valuePath": "count",
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
function linechart_TimeStampAvgScaledScore(module_name){
    console.log("reuqest two has been made");
    return result = {
        "filter": null,
        "title": "average scaled score",
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
                                        "$timeSeries": {
                                            "path": "timestamp",
                                            "metrics": {
                                                "metric": {
                                                    "$avg": "result.score.scaled"
                                                }
                                            }
                                        }
                                    },
                                    {
                                        "$serialChart": {
                                            "categoryPath": "_id",
                                            "valuePath": "metric",
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

//TODO: add verb select
function barchart_ResultDurationForVerb(module_name){
   
    console.log("reuqest three has been made");
    return result = {
        "filter": null,
        "title": "Module 12 avergae duration verb answered",
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
                                        },
                                        {
                                            "verb.id": "http://adlnet.gov/expapi/verbs/answered"
                                        }
                                    ]
                                },
                                "process": [
                                    {
                                        "$frequentValues": {
                                            "path": "result.duration",
                                            "limit": 20,
                                            "metrics": null,
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
                                            "valuePath": "count",
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

function linechart_TimeStampActivityOverTime(module_name){
    console.log("reuqest four has been made");

    return result = {
        "filter": null,
        "title": "New Graph",
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
                                        "$timeSeries": {
                                            "path": "timestamp",
                                            "metrics": null
                                        }
                                    },
                                    {
                                        "$serialChart": {
                                            "categoryPath": "_id",
                                            "valuePath": "count",
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

function barchart_AvgScaledScore(module_name){
    console.log("reuqest five has been made");

    return result = {
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

//
