def find_greater_value(a, b):
    if a > b:
        print(f"{a} is greater than {b}")
    elif b > a:
        print(f"{b} is greater than {a}")
    else:
        print(f"{a} is equal to {b}")

def main():
    # Test cases
    find_greater_value(10, 20)
    find_greater_value(30, 15)
    find_greater_value(5, 5)

main()