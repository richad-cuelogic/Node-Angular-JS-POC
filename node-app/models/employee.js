
    //bcrypt = require('bcrypt');
//autoIncrement.initialize(db);

/**
 * @module  Employee
 * @description contain the details of Attribute
 */
var AWS= require('aws-sdk');
AWS.config.update({
    'accessKeyId': "AKIAJVBATTNL6D6DFO6Q",
    'secretAccessKey': "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",
    'region': "us-west-2"   
});

dyn= new AWS.DynamoDB({endpoint: new AWS.Endpoint('http://localhost:8000')});

dynClient =  new AWS.DynamoDB.DocumentClient();
dyn.listTables(function(err, data) {
     // console.log(err, data);
      if(data.TableNames.length == 0) {

            dyn.createTable({
    "AttributeDefinitions": [
        {
            "AttributeName": "id",
            "AttributeType": "S"
        },
        {
            "AttributeName": "emp_name",
            "AttributeType": "S"
        },
        {
            "AttributeName": "email_id",
            "AttributeType": "S"
        },
        {
            "AttributeName": "date_of_joining",
            "AttributeType": "N"
        },
        {
            "AttributeName": "date_of_birth",
            "AttributeType": "N"
        },
        {
            "AttributeName": "employee_type",
            "AttributeType": "S"
        }
    ],
    "TableName": "employees",
    "KeySchema": [
        {
            "AttributeName": "id",
            "KeyType": "HASH"
        },
        {
            "AttributeName": "employee_type",
            "KeyType": "RANGE"
        }
    ],
    "LocalSecondaryIndexes": [
        {
            "IndexName": "email",
            "KeySchema": [
                {
                    "AttributeName": "id",
                    "KeyType": "HASH"
                },
                {
                    "AttributeName": "email_id",
                    "KeyType": "RANGE"
                }
            ],
            "Projection": {
                "ProjectionType": "KEYS_ONLY"
            }
        },
        {
            "IndexName": "emp_name",
            "KeySchema": [
                {
                    "AttributeName": "id",
                    "KeyType": "HASH"
                },
                {
                    "AttributeName": "emp_name",
                    "KeyType": "RANGE"
                }
            ],
            "Projection": {
                "ProjectionType": "KEYS_ONLY"
            }
        }, 
        {
            "IndexName": "doj",
            "KeySchema": [
                {
                    "AttributeName": "id",
                    "KeyType": "HASH"
                },
                {
                    "AttributeName": "date_of_joining",
                    "KeyType": "RANGE"
                }
            ],
            "Projection": {
                "ProjectionType": "KEYS_ONLY"
            }
        },
        {
            "IndexName": "dob",
            "KeySchema": [
                {
                    "AttributeName": "id",
                    "KeyType": "HASH"
                },
                {
                    "AttributeName": "date_of_birth",
                    "KeyType": "RANGE"
                }
            ],
            "Projection": {
                "ProjectionType": "KEYS_ONLY"
            }
        }
    ],
    "ProvisionedThroughput": {
        "ReadCapacityUnits": 10,
        "WriteCapacityUnits": 10
    }
}, function(err, data) {
               if (err) 
                console.log(err, err.stack); // an error occurred
              else {
                dyn.listTables(function(err, data) {
                    console.log("new table added");
                  console.log(data)
                });
              }
});




            // dyn.createTable({
            //   TableName: 'employees',
            //   AttributeDefinitions: [
            //        { AttributeName: 'id', AttributeType: 'N' },
            //        { AttributeName: 'name', AttributeType: 'S' }
            //        // { AttributeName: 'email_id', AttributeType: 'S' }
            //        // { AttributeName: 'date_of_joining', AttibuteType: 'S' }
            //        // { AttributeName: 'date_of_birth', AttributeType: 'S' },
            //        // { AttributeName: 'total_experience', AttributeType: 'N' }
            //        ],
            //   KeySchema:[
            //        { AttributeName: 'id', KeyType: 'HASH' },
            //        { AttributeName: 'emp_name', KeyType: "RANGE" }
            //        // { AttributeName: 'email_id', KeyType: "RANGE" }
            //        // { AttributeName: 'date_of_joining', KeyType: "HASH" }
            //        // { AttributeName: 'date_of_birth', KeyType: "HASH" },
            //        // { AttributeName: 'total_experience', KeyType: "HASH" }

            //   ],
            //   ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
            // }, function(err, data) {
            //   if (err) 
            //     console.log(err, err.stack); // an error occurred
            //   else {
            //     dyn.listTables(function(err, data) {
            //       console.log(data)
            //     });
            //   }
            // });
     } else {
       dyn.describeTable({"TableName":"employees"}, function(err, data){
        console.log("existing");
        console.log(data);
       })
     }
});
//CREATE TABLE
/*
*/
//DELETE TABLE
// var params = {
//     TableName : "employees"
// };

