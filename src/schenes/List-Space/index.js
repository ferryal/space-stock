import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchListSpace } from './../../actions/listSpace';



class listSpace extends Component {
	constructor(props) {
		super(props);
		this.state = {  };
	}

	componentWillMount() {
		this.props.fetchListSpace();
	}


	renderListSpace() {
	const { listSpace } = this.props;
	const { places } = listSpace;
	return(
		<React.Fragment>
		{
			places.length > 0 ?
				places.map((data, index) => {
        return (
					<div className="card" key={index+1}>
						<img className="card-image" src={data.images.primary} alt="" />
						<div className="">{data.name}</div>						
					</div>
        );
			}) : ''
		}
		</React.Fragment>
		);
	}

	renderSearchSpace() {
		return (
			<React.Fragment>
				<input type="text" placeholder="Search Space" />
				<select>
					<option value="apartement">Apartement</option>
					<option value="office">Office</option>
				</select>
			</React.Fragment>
		)
	}

	render() {
		return (
			<div className="wrapper">
				<div className="search-space">
					{this.renderSearchSpace()}
				</div>
					<div className="row">
						<div className="column">
							<div className="section-list">
								{this.renderListSpace()}
							</div>
						</div>
						<div className="column">
							<div className="section-maps"></div>
						</div>
					</div>
			</div>
		);
	}
}

listSpace.propTypes = {
	fetchListSpace: PropTypes.func.isRequired,
	listSpace: PropTypes.object.isRequired,
	places: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  listSpace: state.listSpace,
});

const mapDispatchToProps = { fetchListSpace };

export default connect(mapStateToProps,mapDispatchToProps)(listSpace);