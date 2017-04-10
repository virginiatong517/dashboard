import React, { Component } from 'react';

class ChartForm extends Component {
    constructor(props) {
        super(props);
    }

    handleTitleChange = (e) => {
        this.props.onTitleChange(e.target.value);
    }

    render() {
        const chartTitle = this.props.chartInfo.title;

        return (
            <div className="Chart-modal-form">
                <input type="text" value={chartTitle} onChange={this.handleTitleChange} />
            </div>
        );
    }
}

class ChartPreview extends Component {
    render() {
        return (
            <div className="Chart-modal-preview">
                <h3>{this.props.chartInfo.title}</h3>
            </div>
        );
    }
}

class ChartModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartInfo: {
                title: this.props.chartInfo.title,
                type: this.props.chartInfo.type
            }
        };
    }

    handleChartTitleChange = (newTitle) => {
        this.setState({
            chartInfo: {
                title: newTitle
            }
        });
    }
    
    render() {
        const chartInfo = this.state.chartInfo;

        return (
            <div>
                <ChartForm chartInfo={chartInfo} 
                    onTitleChange={this.handleChartTitleChange} />
                <ChartPreview chartInfo={chartInfo} />
            </div>
        );
    }
}

export default ChartModal;