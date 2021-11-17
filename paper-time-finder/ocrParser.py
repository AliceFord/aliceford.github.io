toPrint = ""

for _ in range(138):
    c = input().split("\t")
    toPrint += "{\"date\": \"" + c[0] + "\",\"qualification\": \"" + "GCSE" + "\",\"examCode\": \"" + c[4] + "\",\"subject\": \"" + c[5].replace("(", "").replace(")", "") + "\",\"title\": \"" + c[6] + "\",\"amPM\": \"" + c[7] + "\",\"duration\": \"" + c[8] + "\"},\n"

print(toPrint)
