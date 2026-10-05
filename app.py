from flask import Flask, jsonify, render_template, request

from hanoi.hanoi_solver import hanoi_solver


app = Flask(
    __name__,
    template_folder="front/templates",
    static_folder="front/static"
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/solve", methods=["POST"])
def solve():
    data = request.get_json()

    try:
        disks = int(data.get("disks", 3))
    except (TypeError, ValueError):
        return jsonify({"error": "Le nombre de disques doit être un entier."}), 400

    if disks < 1:
        return jsonify({"error": "Le nombre de disques doit être supérieur à 0."}), 400

    if disks > 10:
        return jsonify({
            "error": "Pour la visualisation, le nombre maximum de disques est 10."
        }), 400

    result = hanoi_solver(disks)
    states = result.splitlines()

    return jsonify({
        "disks": disks,
        "states": [
            [
                [int(disk) for disk in rod.strip("[]").split(", ") if disk]
                for rod in state.split("] [")
            ]
            for state in states
        ],
        "moves": len(states) - 1,
        "total_states": len(states)
    })


if __name__ == "__main__":
    app.run(debug=True)