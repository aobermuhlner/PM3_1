# PM3_1: Life Quality Evaluator for College Students in Switzerland

## Overview
PM3_1 is a dynamic web project developed to assist college students in Switzerland in evaluating the quality of life in different regions. Utilizing Flask as a web server and MongoDB for database management, this application provides a user-friendly interface to access and analyze geodata, focusing on amenities and other factors relevant to students' lives.

## Features
- **Geodata Analysis**: Leveraging detailed geodata to offer insights into various amenities available in Swiss regions.
- **Customized Evaluations**: Tailored evaluations of neighborhoods based on factors like proximity to educational institutions, public transport, recreational areas, and essential services.
- **Interactive Maps**: User-friendly maps to visually explore different areas and understand the distribution of amenities.
- **Database Integration**: Robust MongoDB database to store and retrieve data efficiently.
- **User-Centric Design**: Simple and intuitive interface designed specifically for college students.

## Getting Started
### Prerequisites
- Python 3.x
- Flask
- MongoDB

### Installation
1. Clone the repository:
    git clone https://github.com/aobermuhlner/PM3_1.git
2. Navigate to the project directory and install dependencies:
    cd PM3_1
    pip install -r requirements.txt
3. Start the Flask server:
    python app.py

### Usage
After starting the server, access the application through your web browser at `http://localhost:5000/colleges`. Explore different regions in Switzerland, analyze amenities, and make informed decisions about your living situation as a college student.

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request





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
