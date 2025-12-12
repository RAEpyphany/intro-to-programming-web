def multiply(a, b):
    return a * b

def subtract(a, b):
    return a - b

def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        return "Error: Cannot divide by zero!"
    return a / b


def regular_mode():
    a = int(input("Enter the first number: "))
    operation = input("Enter operation (+, -, *, /): ")
    b = int(input("Enter the second number: "))

    if operation == '+':
        result = add(a, b)
    elif operation == '-':
        result = subtract(a, b)
    elif operation == '*':
        result = multiply(a, b)
    elif operation == '/':
        result = divide(a, b)
    else:
        result = "Invalid operation!"

    print(f"The result is: {result}")

def celsius_to_fahrenheit(celsius):
    """Converts Celsius to Fahrenheit."""
    return (celsius * 9/5) + 32

def conversion_mode():
    celsius = float(input("Enter temperature in Celsius: "))
    fahrenheit = celsius_to_fahrenheit(celsius)
    print(f"{celsius}°C is equal to {fahrenheit}°F")

def main():
    mode = input("Choose mode: 'regular' or 'conversion': ").lower()

    if mode == 'regular':
        regular_mode()
    elif mode == 'conversion':
        conversion_mode()
    else:
        print("Invalid choice! Please choose 'regular' or 'conversion'.")

if __name__ == "__main__":
    main()
