
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
        }
    ],
    "TableName": "employees",
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
    "LocalSecondaryIndexes": [
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
    
    dyn.putItem({
            "TableName": 'employees',
            "Item": {
                "id":"2",
                "emp_name":request.emp_name,
                "email_id":request.email_id,
                "date_of_joining":request.date_of_joining,
                "date_of_birth":request.date_of_birth 
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
    console.log(request);
   dyn.updateItem({
    "TableName": "employees",
    "Key": {
        "id": {
            "S": "1"
        },
        "email_id": {
            "S": request.email_id
        }
    },
    "UpdateExpression": "set emp_name = :val1",
    "ConditionExpression": "email_id = :val2",
    "ExpressionAttributeValues": {
        ":val1": {"S": request.emp_name},
        ":val2": {"S": request.email_id}
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
        dyn.getItem({
                "TableName": "employees",
                "Key": {
                     "id": {
                            "S": "1"
                        },
                        "email_id": {
                            "S": "richa.dagar@gmail.com"
                        }
                },
                // "ProjectionExpression":"emp_name",
                "ConsistentRead": true,
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


deleteEmployee = function(request, callback) {
    //this.find({}, callback);
   dyn.deleteItem({
    "TableName": "employees",
    "Key": {
        "id": {
            "S": "1"
        },
        "email_id": {
            "S": request.email_id
        }
    },
    "ConditionExpression": "email_id = :val2",
    "ExpressionAttributeValues": {
        ":val2": {"S": request.email_id}
    },
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
    deleteEmployee:deleteEmployee
};


