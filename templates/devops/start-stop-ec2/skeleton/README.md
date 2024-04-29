# Devops | Start Stop EC2


Project in nodeJs, which uses serverless lambda to start/stop EC2 instances (manually or synchronized via cron jobs). Everything is optimized using pipelines and github actions.

## How to use?

To use the template, the user must clone the code properly configured previously, via devportal, and in the terminal type the command:

~~~bash
npm i
sls deploy
~~~

Note: Remembering that you need to have **serverless** installed on your machine and **aws cli**.

The next step is to configure two environment variables in the repository, namely: `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`.
These variables are the Access Key ID, AWS Secret Access Key. To learn how to create keys, visit the [official documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey).

With the environment variables defined in the repository, it is now possible to run the pipeline.

### Pipeline

The pipeline is divided into stages (defined at template creation time), and generating the build with automatic start/stop functions and manual start and stop functions.
