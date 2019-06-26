![Stylebook](./docs/static/readme-presentation-v01.png)

# Nu's Mini-React

## Motivations

The motivation behind mini-react's is gettin' a job at my dream's company 💜 (kidding).

Mini-react is a library built to basically, test the skills of front-end candidates of nubank, and consists in building interfaces for front-end applications, it was inspired by our beloved [React](https://reactjs.org/).

> Before we begin, lets see the architecture of this application, and how it was built

For this, I decided to use a monorepo file structure so in case we need to evolve the application, we can use the folders and packages (inside packages folder) independently.

Mini-react have 3 main packages, 🔍 lets have a closer look:

Basically, Storybook has a Manager App and a Preview Area.
Manager App is the client side UI for Storybook. Preview Area is the place where the story is rendered. Usually the Preview Area is an iframe.

## 📦 mini-react

The **_mini-react_** package concerns only components creation (Component class) and node parsing (Node) Needs to be used with a specific renderer (like _mini-react-dom_ for instance)

## 📦 mini-react-dom

This package serves as the entry point to the DOM and server renderers. It is intended to be paired with the generic mini-react package (☝️)

## 📦 mini-react-reconciler

When you use React, at a single point in time you can think of the render() function as creating a tree of React elements. On the next state or props update, that render() function will return a different tree of React elements. React then needs to figure out how to efficiently update the UI to match the most recent tree.

This is a very very simple implementation of React's new algorith known as Fiber, it was built based on the [Lin Clark's cartoon](https://www.youtube.com/watch?v=ZCuYPiUIONs) exponation, if you haven't seen yet, it's very cool and fun to watch! (Give her a 👍 after)

## Getting started

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributors](#contributors)
- [License](#license)

## Installation

First of all, you need to install the dependencies used to build the project

```sh
npm install
```

Then, start the project

```js
npm run start
```

## Configuration

Import and add the decorator `withManager` to your `config.js` file (located in the .storybook directory as well).
You' ll need to import the StoriesProvider component too, this is the wrapper components for a custom manager, it'll provide the stories array for you.

```js
import { withManager } from '@stylebook/core/decorators';
import { StoriesProvider } from '@stylebook/core/components';
```

## Usage

You are almost ready to go: with the addon imports now you can create your own manager component wrapped by `StoriesProvider` that will provide the stories for you! The sky is the limit!

```js
// load stories
const req = require.context('../stories', true, /\.stories\.jsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// create a new custom manager
// you can use your own react component or icons - whatever you like!
const newManager = (
  <StoriesProvider>
    {stories => (
      <ul>
        {stories.map(story => (
          <li key={story.kind}>
            <span>{story.kind}</span>
            <ul>
              {story.stories.map(substory => (
                <li key={substory.name}>
                  <button onClick={linkTo(story.kind, substory.name)}>
                    {substory.name}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    )}
  </StoriesProvider>
);

// you can pass some initial configs too
const options = {
  component: newManager,
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  isToolshown: true
};

// pass the new manager for stylebook addon
addDecorator(withManager(options));
// finish storybook configuration
configure(loadStories, module);
```
