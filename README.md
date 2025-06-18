# Tenants Catalog

This is a repository holds the template catalog for VeeCode SaaS Control Plane, the Backstage distro from VeeCode.

Under the `templates` directory you will find the templates for the different types of tenants. Each folder contains a `template.yaml` file that defines the template.

## Templates

- `tenant-ec2`: A template for creating a tenant on EC2.

## Development

Run `docker compose up` to start a dummy backstage instance at http://localhost:3000/ that mounts the templates with hot reloading, so you can test the user interaction with parameters. No actual processing or push will occur at the end of the form.

## Testing


