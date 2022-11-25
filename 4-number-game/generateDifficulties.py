for numberToChange in range(1, 51):
    with open(str(numberToChange) + ".txt") as f:
        data = f.readlines()

    for i, line in enumerate(data):
        data[i] = [line.split(" ")[0], line.split(" ")[1].replace("\n","")]  # previous difficulty calculations are ignored

    for i, (comb, poss) in enumerate(data):
        ## Sequence operators and variables used
        operators = []
        variables = []
        for c in poss:
            if c in ["+", "-", "*", "/"]:
                operators.append(c)
            if c in ["a", "b", "c", "d"]:
                variables.append(c)

        ## Set variables for eval
        a, b, c, d = list(comb)
        a = int(a); b = int(b); c = int(c); d = int(d)

        ## Determine difficulty of possiblity, default is medium

        diff = "M"
        if ("*" not in poss) and ("/" not in poss):  # contains only addition and subtraction
            diff = "E"
        elif (eval(variables[0]) / eval(variables[1]) == 1 and operators[0] == "/") or \
             (eval(variables[1]) / eval(variables[2]) == 1 and operators[1] == "/") or \
             (eval(variables[2]) / eval(variables[3]) == 1 and operators[2] == "/"):  # divide number by itself
            diff = "M"  # so these aren't accidentally categorised as something else
        
        elif type(eval(poss)) == float:  # non integers in working
            diff = "H"
        elif "(" in poss:  # there must be * or / being done to ()
            diff = "H"
        elif operators[0] == "*" and operators[2] == "*" and operators[1] != "*":  # 1 and 3 are *, 2 isn't
            diff = "H"
        elif operators[0] == "/" and operators[2] == "/" and operators[1] != "/":  # 1 and 3 are /, 2 isn't
            diff = "H"

        data[i].append(diff)

    with open(str(numberToChange) + ".txt", "w") as f:
        for line in data:
            f.write(" ".join(line) + "\n")
