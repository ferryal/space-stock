import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { fetchDetailSpace } from './../../actions/detailSpace'

class detailSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentWillMount() {
        this.props.fetchDetailSpace(this.props.match.params.id);
    }

    render() {
        console.log(this.props);
        return (
            <div>Detail</div>
        );
    }
}

detailSpace.propTypes = {
    fetchDetailSpace: PropTypes.func.isRequired,
    detailSpace: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    detailSpace: state.detailSpace,
});

const mapDispatchToProps = { fetchDetailSpace }

export default connect(mapStateToProps, mapDispatchToProps)(detailSpace);
