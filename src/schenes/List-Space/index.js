import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	withGoogleMap,
	withScriptjs,
	GoogleMap,
	Marker,
	InfoWindow
} from "react-google-maps";
import { fetchListSpace } from './../../actions/listSpace';
class listSpace extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			currentPage: 1,
			spacePerPage: 4,
			spaceName: '',
			spaceType: '',
			selected: null,
			setSelected: null,
			showInfoWindow: false
		};
	}

	componentWillMount() {
		this.props.fetchListSpace();
	}

	handleClick = (event) => {
		this.setState({
			currentPage: Number(event.target.id)
		});
	}

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value})
	}

	handleSearch = () => {
		const { listSpace } = this.props;
		const { places } = listSpace;
		const payload = {
			spaceName: this.state.spaceName,
			spaceType: this.state.spaceType
		}
		if (payload.spaceName !== '' && payload.spaceType !== '') {
			const filterSpace = places.filter(function(place) {
				return place.name === payload.spaceName && place.type === payload.spaceType
			})
		}
	}

	renderListSpace() {
	const { listSpace } = this.props;
	const { places } = listSpace;
	const { currentPage, spacePerPage } = this.state;
	const indexOfLastTodo = currentPage * spacePerPage;
	const indexOfFirstTodo = indexOfLastTodo - spacePerPage;
	const currentTodos = places.length > 0 ? places.slice(indexOfFirstTodo, indexOfLastTodo) : [];
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(places.length / spacePerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </button>
      );
		});
		
	return(
		<React.Fragment>
			<div className="section-list">
				{
					currentTodos.length > 0 ?
						currentTodos.map((data, index) => {
						return (
							<div className="card" key={index+1}>
								<img className="card-image" src={data.images.primary} alt="" />
								<div className="card-info">
									<h4>{data.name}</h4>
									<p className="f-size-12">{data.description}</p>
									<p className="f-size-12"><i class="fa fa-location-arrow" aria-hidden="true" />{data.address.city}</p>
									<Link to={`/space-detail/${data.id}`} className="detail-space">Detail</Link>						
								</div>
							</div>
						);
					}) : ''
				}
			</div>
			<div className="pagination">
				{renderPageNumbers}
			</div>
		</React.Fragment>
		);
	}


	renderSearchSpace() {
		return (
			<React.Fragment>
				<input className="search" name="spaceName" type="text" value={this.state.spaceName} onChange={this.handleChange} placeholder="Search Space" />
				<select value={this.state.spaceType} onChange={this.handleChange} name="spaceType" onBlur={this.handleSearch}>
					<option value="">Pilih tipe space</option>
					<option value="apartement">Apartement</option>
					<option value="office">Office</option>
				</select>
			</React.Fragment>
		)
	}

	render() {
		const { listSpace } = this.props;
		const { places } = listSpace;
		const MapWrapped = withScriptjs(withGoogleMap(places => (
			<GoogleMap defaultCenter = { { lat: 45.4211, lng: -75.6903 } } defaultZoom = { 13 }>
				{
					places.length > 0 ? 
						places.map(place => (
							<Marker position={{ lat: place.address.lat, lng: place.address.lng }} onClick={() => { this.setSelected(places)}} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseExit}>
								{this.state.showInfoWindow && (
                    <InfoWindow>
                        <h4>{place.name}</h4>
                    </InfoWindow>
                )}
							</Marker>
						)) : ''
				}
				
      </GoogleMap>
   )));

		return (
			<div className="wrapper">
				<div className="search-space">
					{this.renderSearchSpace()}
				</div>
					<div className="row">
						<div className="column">
							{this.renderListSpace()}
						</div>
						<div className="column">
							<div className="section-maps">
								<MapWrapped
									 googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAOlEDd9G3BvZeTdKcCtcPBwlf68JVRLxg`}
									containerElement={ <div style={{ height: `720px`, width: '700px' }} /> }
									mapElement={ <div style={{ height: `100%` }} /> }
									loadingElement={<div style={{ height: `100%` }} />}
								/>
							</div>
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