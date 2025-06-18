Backstage Templates in VeeCode Platform

This document explains the structure and conventions of Backstage templates used in the VeeCode Platform to provide context for understanding how templates are organized and used in this project.

Template Structure:

Backstage templates in this project follow a specific organization:

1. The main entry point is templates/templates.yaml, which serves as an index listing all available templates. This file uses the backstage.io/v1alpha1 API version with kind Location and contains targets pointing to individual template definitions.

2. Individual templates are defined in files located at templates/{template-name}/template.yaml. These files use the scaffolder.backstage.io/v1beta3 API version with kind Template. Each template has metadata including name, title, description, and tags for categorization.

3. The actual template content is stored in a skeleton directory at templates/{template-name}/skeleton/. This directory contains all the files that will be used to generate new projects.

Template Parameters:

Common parameters used in templates include:
- componentName: Name of the component/project being created
- repoUrl: URL of the repository where the project will be stored (uses RepoUrlPicker UI component)
- visibility: Repository visibility (public/private)

Template Actions:

Common actions used in template steps:
- fetch:template: Fetches template content from a specified location
- publish:github: Publishes the generated content to a GitHub repository
- github:pages:enable: Enables GitHub Pages for the repository
- github:actions:dispatch: Triggers a GitHub Actions workflow

Template Tags:

Templates are categorized using tags with these common prefixes:
- veecode-platform: Indicates templates related to the VeeCode Platform
- language tags: Indicates the programming language used (e.g., nextjs, python)
- deployment tags: Indicates deployment method (e.g., github, kubernetes)

Example Template:

The next-demo-template creates a static site using NextJs and publishes it with GitHub Pages. It includes:
- Parameters for project name and repository information
- Steps to fetch skeleton, publish to GitHub, enable GitHub Pages, and trigger deployment workflow
- Output links to the created repository and GitHub Actions workflow

# Template Output Conventions
output_conventions:
  links:
    - name: GitHub Repository
      description: Link to the created GitHub repository
      
    - name: Github Action Workflow
      description: Link to the GitHub Actions workflow
      
  text:
    - name: Reminder to Delete Repository
      description: Reminder for cleanup after testing

# Example Templates
example_templates:
  - name: next-demo-template
    description: Creates a static site using NextJs and publishes it with GitHub Pages
    path: templates/nextjs-demo/template.yaml
    skeleton_path: templates/nextjs-demo/skeleton/
    tags:
      - veecode-platform-demo
      - nextjs
      - static
      - github
