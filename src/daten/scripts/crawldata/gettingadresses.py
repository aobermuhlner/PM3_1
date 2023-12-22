#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Oct  8 12:12:36 2023

@author: sam
"""

import requests
import json
import time
import os
import sys

# Global variable to keep track of the number of requests
request_count = 0

def get_address(lat, lon):
    global request_count  # Declare the variable as global to update it
    
    if request_count >= 400:  # Check if the limit has been reached
        print("Reached the limit of 400 requests.")
        return None, True  # Return a flag indicating the limit was reached
    
    nominatim_url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
    response = requests.get(nominatim_url, headers={'User-Agent': 'smallresearchproject'})
    request_count += 1  # Increment the request count
    print(f"Request count: {request_count}")
    
    if response.status_code == 200:
        address = response.json().get('address')
        return address, False  # Return a flag indicating the limit was not reached
    else:
        print(f"Failed to get address: {response.status_code}")
        return None, False  # Return a flag indicating the limit was not reached

def process_file(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)
    
    for entry in data.get("results", []):
        if 'quarter' not in entry['attrs']:  # Check if 'quarter' attribute already exists
            lat = entry['attrs']['lat']
            lon = entry['attrs']['lon']
            address_info, limit_reached = get_address(lat, lon)  # Get the address info and the limit reached flag
            if address_info:
                entry['attrs']['name'] = address_info.get('amenity', 'Unknown Amenity')
                entry['attrs']['quarter'] = address_info.get('suburb', 'Unknown Quarter')
                entry['attrs']['city'] = address_info.get('city', 'Unknown City')
                entry['attrs']['address'] = f"{address_info.get('road', '')}, {address_info.get('postcode', '')}, {address_info.get('city', '')}"
                entry['attrs']['zipcode'] = address_info.get('postcode', 'Unknown Zipcode')  # Save the zip code as a separate attribute
            time.sleep(2)  # Wait 2.5 seconds between API requests
            if limit_reached:
                break  # Exit the loop if the limit was reached
    
    # Save the updated data back to the file
    with open(json_file, 'w') as file:
        json.dump(data, file, indent=4)

def main():
    json_file = 'masterjson.json'  # Hardcoded filename
    if os.path.isfile(json_file):
        process_file(json_file)
    else:
        print(f"'{json_file}' is not a valid JSON file.")

if __name__ == "__main__":
    main()

