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
			isGizmoVisible: true,
			background: {
				color: "#403d58",
				image: 0
			},
			objects: [],
			objects2DCounter: 0,
			particleSystemsCounter: 0,
			selected: -1,
			grabbed: {
				index: -1,
				offsetX: 0,
				offsetY: 0
			}
		}
		
		this.psLastId = 0;
		this.objectLastId = 0;

        this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleChangePropertiesList = this.handleChangePropertiesList.bind(this);
		this.handleChangeBackground = this.handleChangeBackground.bind(this);
		this.handleChangePosition = this.handleChangePosition.bind(this);
		this.handleChangeProperty = this.handleChangeProperty.bind(this);
		this.handleChangeSelected = this.handleChangeSelected.bind(this);
		this.handleChangeGrabbed = this.handleChangeGrabbed.bind(this);

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
            case 88:  //X
                this.removeSelected();
                break;
			case 38:  //ArrowUp
				this.moveLayer(1);
                break;
			case 87:  //W
                this.moveLayer(1);
                break;
			case 40:  //ArrowDown
				this.moveLayer(-1);
                break;
			case 83:  //S
                this.moveLayer(-1);
                break;
            default:
                break;
        }
    }

    removeSelected()
    {
		let index = this.state.selected;
		this.setState(state => {
			return {
				selected: null,
				grabbed: {
					index: -1,
					offsetX: 0,
					offsetY: 0
				},
				objects: state.objects.filter((o, i) => i !== index)
			};
		});
    }

	moveLayer(direction)
	{
		let newIndex = direction + this.state.selected;

		if(newIndex >= 0 && newIndex < this.state.objects.length)
			this.setState(state => {
				let moved = state.objects[state.selected];
				state.objects = state.objects.filter((o, i) => i !== state.selected);
				state.objects.splice(newIndex, 0, moved)

				return { objects: state.objects}
			}, () => this.handleChangeSelected(newIndex));
	}

	handleChangePropertiesList(propertyName, inputName, value)
	{
		this.setState(state => {
			let index = this.state.selected;
			state.objects[index].sett[propertyName][inputName] = value;
			return {objects: state.objects};
		})
	}

	handleChangeBackground(inputName, value)
	{
		this.setState(state => {
			state.background[inputName] = value;
			return { background: state.background}
		});
	}

	handleChangePosition(grabbed, x, y)
	{
		this.setState(state => {
			state.objects[grabbed].sett.x = x; 
			state.objects[grabbed].sett.y = y;
			return {objects: state.objects};
		});
	}

	handleChangeProperty(index, propertyName, value)
	{
		this.setState(state => {
			state.objects[index][propertyName] = value;
			return {objects: state.objects};
		});
	}

	handleChangeSelected(index)
	{
		this.setState({selected: index});

		this.setState(state => {
			let previous = state.objects.find(o => o.isSelected);

			if(previous)
				previous.isSelected = false;
			state.objects[index].isSelected = true;
			
			return {objects: state.objects};
		});
	}

	handleChangeGrabbed(index, x, y)
	{
		this.setState({
			grabbed: {
				index: index,
				offsetX: x,
				offsetY: y
			}
		});
	}

	addParticleSystem()
	{
		this.psLastId++;

		this.setState(state => {
			state.particleSystemsCounter++

			return {
				particleSystemsCounter: state.particleSystemsCounter,
				objects: state.objects.concat(new ParticleSystem(this.psLastId))
			}
		}, () => {
			this.handleChangeSelected(this.state.objects.length - 1)
		});
	}

	addObject2D()
	{
		this.objectLastId++;

		this.setState(state => {
			state.objects2DCounter++

			return {
				objects2DCounter: state.objects2DCounter,
				objects: state.objects.concat(new Object2D(this.objectLastId))
			}
		}, () => {
			this.handleChangeSelected(this.state.objects.length - 1)
		});
	}

	toggleValue(propertyName)
	{
		this.setState(state => {
			let obj = {}
			obj[propertyName] = !state[propertyName];
			return obj;
		});
	}

	render()
	{
		let selectedObject = (this.state.selected > -1) ? this.state.objects[this.state.selected] : null;
		return (
			<div className="App">
				<UI 
					toggleValue={this.toggleValue}
					addParticleSystem={this.addParticleSystem}
					addObject2D={this.addObject2D}
					particleSystemsCount={this.state.particleSystemsCounter}
					objectsCount={this.state.objects2DCounter}
				></UI>
				<Display 
					{...this.state}
					onChangePosition={this.handleChangePosition}
					onChangeProperty={this.handleChangeProperty}
					onChangeSelected={this.handleChangeSelected}
					onChangeGrabbed={this.handleChangeGrabbed}
				></Display>
				<PropertiesList 
					background={this.state.background}
					selectedObject={selectedObject}
					onChange={this.handleChangePropertiesList}
					onChangeBackground={this.handleChangeBackground}
				></PropertiesList>
			</div>
		);
	}
}

export default App;