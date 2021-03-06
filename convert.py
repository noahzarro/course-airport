#!/usr/bin/python3

import xlrd
import re
import datetime
import json
from dateutil import tz 


loc = ("Blockuebersicht.xls")
name_length = 23

wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0)
sheet.cell_value(0, 0)

blocks = []

for i in range(5, sheet.nrows):
    name = sheet.cell_value(i, 0)
    name = re.sub(r'\(\d+\.\d+\) ', '', name)
    name = re.sub(r' \[[\w\.\, \/]*\]', '', name)
    time = sheet.cell_value(i, 1)
    day, month, hour, minute = re.findall(r'\w{2}, (\d+)\.(\d+)\., (\d+):(\d+)', time)[0] # [(day, month, hour, minute)]
    cur_year = datetime.datetime.now().year
    time = datetime.datetime(cur_year, int(month), int(day), int(hour), int(minute), tzinfo=tz.gettz("Europe / Zurich"))
     
    blocks.append({"id": i-5,"name": name.ljust(name_length, " ")[:name_length], "time": datetime.datetime.timestamp(time), "hour": "{:02d}".format(int(hour)),"minute": "{:02d}".format(int(minute)) })
    print(name + ": " + time.strftime("%c"))

with open("blocks.js", "w") as f:
    f.write("var blocks="+json.dumps(blocks))