import React, { useState } from 'react'

export default function TicTacToe() {
    const value = [[0,0,0],[0,0,0],[0,0,0]]
    const [board , setBoard] = useState(value)
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [winner, setWinner] = useState(null);
    console.log(board)
    
    const handleCellClick = (rowId,cellId) =>{
        console.log("cell clicked", rowId,cellId);
        //board[[rowIdx][cellIdx]] = 1;
       // Adding logic to check the board and alternate players
        if(board[rowId][cellId] === 0){
            const newBoard = board.map((row, rowIdx) =>
                row.map((cell, cellIdx) =>
                    rowId === rowIdx && cellId === cellIdx ? currentPlayer : cell
                )
            );
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1)

            checkGame(newBoard)
        }
        // setBoard( prevBoard => {
        //     const newBoard = [...prevBoard];
        //     newBoard[rowIdx][cellIdx] =  1;
        //     return newBoard
        // }) ;
    }

    const checkGame = (board) =>{
        //to win the player has to complete 1 row 1 col or diagonal or draw

        for(let i=0;i<board.length;i++){
            if(board[i][0] !==0 && board[i][0] === board[i][1] & board[i][0] === board[i][2]){
                setWinner(board[i][0]);
                return
            }
        }

        for(let i=0;i<board.length;i++){
            if(board[0][i] !==0 && board[0][i] === board[1][i]& board[0][i] === board[2][i]){
                setWinner(board[0][i])
                return
            }
        }
        if(board[0][0] != 0 && board[0][0] === board[1][1] && board[0][0] === board[2][2]){
            setWinner(board[0][0]);
            return
        }

        if(board[0][2] !== 0 && board[0][2] === board[1][1] && board[0][2] === board[2][0]){
            console.log("here")
            setWinner(board[0][2]);
            return
        }

        //draw
        let draw = true
        for(let i=0; i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j] === 0){
                    draw = false;
                    break;
                }
            }
            if(!draw) break;
        }
        if(draw){
            console.log("DRAW")
            return
        }
    }
    const handleResetBoard = (e) =>{

        setBoard(value);
        setCurrentPlayer(1)
        setWinner(null)
    }
    console.log("winner is: ",winner )
  return (
    <>
        <div className='container'>
            {board.map((row, rowIdx) => (
                    <div key={rowIdx} className='row'>
                        {row.map((cell, cellIdx) => (
                            <button
                                key={cellIdx}
                                className='cell'
                                onClick={() => handleCellClick(rowIdx, cellIdx)}
                                disabled={winner !== null}
                            >
                                {cell === 0 ? '' : (cell === 1 ? 'A' : 'B')}
                            </button>
                        ))}
                    </div>
                ))}
        
        </div>
        { currentPlayer && <span > Current Player is:  <bold>{currentPlayer === 1 ? 'A' : 'B'} </bold></span>}
        { winner && <span > winner is:  <bold>{winner === 1 ? 'A' : 'B'} </bold></span>}
        <button className='reset__board'  onClick={(e)=>handleResetBoard(e)}> RESET BOARD</button>
    </>
    
  )
}
