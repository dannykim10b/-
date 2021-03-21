import React, {useState, useEffect } from 'react'
import './Cell.css'



export default function Cell(props) {
    const [value, setValue] = useState("")

    useEffect(() => {
        setValue(grid[row][col].value)
    })

    const style={}

    const {
        row,
        col,
        grid,
        updateGrid,
        status
    } = props

    if(row === 2 || row === 5) {
        style['borderBottom'] = "3px solid black"
    }

    if(col === 2 || col === 5) {
        style['borderRight'] = "3px solid black"
    }

    if(status === "locked") {
        style['backgroundColor'] = "gray"
    }

    if(status === "solved") {
        style['backgroundColor'] = "lightgreen"
    }

    const handleChange = (e) => {
        let allowedInput = /^$|[1-9]/
        if(allowedInput.test(e.target.value)) {
            updateGrid(row, col, e.target.value)
            setValue(e.target.value)
        } else return
    }

    return (
        <>
        <textarea
        id={`cell-${row}-${col}`}
        className="cell"
        style={style}
        maxLength="1"
        onChange={handleChange}
        value={grid[row][col].value}
        >
        </textarea>
        </>
    )
}