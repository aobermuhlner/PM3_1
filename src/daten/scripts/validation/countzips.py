#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Oct  8 12:47:41 2023

@author: sam
"""

import json

def count_unknown_zipcodes(filename):
    # Load the JSON data from the specified file
    with open(filename, 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Ensure the data is in the expected format (a dictionary containing a 'results' list)
    if not isinstance(data, dict) or 'results' not in data or not isinstance(data['results'], list):
        raise ValueError('Unexpected data format')

    # Initialize a counter for unknown zipcodes
    unknown_zipcode_count = 0

    # Iterate through each item in the 'results' list
    for item in data['results']:
        # Ensure the item has a 'attrs' dictionary containing a 'zipcode' field
        if 'attrs' in item and isinstance(item['attrs'], dict) and 'zipcode' in item['attrs']:
            # Check if the 'zipcode' field has the value "unknown"
            if item['attrs']['zipcode'].lower() == 'unknown':
                unknown_zipcode_count += 1

    return unknown_zipcode_count

# Call the function and print the result
unknown_count = count_unknown_zipcodes('masterjson.json')
print(f'Number of unknown zipcodes: {unknown_count}')
