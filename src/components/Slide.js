import React, { Component } from 'react'
import { stringToRows } from '../utils/Utils';

class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawn: false
        };
    }

    DrawRows = (context, rows) => {
        context.fillStyle = "#1f202245";
        context.fillRect(0, context.canvas.height - ((rows.length - 1) * context.fontSize) - 30, context.canvas.width, context.canvas.height);

        context.fillStyle = "white";

        rows.slice(0, rows.length - 1).forEach((row, index) => {
            context.direction = 'rtl';

            context.fillText(row, context.canvas.width - context.widthMargin, context.canvas.height - (index * context.fontSize) - 20);
        });

        context.font = `800 ${context.fontSize + 10}px Assistant`;
        context.fillText(rows[rows.length - 1], context.canvas.width - context.widthMargin, context.canvas.height - (rows.length * context.fontSize) + 20);
    };

    Draw = (context, index) => {
        //console.log(context)
        let img = new Image();
        img.onload = function () {
            //console.log(this);
            context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height);       // draw in image
            context.font = `400 ${context.fontSize}px Assistant`;
            context.fillStyle = "white";
            context.textBaseline = "bottom";

            let string = this.props.text;
            let rows = stringToRows(context, string, context.widthMargin);
            rows.push(index + 1);
            this.DrawRows(context, rows);
        }.bind(this);

        img.crossOrigin = "";
        img.src = this.props.img;
        //return 1;
    }

    render() {
        return null;
    }
}

export default Slide;