import React from 'react';
import { Component } from 'react';
import './App.css';
import Display from './components/Display';
import PropertiesList from './components/PropertiesList';
import UI from './components/ui/UI';
import ParticleSystem from './graphics/ParticleSystem';
import Object2D from './graphics/Object2D';

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

        this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleChangePropertiesList = this.handleChangePropertiesList.bind(this);
		this.handleChangeBackground = this.handleChangeBackground.bind(this);
		this.handleChangePosition = this.handleChangePosition.bind(this);
		this.handleChangeProperty = this.handleChangeProperty.bind(this);
		this.handleChangeSelected = this.handleChangeSelected.bind(this);

        this.addParticleSystem = this.addParticleSystem.bind(this);
        this.addObject2D = this.addObject2D.bind(this);
		this.toggleValue = this.toggleValue.bind(this);
	}

	componentDidMount()
	{
        document.addEventListener("keydown", this.handleKeyDown);
	}

	handleKeyDown(e)
    {
        switch(e.keyCode)
        {
            case 88:    //X
                this.removeSelected();
                break;
            default:
                break;
        }
    }

    removeSelected()
    {
		let type = this.state.selected.type;
		let index = this.state.selected.index;

		this.setState({selected: null});

		this.setState(state => {
			let obj = {};
			obj[type] = state[type].filter((ps, i) => i !== index);
			return obj;
		});
    }

	handleChangePropertiesList(propertyName, inputName, value)
	{
		this.setState(state => {
			let type = this.state.selected.type;
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

	handleChangePosition(grabbed, x, y)
	{
		this.setState(state => {
			if(grabbed.type === "particleSystems")
			{
				state.particleSystems[grabbed.index].sett.source.x = x;
				state.particleSystems[grabbed.index].sett.source.y = y;
			}
			else
			{
				state.objects2D[grabbed.index].sett.x = x;
				state.objects2D[grabbed.index].sett.y = y;
			}
			
			let obj = {};
			obj[grabbed.type] = state[grabbed.type]
			return obj;
		});
	}

	handleChangeProperty(type, index, propertyName, value)
	{
		this.setState(state => {
			state[type][index][propertyName] = value;
			let obj = {};
			obj[type] = state[type];
			return obj;
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
			let previous = state[type].find(ps => ps.isSelected);
			
			if(previous)
				previous.isSelected = false;
			state[type][index].isSelected = true;
			
			let obj = {};
			obj[type] = state[type]
 			return obj;
		});
	}

	addParticleSystem()
	{
		this.psLastId++;

		this.setState(state => {
			return {particleSystems: state.particleSystems.concat(new ParticleSystem(this.psLastId))}
		}, () => {
			this.handleChangeSelected("particleSystems", this.state.particleSystems.length - 1)
		});
	}

	addObject2D()
	{
		this.objectLastId++;

		this.setState(state => {
			return {objects2D: state.objects2D.concat(new Object2D(this.objectLastId))}
		}, () => {
			this.handleChangeSelected("objects2D", this.state.objects2D.length - 1)
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
		let selectedObject = (this.state.selected) ? this.state[this.state.selected.type][this.state.selected.index] : null;
		return (
			<div className="App">
				<UI 
					toggleValue={this.toggleValue}
					addParticleSystem={this.addParticleSystem}
					addObject2D={this.addObject2D}
					particleSystemsCount={this.state.particleSystems.length}
					objectsCount={this.state.objects2D.length}
				></UI>
				<Display 
					{...this.state}
					onChangePosition={this.handleChangePosition}
					onChangeProperty={this.handleChangeProperty}
					onChangeSelected={this.handleChangeSelected}
				></Display>
				<PropertiesList 
					backgroundColor={this.state.backgroundColor}
					selected={this.state.selected}
					selectedObject={selectedObject}
					onChange={this.handleChangePropertiesList}
					onChangeBackground={this.handleChangeBackground}
				></PropertiesList>
			</div>
		);
	}
}

export default App;