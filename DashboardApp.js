import React, { Component } from 'react';
import ScorecardPage from './ScorecardPage';
// import Modal from './ModalExample';
import ModalComponent from './ModalComponent';
import './DashboardApp.css';
import ChartModal from './ChartModal';
import PAGE_NAMES from './PageNames';

import { ButtonToolbar, Button } from 'react-bootstrap';

class DashboardHeader extends Component {
  render() {
    return (
      <div className="Dashboard-header" >
        <h1>{this.props.username}'s Dashboard</h1>
      </div>
    );
  }
}

class ScorecardTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChartModal: false
        };
    }

    openChartModal = () => {
        this.setState({
            showChartModal: true 
        });
    }

    closeChartModal = () => {
        console.log("Closing Chart Modal");
    }

    sendChartInfoRequest = (chartId) => {
        console.log("Sending chart info request for chartID: " + chartId);
    }

    handleChartTitleClick = (chartId) => {
        this.openChartModal();
        this.sendChartInfoRequest(chartId);
    }

    render() {
        const mockLineChart = {
            id: 1,
            title: "Sample Chart A",
            type: "LINE",
            dateGranularity: "MONTH",
            dateFrom: "",
            dateTo: "",
            metrics: [
                "pageviews"
            ],
            data: {}
        };

        const mockPieChart = {
            id: 2,
            title: "Sample Chart B",
            type: "PIE",
            dateGranularity: "DAY",
            dateFrom: "",
            dateTo: "",
            metrics: [
                "firsttouchchannel"
            ],
            data: {}
        };

        const hoverButtons = (
            <div className="Scorecard-tile-hover-options">
                <ButtonToolbar>
                    <Button bsSize="small"
                        onClick={() => this.props.changePage(PAGE_NAMES.scorecardPageEditable)}>
                        Edit
                    </Button>
                </ButtonToolbar>
            </div>
        );

        if (this.props.scorecardType === "NEW") {
            return (
                <div className="Scorecard-tile">
                    <p>+</p>
                    <p>Create New</p>
                </div>
            );
        } else {
            const chartsList = this.props.scorecardCharts.map((chartInfo) =>
                <li className="Scorecard-tile-chart-title" 
                    key={chartInfo.id} 
                    onClick={() => this.handleChartTitleClick(chartInfo.id)}>
                    {chartInfo.title}
                </li>
            );
            return (
                <div className="Scorecard-tile">
                    <ModalComponent show={this.state.showChartModal}>
                        <ChartModal chartInfo={mockLineChart} />
                    </ModalComponent>
                    {hoverButtons}
                    <div>
                        <p>{this.props.scorecardTitle}</p>
                        <p>{this.props.scorecardDateModified}</p>
                        <div>
                            Charts:
                            <ul>{chartsList}</ul>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

class ScorecardsDisplayBody extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            sampleScorecards: this.props.scorecards.sample,
            customScorecards: this.props.scorecards.custom 
        };
    }

    render() {
        const sampleScorecards = this.state.sampleScorecards.map((sampleScorecard) =>
            <ScorecardTile key={sampleScorecard.id}
                scorecardType="SAMPLE" 
                scorecardTitle={sampleScorecard.title} 
                scorecardDateModified={sampleScorecard.dateModified}
                scorecardCharts={sampleScorecard.charts}
                changePage={this.props.changePage} />
        );
        const customScorecards = this.state.customScorecards.map((customScorecard) =>
            <ScorecardTile key={customScorecard.id}
                scorecardType="CUSTOM" 
                scorecardTitle={customScorecard.title}
                scorecardDateModified={customScorecard.dateModified}
                scorecardCharts={customScorecard.charts}
                changePage={this.props.changePage} />
        );
        return (
            <div className="Scorecards-display-body">
                <div>
                    <h3>Samples</h3>
                    {sampleScorecards}
                </div>
                <div>
                    <h3>Custom</h3>
                    {customScorecards}
                    <ScorecardTile scorecardType="NEW"/>
                </div>
            </div>
        );
    }
}

class ScorecardsDisplayContainer extends Component {
  render() {
    const mockScorecards = {
        sample: [
            {
                id: 10,
                title: "Sample Scorecard 1",
                charts: [
                    {
                        id: 1,
                        title: "Sample Chart A"
                    },
                    {
                        id: 2,
                        title: "Sample Chart B"
                    },
                ]
            },
        ],
        custom: [
            {
                id: 11,
                title: "Custom Scorecard 1",
                dateModified: "Mar 28th, 2017 2:30PM",
                charts: [
                    {
                        id: 3,
                        title: "Custom Chart A"
                    },
                    {
                        id: 4,
                        title: "Custom Chart B"
                    },
                ]
            },
            {
                id: 12,
                title: "Custom Scorecard 2",
                dateModified: "Mar 28th, 2017 12:00PM",
                charts: [
                    {
                        id: 4,
                        title: "Custom Chart B"
                    },
                    {
                        id: 5,
                        title: "Custom Chart C"
                    },
                    {
                        id: 6,
                        title: "Custom Chart D"
                    }
                ]
            }
        ]
    };

    return (
      <div className="Scorecards-display-container" >
        <h2>Scorecards</h2>
        <ScorecardsDisplayBody changePage={this.props.changePage} scorecards={mockScorecards}/>
      </div>
    );
  }
}

class DashboardHomePage extends Component {
    render() {
        return (
            <div className="Dashboard-home-page">
                <DashboardHeader username="Virginia" />
                <ScorecardsDisplayContainer changePage={this.props.changePage} />
            </div>
        );
    }
}

class DashboardApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageDisplayed: PAGE_NAMES.dashboardHome
            // pageDisplayed: PAGE_NAMES.scorecardPage
        };
    }

    navigateToPage = (page) => {
        this.setState({
            pageDisplayed: page
        });
    }
  
    render() {
        let pageRendered;
        switch(this.state.pageDisplayed) {
            case PAGE_NAMES.dashboardHome:
                pageRendered = <DashboardHomePage changePage={this.navigateToPage}/>
                break;
            case PAGE_NAMES.scorecardPage:
                pageRendered = <ScorecardPage changePage={this.navigateToPage}/>
                break;
            case PAGE_NAMES.scorecardPageEditable:
                pageRendered = <ScorecardPage changePage={this.navigateToPage} isEditable={true}/>
                break;
            default:
                pageRendered = <DashboardHomePage changePage={this.navigateToPage}/>
        }

        return (
            <div className="Dashboard-app">
                {pageRendered}
            </div>
        );
    }
}

export default DashboardApp;
