import React, { Component } from 'react';
import Box from './Box';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any box is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <BabyBox /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual boxes
 *
 **/

class Board extends Component {
    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chanceLightStartOn: 0.25
    };
    constructor(props) {
        super(props);

        // TODO: set initial state
        this.state = {
            hasWon: false,
            board: this.createBoard()
        };
    }

    /** create a board nrows high/ncols wide, each box randomly lit or unlit */

    createBoard() {
        let board = [];
        // TODO: create array-of-arrays of true/false values
        for (let y = 0; y < this.props.nrows; y++) {
            let row = [];
            for (let x = 0; x < this.props.ncols; x++) {
                row.push(Math.random() < this.props.chanceLightStartOn);
            }
            board.push(row);
        }
        return board;
    }

    /** handle changing a box: update board & determine if winner */

    flipBoxesAround(coord) {
        let { ncols, nrows } = this.props;
        let board = this.state.board;
        let [y, x] = coord.split('-').map(Number);

        function flipBox(y, x) {
            // if this coord is actually on board, flip it

            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        }

        flipBox(y, x);
        flipBox(y - 1, x);
        flipBox(y + 1, x);
        flipBox(y, x - 1);
        flipBox(y, x + 1);

        // TODO: flip this box and the boxes around it

        // win when every box is turned off
        // TODO: determine is the game has been won
        let hasWon = board.every(row => row.every(box => !box));

        this.setState({ board, hasWon });
    }

    /** Render game board or winning message. */

    render() {
        // if the game is won, just show a winning msg & render nothing else

        // TODO
        // make table board
        // TODO

        let tableBoard = [];
        for (let y = 0; y < this.props.nrows; y++) {
            let row = [];
            for (let x = 0; x < this.props.ncols; x++) {
                let coord = `${y}-${x}`;
                row.push(
                    <Box
                        key={coord}
                        isLit={this.state.board[y][x]}
                        flipBoxesAroundMe={() => this.flipBoxesAround(coord)}
                    />
                );
            }
            tableBoard.push(<tr key={y}>{row}</tr>);
        }
        return (
            <div>
                {this.state.hasWon ? (
                    <div className='Board-title'>
                        <div className='winner'>
                            <span className='neon-orange'>You</span>
                            <span className='neon-blue'>Win!</span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='Board-title'>
                            <div className='neon-orange'>Lights</div>
                            <div className='neon-blue'>Out</div>
                        </div>
                        <table className='Board'>
                            <tbody>{tableBoard}</tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}

export default Board;
