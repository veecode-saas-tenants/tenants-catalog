# Tenants Catalog

This is a repository holds the template catalog for VeeCode SaaS Control Plane, the Backstage distro from VeeCode.

Under the `templates` directory you will find the templates for the different types of tenants. Each folder contains a `template.yaml` file that defines the template.

## Templates

- `tenant-ec2`: A template for creating a tenant on EC2.

## Development

Run `docker compose up` to start a dummy backstage instance at http://localhost:3000/ that mounts the templates with hot reloading, so you can test the user interaction with parameters. No actual processing or push will occur at the end of the form, this is just for testing the user interaction with parameters.

## Testing

At this moment there is no way to test the template processing from a CLI, so we are relying on a nunjuck CLI to process templates againt parameter sets.

Nunjucks CLI can be installed via npm:

```bash
npm install -g nunjucks-cli
```

To run the tests:

```bash
./run_tests.sh
```

To clean the output folders:

```bash
./run_tests.sh --clean
```

## What to do with test output

Things we can do to improve tests:

- Run "terraform validate" on the output folders to check if the templates are valid
- Run "terraform plan" on the output folders to check if the templates are valid (must pick solution to backend and AWS auth)

