from hanoi.hanoi_solver import hanoi_solver


def test_hanoi_0():
    result = hanoi_solver(0)

    assert result == "[] [] []"


def test_hanoi_1():
    result = hanoi_solver(1)

    expected = """[1] [] []
[] [] [1]"""

    assert result == expected


def test_hanoi_3():
    result = hanoi_solver(3)

    states = result.splitlines()

    assert len(states) == 8
    assert states[0] == "[3, 2, 1] [] []"
    assert states[-1] == "[] [] [3, 2, 1]"