import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Slider from "react-slick";
import { fetchDetailSpace } from './../../actions/detailSpace';

class detailSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentWillMount() {
        this.props.fetchDetailSpace(this.props.match.params.id);
		}

		next = () => {
			this.slider.slickNext();
		}

		previous = () => {
			this.slider.slickPrev();
		}

		renderSlider() {
			const { detail } = this.props.detailSpace;
			var settings = {
				className: "center",
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 3,
				slidesToScroll: 3,
				centerPadding: "60px",
				centerMode: true
			};
			return (
				<React.Fragment>
					<Slider ref={c => (this.slider = c)} {...settings}>
					{
						detail.images.others && detail.images.others.length > 0 ?
							detail.images.others.map( data => (
								<img src={data} alt="" />
							))
						:  <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1" alt=""/>
					}
				</Slider>
				</React.Fragment>
			);
		}

    render() {
			const { detail } = this.props.detailSpace;
			const GoogleMapExample = withGoogleMap(props => (
					<GoogleMap
						defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
						defaultZoom = { 13 }
					>
					</GoogleMap>
			));
			return (
				<React.Fragment>
				<div className="item">
						<img src={detail.images.primary !== '' ? detail.images.primary : ''}  alt=""/>
				</div>
					<div className="container">
						<div className="info"> 
							<h4>{detail.name}</h4>
							<p>Description</p>
							<p>{detail.description}</p>
							<br />
							<p>Facilities</p>
							{
								detail.facilities && detail.facilities.length > 0 ? detail.facilities.map(data => {
									return (
										<ul>
											<li>{data}</li>
										</ul>
									)
								}) : ''
							}
						</div>
						<div>
							<h4>Location</h4>
							<p>{detail.address.street}, {detail.address.city}, {detail.address.country}</p>
							<GoogleMapExample
									containerElement={ <div style={{ height: `300px`, width: '400px' }} /> }
									mapElement={ <div style={{ height: `100%` }} /> }
								/>
						</div>
					</div>
					{this.renderSlider()}
				</React.Fragment>
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
