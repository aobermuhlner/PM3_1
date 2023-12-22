import requests
import json
import time


class ProcessData:
    "this class is used to get data from overpass api, cleans it and adds missing names using nomantim"
    #def __init__(self,unilong,unishort):
     #   self.uniname = f'{unilong}|{unishort}'
    
    def __init__(self):
        pass
    def _get_location_json(self,uniname):
        url = "https://overpass-api.de/api/interpreter"
        query = f"""
        [out:json];
        area["ISO3166-1"="CH"][admin_level=2];
        node(area)[~"name"~"{uniname}"];
        out center;
        """
        response = requests.post(url, data={'data': query})
        if response.status_code != 200:
            print(f'Failed to retrieve data: {response.status_code}')
            return None
        print("got {uniname} data ")
        return response.json()

    def save_to_json(self,data,unishort):
        locationname = f'{unishort}.json'
        with open(locationname, 'w') as file:
            json.dump(data, file, indent=4)
        print("printed {locationname} succsefull")            

    def get_uni_locations(self,uniname,unishort):
        locations_data = self._get_location_json(uniname)
        print("finished printing")
        if locations_data is not None:
            locations_list = []
            for element in locations_data['elements']:
                location_info = {
                    'name': element.get('tags', {}).get('name', 'Unknown'),
                    'address': element.get('tags', {}).get('addr:full', 'Unknown'),
                    'coordinates': {
                        'lat': element.get('lat'),
                        'lon': element.get('lon')
                    }
                }
                locations_list.append(location_info)
            self.save_to_json(locations_list,unishort)
            
    def _get_address_nominatim(self,lat, lon):
        nominatim_url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
        response = requests.get(nominatim_url, headers={'User-Agent': 'smallresearchproject'})
        if response.status_code == 200:
            address = response.json().get('address')
            return address
        else:
            print(f"Failed to get address: {response.status_code}")
            return None
    def complete_adress_entries(self,unishort):
        # Load the data from uzh.json
        with open(f'{unishort}.json', 'r') as file:
            data = json.load(file)
    
        # Iterate through the entries in the data
        for entry in data:
            if entry['name'] == "Unknown":
                lat = entry['coordinates']['lat']
                lon = entry['coordinates']['lon']
                address_info =  self._get_address_nominatim(lat, lon)
                if address_info:
                #DO NOT CHANGE
                    # Use the amenity as the name, if available
                    entry['name'] = address_info.get('amenity', 'Unknown Amenity')
                    entry['quarter'] = address_info.get('suburb', 'Unknown Quarter')
                    entry['city'] = address_info.get('city', 'Unknown City')
                    entry['address'] = f"{address_info.get('road', '')}, {address_info.get('postcode', '')}, {address_info.get('city', '')}"
                time.sleep(2.5)  # Wait 1.5 seconds between API requests DO NOT CHANGE
                #DO not change, max requests per TOS are 2.5 s
                print("waitet 2.5 seconds")
        # Save the updated data back to uzh.json
        with open(f'{unishort}.json', 'w') as file:
            json.dump(data, file, indent=4)

if __name__ == "__main__":
    name = 'UZH|Universität Zürich'
    unishort = 'uzh'
    test = ProcessData()
    print("hmmm")
    #testjson = test.get_uni_locations( name,unishort)
    print("nice")
    test.complete_adress_entries(unishort)
    print("even nicer")
