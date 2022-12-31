// import logo from './logo.svg';
import './App.css';
// Import statement for STATE feature.
import { useState } from 'react';  


// Create user-defined element called 'App'.
// State and Props
// Props is like a argument value and state is like a local variables.
function App() {
  // List for content. --> Make it mutable local variable (state)
  var [mTopics, setTopics] = useState(['HTML', 'CSS', 'JavaScript', 'React']);

  // var contentType = useState('Main');    // Make this variable as State.
  // Functio useState returns array with size of 2;
  var [contentType, setContentType] = useState('Main');
  var contentDisplayed = null;

  /*
    const _mode = useState('Main);
    const mode = _mode[0];    // 0 element: current mode (state)
    const setMode = _mode[1]; // 1 element: function that is used to modify current mode (state)
  */
  if (contentType === 'Main') {
    contentDisplayed = <Article content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />;
  } else if (contentType === 'HTML') {
    contentDisplayed = <Article content={contentType + ' is not a programming language'}/>;
  } else if (contentType === 'CSS') {
    contentDisplayed = <Article content="CSS is Cascade Style Sheet" />;
  } else if (contentType === 'JavaScript') {
    contentDisplayed = <Article content="JavaScript is weird" />;
  } else if (contentType === 'React') {
    contentDisplayed = <Article content="React is quite intersting" />;
  } else if (contentType === 'React') {
    contentDisplayed = <Article content="React is quite intersting" />;
  } else if (contentType === 'CREATE') {
    contentDisplayed = <Create onCreate={(title, body) => {
      // Title wil be the topic.
      // Get copy of the topics list. (It is not possible to directly modify the list declared above.)
      // Also, it is not possible to add (push) new element to the list that is already declared as a STATE.
      const temp = [...mTopics];    // make a copy of the original data.
      temp.push(title);             // Modify copied data
      setTopics(temp);              // Set copied data as a new value for this variable declared as STATE.
      setContentType(title);
    }}/>;
  } else {
    contentDisplayed = <Article content="Null" />;
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Header title="REACT" onClickListener={function() {
        alert('Click Event Detected');
      }} />
      <div>
      <input type="button" value="Create" onClick={(event) => {
        event.preventDefault();
        setContentType('CREATE');
      }}></input>
      </div>
      <Grid 
        navigationBar={
          <NumberedList list={mTopics} onItemClickListener={(key, element) => {
            alert(key + ' ' + element + ' Selected.');
            setContentType(element);
          }} />
        }
        contentArea={
          contentDisplayed
        } />
    </div>
  );
}
// <ElementName /> expression is equal to <ElementName></ElementName>

// Declare user-defined element. (Example)
// props: special parameter object that accepts input values for the
// custom-defined element.
function Header(props) {
  return (
    <header>
      {/* event is a special (reserved) object that contains various method and attributes to handle the event. */}
      <h1 onClick={(event) => {
        event.preventDefault();
        props.onClickListener();
      }}><a href="/">{props.title}</a></h1>
    </header>
  );
}

function Grid(props) {
  return (
    <div className="Grid">
      {props.navigationBar}
      {props.contentArea}
      {/* <div id="NavigationBar">
            <NumberedList list={['HTML', 'CSS', 'JavaScript', 'React']} onItemClickListener={(key, element) => {
              alert(key + ' ' + element + ' Selected.');
            }} />
      </div>
      <Article content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum." /> */}
    </div>
  );
}

function NumberedList(props) {
  var result = [];
  props.list.forEach((item, index) => {
    result.push(<li key={index} onClick={event => {
      event.preventDefault();
      props.onItemClickListener(index, item);
    }}><a href="/">{item}</a></li>);
  })
  return (
    <div className='NavigationBar'>
      <ol>
        {result}
      </ol>
    </div>
  )
}

function Article(props) {
  return (
    <div className="ContentArea">
      <p>
        {props.content}
      </p>
    </div>
  )
}

function Create(props) {
  return (
    <div>
      <h2>Create</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <input className="InputBox" type="text" name="title" placeholder="title" />
        <textarea className="InputBox" name="body" placeholder="body" />
        <input className="InputBox" type="submit" value="Create!" />
      </form>
    </div>

  )
}

export default App;

