import Foundation

let rows = 10
let cols = 10
let alive = 1
let dead = 0

var oldBoard = Array(repeating: Array(repeating: dead, count: cols), count: rows)
var newBoard = Array(repeating: Array(repeating: dead, count: cols), count: rows)

for i in 0..<rows {
    for j in 0..<cols {
        oldBoard[i][j] = Int.random(in: 0...1)
    }
}

func countAliveNeighbors(board: [[Int]], x: Int, y: Int) -> Int {
    var count = 0
    for i in -1...1 {
        for j in -1...1 {
            if i == 0 && j == 0 { continue }
            let newX = x + i
            let newY = y + j
            if newX >= 0 && newX < rows && newY >= 0 && newY < cols {
                count += board[newX][newY]
            }
        }
    }
    return count
}

for i in 0..<rows {
    for j in 0..<cols {
        let aliveNeighbors = countAliveNeighbors(board: oldBoard, x: i, y: j)
        if oldBoard[i][j] == alive {
            newBoard[i][j] = (aliveNeighbors == 2 || aliveNeighbors == 3) ? alive : dead
        } else {
            newBoard[i][j] = (aliveNeighbors == 3) ? alive : dead
        }
    }
}

func printBoard(_ board: [[Int]]) {
    for row in board {
        print(row.map { $0 == alive ? "⬛️" : "⬜️" }.joined(separator: " "))
    }
}

print("Old Board:")
printBoard(oldBoard)

print("\nNew Board:")
printBoard(newBoard)
