import React from 'react'

class Pagination extends React.Component {
    getInitialState() {
        return {
            activePage: 1,
        };
    }

    handleSelect(eventKey) {
        this.setState({
            activePage: eventKey,
        });
    }

    render() {
        return (
            <div>
                <Pagination
                    bsSize="large"
                    items={10}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect}
                />
            </div>
        );
    }
}