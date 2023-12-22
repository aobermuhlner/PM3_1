#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Oct  7 22:12:36 2023

@author: sam
"""

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Oct 7 22:12:36 2023

@author: sam
"""

import requests
import json  # Import the json module

url = "https://api3.geo.admin.ch/rest/services/api/SearchServer"
params = {
    'searchText': 'Pädagogische Hochschule Zug ',
    'type': 'locations'
}

response = requests.get(url, params=params)

if response.status_code == 200:
    data = response.json()
    print(data)
    
    # Saving the data to test.json
    with open('PHZG.json', 'w') as f:
        json.dump(data, f, indent=4)  # indent=4 for pretty printing
else:
    print("Error:", response.status_code)
