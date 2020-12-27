#!/usr/bin/python3

import csv


with open('block_overview.csv', 'r') as f:

    reader = csv.reader(f, delimiter=";")
    
    for row in reader:
        for e in row:            
            print(e)