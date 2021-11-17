toPrint = ""

for _ in range(174):
    c = input().split("\t")
    amPm = ""
    if c[7] == "Morning":
        amPm = "AM"
    elif c[7] == "Afternoon":
        amPm = "PM"
    else:
        amPm = "N/A"
    toPrint += "{\"date\": \"" + c[0] + "\",\"qualification\": \"" + "GCSE" + "\",\"examCode\": \"" + c[4] + "\",\"subject\": \"" + c[5] + "\",\"title\": \"" + c[6] + "\",\"amPM\": \"" + amPm + "\",\"duration\": \"" + c[8] + "\"},\n"

print(toPrint)
