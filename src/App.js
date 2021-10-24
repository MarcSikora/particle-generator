import React from 'react';
import { Component } from 'react';
import './App.css';
import Display from './components/Display';
import PropertiesList from './components/PropertiesList';

export class App extends Component
{
	constructor(props)
	{
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			properties: {
				background: {
					color: "#000"
				},
				source: {
					x: 800, 
					y: 400,
					isTransparent: false,
					isHidden: false,
					shape: 0,
					scale: 1
				},
				particles: {
					amount: 1
				},
				particle: {
					shape: 0,
					color: "#fff",
					scale: 1,
					lifespan: 1,
					emissionColor: "#fff",
					emissionRadius: 1
				}
			}
		}
	}

	handleChange(propertyName, inputName, value)
	{
		this.setState(state => {
			const p = state.properties;
			p[propertyName][inputName] = value;
			return {properies: p}
		}, console.log(this.state.properties))
	}

	render()
	{
		return (
			<div className="App">
				<Display properties={this.state.properties}></Display>
				<PropertiesList onChange={this.handleChange}></PropertiesList>
			</div>
		);
	}
}

export default App;
