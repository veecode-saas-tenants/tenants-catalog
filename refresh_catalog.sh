#!/bin/bash

# This script will refresh the catalog by running the following commands:
# TODO: testar, deveria usar o webhook do backstage
curl -vv -X POST \
  "https://control-plane.saas.vee.codes/api/events/http/github" \
  -H "Authorization: Bearer $GITHUB_WEBHOOK_TOKEN"