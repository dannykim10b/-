export function solvePuzzle(grid) {

    const emptyCell = findEmptyCell(grid)
    if (!emptyCell) return true;
    else {
        var row = emptyCell[0]
        var col = emptyCell[1]
    }


    //instead of iterating thru 1-9 try picking rand numbers

    //1-9
    // for(let i=1; i<10; i++) {
    //     if(isValid(grid, i, row, col)) {
    //         grid[row][col].value = i.toString()
    //         if(solvePuzzle(grid)) return true
    //         grid[row][col].value = ""
    //     }
    // }


    //random numbers between 1-9
    //make this more random
    const nums = [1,2,3,4,5,6,7,8,9]
    shuffle(nums)
    for(let i=0; i<9; i++) {
        const number = nums[i]
        if(isValid(grid, number, row, col)) {
            grid[row][col].value = number.toString()
            if(solvePuzzle(grid)) return true
            grid[row][col].value = ""
        }
    }
    return false
}


function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
}

export function isSolvable(grid) {
    const nonEmptyCells = findNonEmptyCells(grid)
    if (nonEmptyCells.length === 0) return true;
    else {
        for(let i=0; i<nonEmptyCells.length; i++) {
            const row = nonEmptyCells[i][0]
            const col = nonEmptyCells[i][1]
            const value = grid[row][col].value

            if(isValid(grid, value, row, col)) continue
            else return false
        }
        return true
    }

}

export function deepCopy(arr) {
    let copy = [];
    arr.forEach(elem => {
      if(Array.isArray(elem)){
        copy.push(deepCopy(elem))
      }else{
        if (typeof elem === 'object') {
          copy.push(deepCopyObject(elem))
      } else {
          copy.push(elem)
        }
      }
    })
    return copy;
  }

function deepCopyObject(obj) {
  let tempObj = {};
  for (let [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      tempObj[key] = deepCopy(value);
    } else {
      if (typeof value === 'object') {
        tempObj[key] = deepCopyObject(value);
      } else {
        tempObj[key] = value
      }
    }
  }
  return tempObj;
}

function isValid(grid, number, row, col) {
    //check row for duplicates
    for(let i=0; i<grid.length; i++) {
        if(grid[row][i].value === number.toString() && col !== i) return false
    }

    // check col
    for(let i=0; i<grid.length; i++) {
        if(grid[i][col].value === number.toString() && row !== i) return false
    }
    
    //check square
    const box_x = Math.floor(col/3) //0,1,2
    const box_y = Math.floor(row/3) //0,1,2
    for(let i=(box_y * 3); i<(box_y*3 + 3); i++) {
        for(let j=(box_x * 3); j<(box_x*3 + 3); j++) {
            if(grid[i][j].value === number.toString() && (col !== j || row !== i)) return false
        }
    }
    return true
}

function findEmptyCell(grid) {
    for(let row=0; row<grid.length; row++) {
        for(let col=0; col<grid.length; col++) {
            if(grid[row][col].value === "") {
                return [row, col]
            }
        }
    }
}

function findNonEmptyCells(grid) {
    const nonEmptyCells = []
    for(let row=0; row<grid.length; row++) {
        for(let col=0; col<grid.length; col++) {
            if(grid[row][col].value !== "") {
                nonEmptyCells.push([row, col])
            }
        }
    }
    return nonEmptyCells
}