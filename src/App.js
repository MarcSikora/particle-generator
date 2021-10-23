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
				backgroundColor: "red"
			}
		}
	}

	handleChange(name, value)
	{
		console.log(name, value);
		this.setState(state => {
			const p = state.properties;
			p[name] = value;
			return {properies: p}
		})
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
