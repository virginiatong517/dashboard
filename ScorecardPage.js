import React, { Component } from 'react';

class ScorecardPageTopMenu extends Component {
    render() {
        return (
            <button>Save</button>
        );
    }
}

class ScorecardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditableState: this.props.isEditable
        };
    }

    render() {
        let topMenu;
        if (this.state.isEditableState) {
            topMenu = <ScorecardPageTopMenu />
        }
        return (
            <div className="Scorecard-page-container">
                <div className="Scorecard-page-header">
                    <div className="Scorecard-page-top-menu">
                        {topMenu}
                    </div>
                    <div className="Scorecard-page-title">
                        Scorecard Title
                    </div>
                </div>
                <div className="Scorecard-page-charts-container">
                    Charts go here
                </div>
            </div>
        );
    }
}

export default ScorecardPage;