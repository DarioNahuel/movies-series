# Requirement

- Kubernete
- Docker
- Skaffold (https://skaffold.dev/docs/install/)

# Create a local host

You can modify the host in infra > k8s > ingress-srv > host property if you want to use another.

127.0.0.1 netin.dev

# Create secret in kubernete

`kubectl create secret generic JWT_SECRET --from-literal=jwt-secret=<secret_name>`

# Run dev server

`skaffold dev`
