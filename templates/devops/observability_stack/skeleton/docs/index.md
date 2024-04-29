# Kong Stack Template

## Getting started

**This template provides a comprehensive automation solution for configuring Kong Gateway, formerly known as Kong API Gateway, is an open-source, cloud-native API gateway and microservices management platform. It is designed to help organizations manage and secure their APIs, microservices, and other communication between different components of a modern software architecture.**


- **This stack offers the following installation modes:**:

| **Kong Modes**              | Explanation                                                                                                                                                                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|**Kong Enterprise:**      | Full installation with a license, enabling all product features.                                                                                                                                                                             |
| **Kong Enterprise with Basic Auth Authentication:**    | Full installation with a license and access control to the manager and API enabled via Basic Auth.                                                                                                                                                                                                                  |
| **Kong Free:**     | Free mode installation of the Kong API Gateway.                                                                                                                                                                                                              |
| **Kong Free Mode with Basic Auth Authentication:**     | Free mode installation with access control to the manager and API enabled via Basic Auth.                                                                                                                                                                                                                 |

- **Data Storage Models:**:

| **Data Storage Models**              | Explanation                                                                                                                                                                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Data Storage Models:**    |  A PostgreSQL database will be created for data storage.                                                                                                                                                                                                                  |
| **DBLESS:**    | Infrastructure for a database is not set up.                                                                                                                                                                                                            |

## Pipeline Secrets
For the project to run as expected, it is necessary to configure some secrets in the pipeline, all are mandatory.

:key: AWS_ACCESS_KEY `mandatory` <br>
:key: AWS_SECRET_KEY `mandatory` <br>
:key: AWS_REGION `mandatory` <br>
:key: CLUSTER_NAME `mandatory` <br>

### Database Mode standart
:key: POSTGRES_PASS `mandatory` <br>

### Kong Free Mode com basic auth
:key: KONG_ADMIN_PASSWORD `mandatory` <br>

### Kong Enterprise Mode com basic auth
:key: KONG_LICENSE `mandatory` <br>
:key: KONG_ADMIN_PASSWORD `mandatory` <br>


## Guide

The `docs` folder will contain the application documentation. It must be edited later according to the project being developed, and this documentation will be available within the **Devportal**.

It is necessary to configure the Github/Gitlab Secret in the project repository, so that the spec is published.

Already in the root of the project are the configuration files.

It is important to emphasize that according to the template, it can be created according to demand and following the architecture that the developer requests.

---

