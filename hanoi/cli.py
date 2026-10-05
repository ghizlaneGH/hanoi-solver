import argparse

from hanoi.hanoi_solver import hanoi_solver


def main():
    parser = argparse.ArgumentParser(
        description="Tours de Hanoï"
    )

    parser.add_argument(
        "--disks",
        type=int,
        required=True,
        help="Nombre de disques"
    )

    args = parser.parse_args()

    print(hanoi_solver(args.disks))


if __name__ == "__main__":
    main()