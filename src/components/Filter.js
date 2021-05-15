import React, {useState} from 'react';
import {Dropdown, ToggleButtonGroup, ToggleButton, ButtonGroup} from 'react-bootstrap';
import { Slider} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import "./Filter.css";


function Filter(){


	// functions for the slider component
	function valuetext(value) {
		return `${value}`;
		}
	const [value, setValue] = React.useState([20, 37]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	//css for the slider using the withStyles function from the MaterialUI library
	const PriceSlider = withStyles({
		root: {
			color: 'aqua',
			height: 8,
		},
		thumb: {
			height: 24,
			width: 24,
			backgroundColor: 'aqua',
			border: '2px solid currentColor',
			marginTop: -8,
			marginLeft: -12,
			'&:focus, &:hover, &$active': {
				boxShadow: 'inherit',
			},
		},
		active: {},
		valueLabel: {
			left: 'calc(-50% + 4px)',
		},
		track: {
			height: 8,
			borderRadius: 4,
		},
		rail: {
			height: 8,
			borderRadius: 4,
		},
	})(Slider);

				return(
				<div>
						<Dropdown as={ButtonGroup} >
				<Dropdown.Toggle id="filter-button">Filter items:</Dropdown.Toggle>
				<Dropdown.Menu className="filter-menu">
				<h3 className="filter-title">Brands:</h3>
								<ToggleButtonGroup type="checkbox"  className="mb-2">
												<ToggleButton id="filter-option" value={'Nike'}>Nike</ToggleButton>
												<ToggleButton id="filter-option" value={'Adidas'}>Adidas</ToggleButton>
												<ToggleButton id="filter-option" value={'The Iconic Drip'}>The Iconic Drip</ToggleButton>
										</ToggleButtonGroup>
								<h3 className="filter-title">Sizes:</h3>
										<ToggleButtonGroup type="checkbox"  className="mb-2">
												<ToggleButton id="filter-option" value={'XS'}>XS</ToggleButton>
												<ToggleButton id="filter-option" value={'S'}>S</ToggleButton>
												<ToggleButton id="filter-option" value={'M'}>M</ToggleButton>
												<ToggleButton id="filter-option" value={'L'}>X</ToggleButton>
												<ToggleButton id="filter-option" value={'XL'}>XL</ToggleButton>
												<ToggleButton id="filter-option" value={'XXL'}>XXL</ToggleButton>
										</ToggleButtonGroup>
								<h3 className="filter-title">Price range:</h3>
										<PriceSlider
												value={value}
												onChange={handleChange}
												valueLabelDisplay="auto"
												aria-labelledby="range-slider"
												getAriaValueText={valuetext}
												min={0}
												max={300}
												step={10}
												marks
										/>
				</Dropdown.Menu>
			</Dropdown>
			{console.log(value)}
				</div>
		)
}

export default Filter;
