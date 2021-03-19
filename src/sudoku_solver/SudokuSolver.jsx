import React, { useEffect, useState } from 'react'
import Board from './Board'
import './SudokuSolver.css'
import {solvePuzzle, isSolvable, deepCopy, getRandomBoard} from './helper'

export default function SudokuSolver() {
    const [grid, setGrid] = useState([])
    const [isLocked, setIsLocked] = useState(false)
    const [status, setStatus] = useState("")
    

    useEffect(() => {

        const startGrid = initializeGrid();
        setGrid(startGrid)

    }, [])

    const initializeGrid = () => {
        const grid = []
        for(let row=0; row<9; row++) {
            const currentRow = []
            for(let col=0; col<9; col++) {
                currentRow.push(createBlankCell(row,col))
            }
            grid.push(currentRow)
        }
        return grid
    }

    const createBlankCell = (row, col) => {
        return {
            row,
            col,
            value: "",
            status: ""
        }
    }

    const resetBoard = () => {
        const resetGrid = deepCopy(grid)
        for(let row=0; row<9; row++) {
            for(let col=0; col<9; col++) {
                if(resetGrid[row][col].status !== "locked") {
                    resetGrid[row][col].value = ""
                    document.getElementById(`cell-${row}-${col}`).readOnly = false
                }
            }
        }
        setGrid(resetGrid)
        setStatus("")
    }

    const updateGrid = (row, col, value) => {
        grid[row][col].value = value
    }

    const solvedGrid = () => {
        const solvedGrid = deepCopy(grid)
        if(!isSolvable(solvedGrid)) return 
        solvePuzzle(solvedGrid)
        setGrid(solvedGrid)
        for(let row=0; row<grid.length; row++) {
            for(let col=0; col<grid.length; col++) {
                document.getElementById(`cell-${row}-${col}`).readOnly = true
            }
        }
    }

    const check = () => {
        const solvedGrid = deepCopy(grid)
        if(!isSolvable(solvedGrid)) return
        solvePuzzle(solvedGrid)
        for(let row=0; row<grid.length; row++) {
            for(let col=0; col<grid.length; col++) {
                if(solvedGrid[row][col].value === grid[row][col].value) continue
                else {
                    setStatus("unsolved")
                    console.log("UNSOLVED")
                    return
                }
            }
        }
        setStatus("solved")
        console.log("SOLVED")
    }

    const lockGrid = () => {
        const lockedGrid = deepCopy(grid)
        for(let row=0; row<grid.length; row++) {
            for(let col=0; col<grid.length; col++) {
                if(lockedGrid[row][col].value !== "") {
                    lockedGrid[row][col].status = "locked"
                    document.getElementById(`cell-${row}-${col}`).readOnly = true
                }
            }
        }
        setGrid(lockedGrid)
        setIsLocked(true)
        setStatus("")
    }

    const unlockGrid = () => {
        const unlockedGrid = deepCopy(grid)
        for(let row=0; row<grid.length; row++) {
            for(let col=0; col<grid.length; col++) {
                if(unlockedGrid[row][col].status === "locked") {
                    unlockedGrid[row][col].status = ""
                    document.getElementById(`cell-${row}-${col}`).readOnly = false
                }
            }
        }
        setGrid(unlockedGrid)
        setIsLocked(false)
        setStatus("")
    }

    const generateRandomBoard = () => {
        // unlockGrid()
        const randomGrid = deepCopy(grid)
        const randomBoard = getRandomBoard()
        for(let row=0; row<grid.length; row++) {
            for(let col=0; col<grid.length; col++) {
                if(randomGrid[row][col].status === "locked") {
                    randomGrid[row][col].status = ""
                    document.getElementById(`cell-${row}-${col}`).readOnly = false
                }
                randomGrid[row][col].value = randomBoard[row][col].toString()
                if(randomGrid[row][col].value !== "") {
                    randomGrid[row][col].status = "locked"
                    document.getElementById(`cell-${row}-${col}`).readOnly = true
                }
            }
        }
        setGrid(randomGrid)
        setIsLocked(true)
    }

    //grid is used for calculations and solving
    //change the grid and the state of the child to render the desired number 

    return (
        <>

            <h1>Sudoku</h1>
            <button onClick={resetBoard}>reset</button>
            <button onClick={generateRandomBoard}>generate random board</button>
            <button onClick={check}>check</button>
            <button onClick={solvedGrid}>solve</button>

            {isLocked
                ? <button onClick={unlockGrid}>unlock board</button>
                : <button onClick={lockGrid}>lock board</button>
            }

            {status === "" ? <h3></h3>
                : status === "unsolved" ? <h3>Board is unsolved</h3>
                : status === "solved" ? <h3>Board is solved!</h3>
                : ""
            }
            <Board 
                grid={grid}
                updateGrid={updateGrid}
            />
        </>
    )
}