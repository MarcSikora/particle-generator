import React from 'react';
import { Component } from 'react';
import './App.css';
import Display from './components/Display';
import PropertiesList from './components/PropertiesList';
import UI from './components/ui/UI';
import ParticleSystem from './graphics/ParticleSystem';

export class App extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			isRunning: true,
			isNameVisible: false,
			backgroundColor: "#403d58",
			particleSystems: [],
			objects2D: [],
			selected: null
		}
		this.psLastId = 0;
		this.objectLastId = 0;

		this.handleChangePropertiesList = this.handleChangePropertiesList.bind(this);
		this.handleChangeBackground = this.handleChangeBackground.bind(this);
		this.handleChangeSourcePosition = this.handleChangeSourcePosition.bind(this);
		this.handleChangePsProperty = this.handleChangePsProperty.bind(this);
		this.handleChangeSelected = this.handleChangeSelected.bind(this);
        this.addParticleSystem = this.addParticleSystem.bind(this);
		
		this.toggleValue = this.toggleValue.bind(this);
	}

	handleChangePropertiesList(propertyName, inputName, value)
	{
		this.setState(state => {
			let type = this.state.selected.type
			let index = this.state.selected.index;
			state[type][index].sett[propertyName][inputName] = value;

			let obj = {};
			obj[type] = state[type];
			return obj;
		})
	}

	handleChangeBackground(value)
	{
		this.setState({backgroundColor: value});
	}

	handleChangeSourcePosition(index, x, y)
	{
		this.setState(state => {
			state.particleSystems[index].sett.source.x = x;
			state.particleSystems[index].sett.source.y = y;
			return {particleSystems: state.particleSystems}
		});
	}

	handleChangePsProperty(index, propertyName, value)
	{
		this.setState(state => {
			state.particleSystems[index][propertyName] = value;
			return {particleSystems: state.particleSystems}
		});
	}

	handleChangeSelected(type, index)
	{
		this.setState({
			selected: {
				type: type,
				index: index,
			}
		});

		this.setState(state => {
			let previous = state.particleSystems.find(ps => ps.isSelected);
			
			if(previous)
				previous.isSelected = false;
			state.particleSystems[index].isSelected = true;

			return {particleSystems: state.particleSystems}
		});
	}

	addParticleSystem()
	{
		this.psLastId++;

		this.setState(state => {
			return {particleSystems: state.particleSystems.concat(new ParticleSystem(this.psLastId))}
		});
	}

	toggleValue(propertyName)
	{
		this.setState(state => {
			let obj = {}
			obj[propertyName] = !state[propertyName];
			return obj
		});
	}

	render()
	{
		return (
			<div className="App">
				<UI 
					toggleValue={this.toggleValue}
					addParticleSystem={this.addParticleSystem}
					particleSystemsCount={this.state.particleSystems.length}
					objectsCount={this.state.objects2D.length}
				></UI>
				<Display 
					{...this.state}
					onChangeSourcePosition={this.handleChangeSourcePosition}
					onChangePsProperty={this.handleChangePsProperty}
					onChangeSelected={this.handleChangeSelected}
				></Display>
				<PropertiesList 
					selected={this.state.selected}
					onChange={this.handleChangePropertiesList}
					onChangeBackground={this.handleChangeBackground}
				></PropertiesList>
			</div>
		);
	}
}

export default App;