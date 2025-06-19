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


```bash
for d in ./tests/*/ ; do
  template_name=$(basename "$d")
  input_file="$d/inputs.json"
  template_dir="./templates/$template_name/skeleton/iac/"
  output_dir="${d}/output/"
  if [ -f "$input_file" ] && [ -d "$template_dir" ]; then
    echo "Pre-processing $template_name"
    find "$template_dir" -type f -name "*.tf" | while read file; do
        target="./tests/$template_name/output/${file#./templates/tenant-ec2/skeleton/iac/}"
        # troca "${{" por "{{"
        sed 's/\${{/{{/g' "$file" > "${target}0"
    done
    # processa os templates com os inputs
    echo "Processing $template_name"
    nunjucks "*.tf0" "$input_file" --path "$output_dir" -o "$output_dir" -e tf
    rm "${output_dir}"*.tf0
  fi
done
```

