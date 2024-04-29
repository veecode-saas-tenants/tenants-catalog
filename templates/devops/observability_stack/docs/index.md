# Observability Stack Template

## Getting started

**This template aims to create automation in the observability context that enables visibility into the health of your infrastructure and applications using the three pillars of observability, which are (metrics, logs, and traces). For this purpose, we centralize log data using Loki, metrics with Prometheus, and tracing with Jaeger. This entire ecosystem is managed by OpenTelemetry, and you can visualize this data through Grafana to facilitate the discovery of behavior, incidents, and anomalies.**

**To ensure effective observability in your Kubernetes environment, it is essential that applications are properly instrumented for this purpose. In this solution, we have installed the option of auto-instrumentation for applications through the example component provided below:**

```yaml
apiVersion: opentelemetry.io/v1alpha1
kind: Instrumentation
metadata:
  name: instrumentation
spec:
  exporter:
    endpoint: http://otel-collector.vkpr:4317
  propagators:
    - tracecontext
    - baggage
    - b3
  sampler:
    type: parentbased_traceidratio
    argument: "0.25"
  java:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-java:latest
  nodejs:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-nodejs:latest
  python:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-python:latest
```

**You can also obtain tracing originating from Ingress. In this example, we are using our Kong API Gateway and Ingress template as a reference.**

**To enable observability with tracing in an environment where you have already generated a Kong template and are deploying OpenTelemetry, it is important to configure Kong appropriately in your vkpr.yaml file. This will ensure that Kong captures and forwards tracing information to your monitoring system. Here are some general steps you should follow:**

```yaml
kong:
  enabled: true
  metrics: true
  mode: standard
  helmArgs:
    env:
      tracing_instrumentations: all
      tracing_sampling_rate: 1.0
```
**This indicates that Kong has been configured to enable tracing instrumentation (tracing_instrumentations: all) on all requests, and the tracing sampling rate (tracing_sampling_rate) has been set to 1.0, meaning that all requests will be traced. These settings will be imported into the Kong chart installation values by the VKPR CLI.**

**Now, to complete the configuration of Kong with OpenTelemetry, you should ensure that:**

**OpenTelemetry is configured correctly in your environment, including deploying OpenTelemetry agents in the pods of the applications you want to trace.**

**Kong is configured to forward tracing information to OpenTelemetry. This may involve configuring specific Kong plugins for tracing or setting custom headers in Kong service configurations, as mentioned earlier.**

**Be sure to check the specific documentation for Kong and OpenTelemetry for additional details on configuring the integration between these two components according to your specific setup. You can find it here: Kong and OpenTelemetry Integration Documentation.**                                                                                                                                                                                 |

## Pipeline Secrets
For the project to run as expected, it is necessary to configure some secrets in the pipeline.

:key: AWS_ACCESS_KEY `mandatory` <br>
:key: AWS_SECRET_KEY `mandatory` <br>
:key: AWS_REGION `mandatory` <br>
:key: CLUSTER_NAME `mandatory` <br>

### Grafana Password
:key: GRAFANA_PASS `optional` <br>

> [!IMPORTANT]
> Access to Grafana will be as follows: <br>
> User: admin <br>
> Password: :key:GRAFANA_PASS <br>
> If no Grafana password is defined, the default password is: **vkpr123**
## Guide

The `docs` folder will contain the application documentation. It must be edited later according to the project being developed, and this documentation will be available within the **Devportal**.

It is necessary to configure the Github/Gitlab Secret in the project repository, so that the spec is published.

Already in the root of the project are the configuration files.

It is important to emphasize that according to the template, it can be created according to demand and following the architecture that the developer requests.

---

