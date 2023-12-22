#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Oct  8 10:05:33 2023

@author: sam
"""

import json

def filter_entries(filename, mode, word=None, not_word=None, label=None):
    # Load the data from the specified file
    with open(filename, 'r') as f:
        data = json.load(f)
    
    # Mode 1: Delete entries if a certain word is contained
    if mode == 1 and word:
        filtered_data = {
            'results': [
                entry for entry in data.get('results', [])
                if word not in entry['attrs']['detail']
            ]
        }
    
    # Mode 2: Delete entries if a certain word is not contained
    elif mode == 2 and not_word:
        filtered_data = {
            'results': [
                entry for entry in data.get('results', [])
                if not_word in entry['attrs']['detail']
            ]
        }
    
    # Mode 3: Filter according to the entry in the attribute label
    elif mode == 3 and label:
        filtered_data = {
            'results': [
                entry for entry in data.get('results', [])
                if label in entry['attrs']['label']
            ]
        }
    
    else:
        raise ValueError("Invalid mode or missing required parameter")
    
    # Save the filtered data back to the file
    with open(filename, 'w') as f:
        json.dump(filtered_data, f, indent=4)

# Example usage:
# Delete entries containing the word 'ETH' in the detail attribute
filter_entries('HESSO.json', mode=1, word=' pedagogique')

# Delete entries not containing the word 'ETH' in the detail attribute
#filter_entries('USI.json', mode=2, not_word='usi')

# Filter entries according to the entry in the attribute label
#filter_entries('UNIGE.json', mode=3, label='Schul- und Hochschulareal')
