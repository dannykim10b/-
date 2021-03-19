import React, { useEffect, useState } from 'react'
import Cell from './Cell'
import './SudokuSolver.css'


export default function Board(props) {

    const {grid, updateGrid} = props

    return (
        <>
        <div className="grid">
            <div className="row">
                {grid.map((row, rowIndex) => {
                    return(
                        <div className = "col" key={rowIndex}>
                            {row.map((cell, cellIndex) => {
                                const {row, col, status} = cell;
                                return(
                                    <Cell
                                    key = {cellIndex}
                                    row={row}
                                    col={col}
                                    grid={grid}
                                    updateGrid={updateGrid}
                                    status={status}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}