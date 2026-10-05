import argparse


def hanoi_solver(n):
    rods = [list(range(n, 0, -1)), [], []]
    moves = []

    def format_rods():
        return ' '.join(f"[{', '.join(map(str, rod))}]" for rod in rods)

    moves.append(format_rods())

    def solve(disks, source, auxiliary, destination):
        if disks == 0:
            return
        solve(disks - 1, source, destination, auxiliary)
        disk = rods[source].pop()
        rods[destination].append(disk)
        moves.append(format_rods())
        solve(disks - 1, auxiliary, source, destination)

    solve(n, 0, 1, 2)
    return '\n'.join(moves)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Tours de Hanoï"
    )

    parser.add_argument(
        "--disks",
        type=int,
        required=True,
        help="Nombre de disques"
    )

    args=parser.parse_args()

    print(hanoi_solver(args.disks))