"use strict";

const AWS = require('aws-sdk');
const ID_LIST = process.env.INSTANCE_IDS.trim().replace(/\s+/g," ")
const INSTANCE_IDS = ID_LIST.includes(",") ? ID_LIST.split(",") : [ID_LIST];

exports.start =  (event, context, callback) => {
    const ec2 = new AWS.EC2({ region: event.region });

    ec2.startInstances({ InstanceIds: INSTANCE_IDS }).promise()
        .then(() => {
            console.log(`Server has been started ${INSTANCE_IDS}`);
            callback(null, 'OK');
        })
        .catch(err => {
            console.error('Problems starting the service', err);
            callback(err);
        });
};

exports.stop = (event, context, callback) => {
    const ec2 = new AWS.EC2({ region: event.region });

    ec2.stopInstances({ InstanceIds: INSTANCE_IDS }).promise()
        .then(() => callback(null, `Server has been stopped ${INSTANCE_IDS}`))
}