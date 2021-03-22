import {solvePuzzle, deepCopy} from './helper'

export function randomizeBoard(grid) {

    solvePuzzle(grid)

    const solvedPuzzle = deepCopy(grid)


    // have between 17-40 clues, so remove 41-64 squares
    let numberToRemove = Math.floor(Math.random() * 23) + 41
    // let numberToRemove = 50
    let consecutiveFailure = 0
    while(numberToRemove > 0) {

        let row = Math.floor(Math.random() * 9)
        let col = Math.floor(Math.random() * 9)
        while(grid[row][col].value === "") {
            row = Math.floor(Math.random() * 9)
            col = Math.floor(Math.random() * 9)
        }
        let backup = grid[row][col].value
        grid[row][col].value = ""

        let loop = 10
        // const solutions = []
        // const gridCopy = deepCopy(grid)
        // solvePuzzle(gridCopy)
        // solutions.push(solvedPuzzle)
        let unique = true

        while(loop > 0) {

            const gridCopy = deepCopy(grid)
            solvePuzzle(gridCopy)
            if(!isEqual(gridCopy, solvedPuzzle)) {
                unique = false
                break
            }
            // if(solutions.length === 0) {
            //     solutions.push(gridCopy)
            // } else {
            //     for(let i=0; i<solutions.length; i++) {
            //         if(!isEqual(gridCopy, solutions[i])) {
            //             solutions.push(gridCopy)
            //         }
            //     }
            // }
            // if(solutions.length > 1) break
            loop -= 1

        }
        // console.log(solutions)
        if(!unique) {
            grid[row][col].value = backup
            consecutiveFailure += 1
            console.log(consecutiveFailure)

        } else {
            numberToRemove -= 1
            consecutiveFailure = 0

        }
        if(consecutiveFailure === 25) break
    }

}

function isEqual(array1, array2) {
    for(let i=0; i<array1.length; i++) {
        for(let j=0; j<array1.length; j++) {
            if(array1[i][j].value !== array2[i][j].value) {
                return false
            }
        }
    }
    return true;
}