// dyn.deleteTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });
 addEmployee = function(request, callback) {
    //this.find({}, callback);
    console.log(request);
    dyn.putItem({
            "TableName": 'employees',
            "Item": {
                "id":{"S":"1"},
                "emp_name":{"S":request.emp_name},
                "email_id":{"S":request.email_id},
                "date_of_joining":{"N":request.date_of_joining},
                "date_of_birth":{"N":request.date_of_birth},
                "employee_type" : {"S" : "employee"}

                //"CustomActivityNodeId": { "N": obj.custom_activity_node_id.toString() }
            }
        }, function (err, data) {
            if(err) {
                console.log(err);
               // this.errors.(err);
            }
            else{
                callback(err,data);
            }

        });
}

updateEmployee = function(request, callback) {
    //this.find({}, callback);
 console.log("upadte employee final model");  
   dyn.updateItem({
    "TableName": "employees",
    "Key": {
        "id": {
            "S": "3"
        },
        "employee_type": {
            "S": "employee"
        }
    },
    "UpdateExpression": "set emp_name = :val1 ,date_of_birth = :val2 , date_of_joining = :val3",
    "ConditionExpression": "email_id = :val4",
    "ExpressionAttributeValues": {
        ":val1": {"S": request.emp_name},      
        ":val2": {"N": request.date_of_birth},
        ":val3": {"N": request.date_of_joining},
        ":val4": {"S": request.email_id},
    },
    "ReturnValues": "ALL_NEW"
    }, function (err, data) {
                if(err) {
                    console.log(err);
                }
                else{
                    callback(err,data);
                }
    });
}

employeeList = function(callback){
    dyn.scan({
        "TableName": "employees",
        "ReturnConsumedCapacity": "TOTAL"
    }, function (err, data) {
                if(err) {
                    console.log(err);
                }
                else{
                    callback(err,data);
            }
    });
    //     dyn.getItems({
    //             "TableName": "employees",
    //             "Key": {
    //                  "id": {
    //                         "S": "2"
    //                     },
    //                     "employee_type": {
    //                         "S": "employee"
    //                     }
    //             },
    //             // "ProjectionExpression":"emp_name",
    //             "ConsistentRead": true,
    //             "ReturnConsumedCapacity": "TOTAL"
    //     }, function (err, data) {
    //             if(err) {
    //                 console.log(err);
    //             }
    //             else{
    //                 callback(err,data);
    //             }
    // });
}


deleteEmployee = function(request, callback) {
    //this.find({}, callback);
    console.log("checking request");
    console.log(request);
   dyn.deleteItem({
    "TableName": "employees",
    "Key": {
        "id": {
            "S": "1"
        },
        "employee_type": {
            "S": "employee"
        }
    },
    "ConditionExpression": "email_id = :val2",
    "ExpressionAttributeValues": {
        ":val2": {"S": request.email_id}
    },
    "ReturnValues": "ALL_OLD"
    }, function (err, data) {
                if(err) {
                    console.log(err);
                }
                else{
                    callback(err,data);
                }
    });
}
getDetail = function(request, callback) {
    dyn.scan({
    "TableName": "employees",
    "FilterExpression": "email_id = :val",
    "ExpressionAttributeValues": {":val": {"S": request.email_id}},
    "ReturnConsumedCapacity": "TOTAL"
        }, function (err, data) {
                if(err) {
                    console.log(err);
                }
                else{
                    callback(err,data);
                }
    });
}


module.exports = {
    addEmployee: addEmployee,
    updateEmployee: updateEmployee,
    employeeList:employeeList,
    deleteEmployee:deleteEmployee,
    getDetail:getDetail
};


 /* dyn.getItem({
    "TableName": "employees",
    "Key": {
        "id": {
            "S": "1"
        },
        "employee_type": {
            "S": "employee"
        }
    },
    "ProjectionExpression":"email_id, emp_name, date_of_birth, date_of_joining",
    "ConsistentRead": true,
    "ReturnConsumedCapacity": "TOTAL"
    }
    */