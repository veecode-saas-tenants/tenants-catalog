#!/bin/bash

#
# This script will process all <template>/skeleton/ folders in the ./templates directory
# using each ./<template>/inputs.json file in the tests directory
# process is done using nunjucks cli :
#
# npm install -g nunjucks-cli
#

# clean all output folders
if [ "$1" = "--clean" ]; then
  rm -rf ./tests/*/output/*
  exit 0
fi

for d in ./tests/*/ ; do
  template_name=$(basename "$d")
  input_file="$d/inputs.json"
  template_dir="./templates/$template_name/skeleton/"
  output_dir="${d}/output/"
  if [ -f "$input_file" ] && [ -d "$template_dir" ]; then
    echo "Pre-processing $template_name"
    # Create output directory structure mirroring skeleton
    mkdir -p "$output_dir"
    # Find all files in skeleton directory and recreate directory structure
    find "$template_dir" -type f | while read file; do
        # Get relative path from skeleton directory
        relative_path="${file#$template_dir}"
        target_dir="$output_dir$(dirname "$relative_path")"
        target_file="$output_dir$relative_path"
        # Create target directory if it doesn't exist
        mkdir -p "$target_dir"
        # Pre-process file: replace "${{" with "{{"
        sed 's/\${{/{{/g' "$file" > "${target_file}.tmp"
    done
    
    # Process all temporary files with nunjucks
    echo "Processing $template_name"
    find "$output_dir" -name "*.tmp" | while read tmp_file; do
        # Get the final target file name (remove .tmp extension)
        final_dir="$(dirname "$tmp_file")"
        tmp_filename="$(basename "$tmp_file")"
        final_filename="${tmp_filename%.tmp}"
        file_ext="done"
        # Process with nunjucks
        nunjucks "$tmp_filename" "$input_file" -o "$final_dir" --path "$final_dir" -e "$file_ext"
        mv "$final_dir/$final_filename.$file_ext" "$final_dir/$final_filename"
        # Remove temporary file
        rm "$tmp_file"
    done
  fi
done
