"""Print the Fibonacci sequence from a small console application."""


def fibonacci(count: int) -> list[int]:
    """Return the first ``count`` Fibonacci numbers, starting with 0, 1."""
    numbers: list[int] = []
    first, second = 0, 1

    for _ in range(count):
        numbers.append(first)
        first, second = second, first + second

    return numbers


def main() -> None:
    print("Fibonacci sequence generator")

    while True:
        answer = input("How many terms would you like? ").strip()
        try:
            count = int(answer)
        except ValueError:
            print("Please enter a whole number.")
            continue

        if count < 0:
            print("Please enter zero or a positive number.")
            continue
        break

    sequence = fibonacci(count)
    print(" ".join(map(str, sequence)) if sequence else "(empty sequence)")


if __name__ == "__main__":
    main()
