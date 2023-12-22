#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Oct  8 11:57:16 2023

@author: sam
"""
import os
import json

def process_json_files(json_files, category=None):
    combined_data = {"results": []}
    for json_file in json_files:
        school_short_name = os.path.splitext(os.path.basename(json_file))[0]
        with open(json_file, 'r') as file:
            try:
                data = json.load(file)
            except json.JSONDecodeError as e:
                print(f'Error decoding JSON in {json_file}: {e}')
                continue  # Skip to the next file
            
            results = data.get("results", [])
            if category:
                for entry in results:
                    entry['attrs']['Kategorie'] = category
                    entry['attrs']['schoolshort'] = school_short_name
            combined_data["results"].extend(results)
    return combined_data

def find_json_files(directory):
    json_files = []
    for root, dirs, files in os.walk(directory):
        json_files.extend([os.path.join(root, file) for file in files if file.endswith('.json')])
    return json_files

def get_output_filename():
    i = 0
    while True:
        filename = f'masterjson{i}.json' if i else 'masterjson.json'
        if not os.path.exists(filename):
            return filename
        i += 1

def main():
    current_directory = os.getcwd()
    json_files = [file for file in os.listdir(current_directory) if file.endswith('.json')]
    
    if json_files:
        combined_data = process_json_files(json_files)
    else:
        combined_data = {"results": []}
        for dir in os.listdir(current_directory):
            dir_path = os.path.join(current_directory, dir)
            if os.path.isdir(dir_path):
                json_files = find_json_files(dir_path)
                dir_combined_data = process_json_files(json_files, category=dir)
                combined_data["results"].extend(dir_combined_data["results"])

    output_filename = get_output_filename()
    with open(output_filename, 'w') as file:
        json.dump(combined_data, file, indent=4)
    
    # Counting all entries in the masterjson file
    entry_count = len(combined_data["results"])
    print(f'Total entries in {output_filename}: {entry_count}')

if __name__ == "__main__":
    main()
