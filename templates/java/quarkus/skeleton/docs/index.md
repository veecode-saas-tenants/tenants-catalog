# Quarkus Template

## Getting started

**This template offers the developer a project structured with Java and quarkus, which can be freely modified after generation according to demand.**

### Project structure

<img src="./imgs/image1.png"/>

## Guide


The `docs` folder will contain the application documentation. It must be edited later according to the project being developed, and this documentation will be available within the **Devportal**.


In the `gradle` folder we will have additional information about the project, such as the properties that will be used.

**exemplo**
~~~conf
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-7.5.1-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
~~~

In the `src` folder will be the main project files as well as the test ones, in **quarkus**.

Already in the root of the project are the configuration files.

It is important to emphasize that according to the template, it can be created according to demand and following the architecture that the developer requests.

---

## Pipeline Secrets
For the project to run as expected, it is necessary to configure some secrets in the pipeline, some are optional.

:key: DOCKER_USERNAME `mandatory` <br>
:key: DOCKER_PASSWORD `mandatory` <br>
:key: API_TOKEN_GITHUB `mandatory` <br>

If you choose to use the grafana dashboard settings for the application, you will need to configure the secrets in the project repository

:key: APP_NAME `optional` <br>
:key: GRAFANA_API_TOKEN `optional`