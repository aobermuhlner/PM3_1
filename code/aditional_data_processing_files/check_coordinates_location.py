

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Oct 7 20:57:25 2023
This file chjecks if given coordinates in 2gs84 format ware within which canton
@author: sam
"""

import geopandas as gpd
from shapely.geometry import Point
import pyproj

def get_canton(shapefile_path, lat, lon):
    try:
        # Load the shapefile data
        gdf = gpd.read_file(shapefile_path)
    except Exception as e:
        print(f"Error: {e}")
        return None

    print(f'GeoDataFrame CRS: {gdf.crs}')  # Print the CRS of the GeoDataFrame

    # Define the transformation from WGS84 to CH1903+ / LV95
    transformer = pyproj.Transformer.from_crs(
        "EPSG:4326",  # WGS84
        "EPSG:2056",  # CH1903+ / LV95
        always_xy=True
    )

    # Transform the geographic coordinates to the projected coordinate system
    easting, northing = transformer.transform(lon, lat)
    
    # Create a point in the projected coordinate system
    point = Point(easting, northing)
    
    for index, row in gdf.iterrows():
        if row['geometry'].contains(point):
            return row['NAME']
    return None

# Replace 'path_to_shapefile.shp' with the actual path to your Shapefile
shapefile_path = 'swissBOUNDARIES3D_1_4_TLM_KANTONSGEBIET.shp'
# Replace 'lat' and 'lon' with the coordinates you want to check
lat = 47.4859603
lon = 9.5598603

canton = get_canton(shapefile_path, lat, lon)
if canton:
    print(f'The coordinates are in the canton of {canton}.')
else:
    print('Could not determine the canton.')
