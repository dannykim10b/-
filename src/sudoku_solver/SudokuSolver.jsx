import React, { useEffect, useState } from 'react'
import Board from './Board'
import './SudokuSolver.css'
import {solvePuzzle, isSolvable, deepCopy, getRandomBoard} from './helper'

export default function SudokuSolver() {
    const [grid, setGrid] = useState([])
    const [isLocked, setIsLocked] = useState(false)
    const [status, setStatus] = useState("")
    const [basePuzzle, setBasePuzzle] = useState([])
    

    useEffect(() => {

        const startGrid = initializeGrid();
        setGrid(startGrid)
        setBasePuzzle(startGrid)

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
                    resetGrid[row][col].status = ""
                    document.getElementById(`cell-${row}-${col}`).readOnly = false
                }
            }
        }
        setGrid(resetGrid)
        setBasePuzzle(resetGrid)
        setStatus("")
    }

    const updateGrid = (row, col, value) => {
        const updatedGrid = deepCopy(grid)
        updatedGrid[row][col].value = value
        setGrid(updatedGrid)
    }

    const solveGrid = () => {
        const solvedGrid = deepCopy(basePuzzle)

        if(!isSolvable(solvedGrid)) return 

        solvePuzzle(solvedGrid)

        for(let row=0; row<grid.length; row++) {
            for(let col=0; col<grid.length; col++) {
                if(solvedGrid[row][col].status !== "locked") {
                    solvedGrid[row][col].status = "solved"
                    document.getElementById(`cell-${row}-${col}`).readOnly = true

                }
            }
        }
        setStatus("solved")
        setGrid(solvedGrid)
    }


    //fix this
    const checkSolution = () => {
        const solvedGrid = deepCopy(basePuzzle)
        if(!isSolvable(solvedGrid)) {
            setStatus("unsolved")
            return
        }
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
        setBasePuzzle(lockedGrid)
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
        setBasePuzzle(initializeGrid())
        setIsLocked(false)
        setStatus("")
    }

    const generateRandomBoard = () => {
        // unlockGrid()
        setStatus("")
        const randomGrid = deepCopy(grid)
        const randomBoard = getRandomBoard()
        for(let row=0; row<grid.length; row++) {
            for(let col=0; col<grid.length; col++) {
                if(randomGrid[row][col].status === "locked") {
                    randomGrid[row][col].status = ""
                    document.getElementById(`cell-${row}-${col}`).readOnly = false
                }
                if(randomGrid[row][col].status === "solved") {
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
        setBasePuzzle(randomGrid)
        setIsLocked(true)
    }

    //grid is used for calculations and solving
    //change the grid and the state of the child to render the desired number 

    return (
        <>
            <div className="header">
            <h1>Sudoku</h1>
            </div>

            <div className="buttons">
            <button onClick={resetBoard}>Reset</button>
            <div className="divider"/>

            <button onClick={generateRandomBoard}>Generate Board</button>
            <div className="divider"/>

            <button onClick={checkSolution}>Check</button>
            <div className="divider"/>

            <button onClick={solveGrid}>Solve</button>
            <div className="divider"/>

            {isLocked
                ? <button onClick={unlockGrid}>Unlock</button>
                : <button onClick={lockGrid}>Lock</button>
            }
            </div>

            <div className="status-message">
            {status === "" ? <h3></h3>
                : status === "unsolved" ? <h3>Board is unsolved</h3>
                : status === "solved" ? <h3>Board is solved!</h3>
                : ""
            }
            </div>
            <Board 
                grid={grid}
                updateGrid={updateGrid}
            />
        </>
    )
}