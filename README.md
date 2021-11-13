# Particle Generator

This application does not serve any specific purpose. It was made just for fun and to show off my React skills. 

Live example: https://marcsikora.github.io/projects/particle-generator/

In order to understand how the app works, please watch short Preview below.

## Preview

https://user-images.githubusercontent.com/93472358/141620347-52b50789-f0e7-47b5-bd3c-64df268f3fc1.mp4

## Structure

![default described](./screenshots/default_described.png)



**Main Buttons** - buttons for main operations (in order from left to right):

![main buttons](./screenshots/main_buttons.png)
* **Play/Pause** - controls whether particles should be generating/moving
* **Add particle system** - adds new ParticleSystem to display
* **Add object** - adds new Object2D to display
* **Toggle names** - shows/hides objects names
* **Toggle gizmos** - shows/hides objects gizmos

**Show/Hide UI** - shows/hides UI with the exception of PropertiesList and bottom bar

**Github link** - link to app's repository

**Manual** - simple manual

**Info** - displays current amount of Objects2D and ParticleSystems

**Properties List** - list of editable properties of selected object

## Manual

![manual](./screenshots/manual.png)

| Key | Description |
|-----|-------------|
| **LMB** | grab/move/select object |
| **D** | duplicate object |
| **X** | remove object |
| **W** | move object layer up |
| **S** | move object layer down |

## Background Properties
![background properties](./screenshots/background.png)
| Property name | Description |
|---------------|-------------|
| **Color** | changes background color |
| **Image** | changes background image |

## Object2D Properties

### General
![object properties](./screenshots/object.png)
| Property name | Description |
|---------------|-------------|
| **Type** | changes object's type(image) |
| **Scale** | changes object's scale |

## Object2D Properties

### General
![object properties](./screenshots/object.png)
| Property name | Description |
|---------------|-------------|
| **Type** | changes object's type(image) |
| **Scale** | changes object's scale |

## ParticleSystem Properties

### Source
![object properties](./screenshots/source.png)
| Property name | Description |
|---------------|-------------|
| **Transparent** | if checked, ParticleSystem source is transparent |
| **Shape** | source's shape |
| **Scale** | source's scale |

### Particles
![object properties](./screenshots/particles.png)
| Property name | Description |
|---------------|-------------|
| **Amount/s** | amount of particles generated per 1 second |
| **Direction** | direction of particles movement (measured in degrees) |
| **Scale over time** | change factor of particles scale over time |

### Particle
![object properties](./screenshots/particle.png)
| Property name | Description |
|---------------|-------------|
| **Image** | particle's image |
| **Scale** | particle's scale |
| **Speed** | particle's speed |
| **Lifespan** | particle's lifespan (measured in seconds) |
| **Emission color** | particle's emission color |
| **Emission radius** | particle's emission radius (measured in pixels) |


## Examples

![example_4](https://user-images.githubusercontent.com/93472358/141646695-5cbc7f81-6166-4016-bf4a-731b95e51b10.png)
![example_5](https://user-images.githubusercontent.com/93472358/141646696-d60fbca5-f69d-4b3b-bfbd-45aeea81b9fa.png)
![example_6](https://user-images.githubusercontent.com/93472358/141646697-017289fc-2b99-4ebb-9e90-985dbed3cc63.png)
![example_1](https://user-images.githubusercontent.com/93472358/141646693-22996d7f-3ce8-429f-8002-aec8081d44fd.png)
