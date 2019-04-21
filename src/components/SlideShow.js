import React, { Component } from 'react'

class SlideShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frameCounter: 0,
            context: {}
        };
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const context = canvas.getContext("2d");
        context.font = `400 ${this.props.fontSize}px Assistant`;
        context.fontSize = this.props.fontSize;
        context.widthMargin = this.props.widthMargin;
        context.fillStyle = "white";
        context.textBaseline = "bottom";
        this.setState({ context: context })
    }

    CurrentSlide = (frameCounter, slides) => {
        //console.log(slides)

        let data = slides.map((slide, i) => {
            return { start: i > 0 ? (slides[i - 1].props.length * 1000 / (1000 / 25)) : 0, end: (slide.props.length * 1000 / (1000 / 25)) + (i > 0 ? (slides[i - 1].props.length * 1000 / (1000 / 25)) : 0) }
        });

        //console.log(data)
        let times = [];
        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            let time = { start: i > 0 ? times[i - 1].end : 0, end: (slide.props.length * 1000 / (1000 / 25)) + (i > 0 ? times[i - 1].end : 0) };
            times.push(time);
        }

        for (let i = 0; i < times.length; i++) {
            const time = times[i];
            
            if (frameCounter >= time.start && frameCounter < time.end) {
                return i;
            }else if(i == times.length - 1){
                return -1;
            }
        }

    };

    Clear = () => {
        this.state.context.clearRect(0, 0, this.state.context.canvas.width, this.state.context.canvas.height);
    }

    Start = (slides) => {
        console.log(slides);
        var interval = 40; // ms
        var expected = Date.now() + interval;
        setTimeout(step.bind(this), interval);
        function step(callBack) {
            var dt = Date.now() - expected; // the drift (positive for overshooting)
            if (dt > interval) {
                // something really bad happened. Maybe the browser (tab) was inactive?
                // possibly special handling to avoid futile "catch up" run
            }
            this.setState({ frameCounter: this.state.frameCounter + 1 }, () => {

                slides.forEach((slide, index) => {
                    if(this.CurrentSlide(this.state.frameCounter, slides) === -1){
                        //console.log("Done");

                    }
                    if (this.CurrentSlide(this.state.frameCounter, slides) === index) {
                        //console.log(slide.props)
                        if (!slide.props.drawn) {
                            this.Clear();
                            slide.Draw(this.state.context, index);
                            slide.props.drawn = true;
                        }
                    }
                });
            });

            expected += interval;
            setTimeout(step.bind(this), Math.max(0, interval - dt)); // take into account drift
        }
    };

    render() {
        return <canvas ref="canvas" width={this.props.width} height={this.props.height} dir="rtl" />;
    }
}

export default SlideShow;