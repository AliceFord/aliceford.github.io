from itertools import permutations, product, combinations_with_replacement
from threading import currentThread

symbolOperatorPossibilities = []

## PRE GENERATION ##

operators = ["+", "-", "*", "/"]
symbols = ["a", "b", "c", "d"]
bracketOptions = ["    ", "()  ", " () ", "  ()", "( ) ", " ( )", "[)) ", "((] ", " [))", " ((]"] 

symbolOrders = list(permutations(symbols, 4))
operatorOrders = list(product(operators, repeat=3))



for symbolOrder in symbolOrders:
    for operatorOrder in operatorOrders:
        current = symbolOrder[0] + operatorOrder[0] + symbolOrder[1] + operatorOrder[1] + symbolOrder[2] + operatorOrder[2] + symbolOrder[3]
        symbolOperatorPossibilities.append(current)

## INDIVIDUAL NUMBER FINDING ##

numberCombinations = list(combinations_with_replacement([1, 2, 3, 4, 5, 6, 7, 8, 9], 4))
possibilitiesWithoutBrackets = []

for target in range(1, 51):
    outstream = ""
    currentTarget = int(str(target))
    print(currentTarget)
    
    for comb in numberCombinations:
        currentDone = False
        for bracketSet in bracketOptions:
            if currentDone:
                break

            currentTarget = int(str(target))
            a, b, c, d = comb
            for possibility in symbolOperatorPossibilities:
                possibility = list(possibility)
                for i, char in enumerate(bracketSet):
                    index = 2 * i
                    if char == "(":
                        possibility[index] = "(" + possibility[index]
                    elif char == ")":
                        possibility[index] = possibility[index] + ")"
                    elif char == "[":
                        possibility[index] = "((" + possibility[index]
                    elif char == "]":
                        possibility[index] = possibility[index] + "))"
                possibility = "".join(possibility)
                try:
                    if eval(possibility) == currentTarget:
                        outstream += str(a) + str(b) + str(c) + str(d) + " " + possibility + "\n"
                        currentDone = True
                        break
                except ZeroDivisionError:
                    pass

    with open(str(currentTarget) + ".txt", "w") as f:
        f.write(outstream)