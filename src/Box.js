import React, { Component } from 'react';
import './Box.css';

/** A single box on the board.
 *
 * This has no state --- just two props:
 *
 * - flipBoxesAroundMe: a function rec'd from the board which flips this
 *      box and the boxes around of it
 *
 * - isLit: boolean, is this box lit?
 *
 * This handles clicks --- by calling flipBoxesAroundMe
 *
 **/

class Box extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        // call up to the board to flip boxes around this box
        this.props.flipBoxesAroundMe();
    }

    render() {
        let classes = 'Box' + (this.props.isLit ? ' Box-lit' : '');

        return <td className={classes} onClick={this.handleClick} />;
    }
}

export default Box;
