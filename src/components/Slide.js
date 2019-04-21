import React, { Component } from 'react'
import { stringToRows } from '../utils/Utils';

class Slide extends Component {
    constructor(props) {
        super(props);
        this.position = 0;
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

    AnimateImage = (context, img) => {
        context.drawImage(img, context.canvas.width - this.position, 0, context.canvas.width, context.canvas.height);       // draw in image
        this.position = this.position + 10;
        if (this.position <= context.canvas.width) {
            requestAnimationFrame(() => this.AnimateImage(context, img));
        }
        this.DrawText(context);
    };

    DrawText = (context) => {
        context.font = `400 ${context.fontSize}px Assistant`;
        context.fillStyle = "white";
        context.textBaseline = "bottom";

        let string = this.props.text;
        let rows = stringToRows(context, string, context.widthMargin);
        rows.push(this.props.index + 1);
        this.DrawRows(context, rows);
    }

    Draw = (context) => {
        //console.log(context)
        let img = new Image();
        img.onload = function () {
            //console.log(this);
            //context.drawImage(img, 140, 0, context.canvas.width, context.canvas.height);       // draw in image
            
            this.DrawText(context);
            requestAnimationFrame(() => this.AnimateImage(context, img));

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