#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Oct  7 20:15:52 2023
THis scripts get university data using the downloadandclean function
@author: sam
"""
from downloadandclean import *

#name = 'Universität Basel|UNIBAS|unibas|Uni Basel| Uni Basel '
name = 'Universität St. Gallen|HSG'
name = 'Università della Svizzera italiana|USI|usi'
name = 'ZHAW|Zürcher Hochschule für angewandte Wissenschaften'
unishort = 'ZHAW'
test = ProcessData()
print("will get data")
testjson = test.get_uni_locations( name,unishort)
print("got data")
test.complete_adress_entries(unishort)
print("cleaned data and finished")    
