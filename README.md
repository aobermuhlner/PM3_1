# PM3_1
College life evaluator
Projektstand Abgabe 22.12.23
.
```
.
├── app.py
├── daten
│   ├── colleges_updated_19_12.json
│   ├── processed_data.json
│   └── scripts
│       ├── crawldata
│       │   ├── filtermapgeoadmin.py
│       │   ├── gettingadresses.py
│       │   ├── mapgeoadminapi.py
│       │   ├── overpass
│       │   │   ├── downloadandclean.py
│       │   │   └── getdata.py
│       │   └── PLZO_CSV_LV95.csv
│       ├── db_upload_file.py
│       ├── processdata
│       │   ├── combiners
│       │   │   └── combiner.py
│       │   └── rework_colleges.ipynb
│       └── validation
│           ├── check_coordinates_location.py
│           ├── countzips.py
│           ├── swissBOUNDARIES3D_1_4_TLM_KANTONSGEBIET.cpg
│           ├── swissBOUNDARIES3D_1_4_TLM_KANTONSGEBIET.dbf
│           ├── swissBOUNDARIES3D_1_4_TLM_KANTONSGEBIET.prj
│           ├── swissBOUNDARIES3D_1_4_TLM_KANTONSGEBIET.shp
│           └── swissBOUNDARIES3D_1_4_TLM_KANTONSGEBIET.shx
├── filters
│   ├── amenities.py
│   ├── colleges.py
│   └── __pycache__
│       ├── amenities.cpython-311.pyc
│       ├── amenities.cpython-39.pyc
│       └── colleges.cpython-39.pyc
├── mongodb_errors.log
├── services
│   ├── __init__.py
│   ├── mongodb_service.py
│   └── __pycache__
│       ├── __init__.cpython-311.pyc
│       ├── __init__.cpython-39.pyc
│       ├── mongodb_service.cpython-39.pyc
│       └── testDBFile.cpython-39.pyc
├── static
│   ├── css
│   │   └── style.css
│   ├── images
│   │   ├── entertainment_icon.png
│   │   ├── food_icon.png
│   │   ├── health_icon.png
│   │   ├── icon.ico
│   │   ├── icon.png
│   │   ├── info.png
│   │   ├── postal_icon.png
│   │   ├── transport_icon.png
│   │   ├── university_life.png
│   │   └── university.png
│   ├── js
│   │   ├── amenities_filter.js
│   │   ├── coil.js
│   │   ├── college_score.js
│   │   ├── colleges_filter.js
│   │   ├── main.js
│   │   ├── map.js
│   │   └── style.js
│   └── view
│       ├── amenities_filter.html
│       ├── bycatbarchart.html
│       ├── coil.html
│       ├── colleges_filter.html
│       ├── map.html
│       ├── relevancechart.html
│       └── scatterplot_category_adjusted.html
└── templates
    └── index.html


```
