import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { mylambdaHandler } from "./mylambda";

const lambdaRole = new aws.iam.Role("lambdaRole", {
    assumeRolePolicy: {
        Version: "2012-10-17",
        Statement: [
            {
                Action: "sts:AssumeRole",
                Principal: {
                    Service: "lambda.amazonaws.com",
                },
                Effect: "Allow",
                Sid: "",
            },
        ],
    },
});

const lambdaRoleAttachment = new aws.iam.RolePolicyAttachment("lambdaRoleAttachment", {
    role: lambdaRole,
    policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
});

const mylambda = new aws.lambda.CallbackFunction("mylambdaHandler", {
    callback: mylambdaHandler,
    memorySize: 256,
    role: lambdaRole,
});
