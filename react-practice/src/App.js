// import logo from './logo.svg';
import './App.css';
// Import statement for STATE feature.
import { useState } from 'react';  


// Create user-defined element called 'App'.
// State and Props
// Props is like a argument value and state is like a local variables.
function App() {
  // List for content. --> Make it mutable local variable (state)
  var [mTopics, setTopics] = useState([
    {title: 'HTML', content: 'HTML is not a programming language'},
    {title: 'CSS', content: 'CSS is Cascade Style Sheet'},
    {title: 'JavaScript', content: 'JavaScript is weird'},
    {title: 'React', content: 'React is quite interesting'}
  ]);

  // var contentType = useState('Main');    // Make this variable as State.
  // Functio useState returns array with size of 2;
  var [contentType, setContentType] = useState('Main');
  var contentDisplayed = null;
  var [currentTopic, setCurrentTopic] = useState(null);

  if (contentType === 'Main') {
    contentDisplayed = <Article content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />;
    // setCurrentTopic(null);
  } else if (contentType === 'CREATE') {
    contentDisplayed = <Create onCreate={(title, body) => {
      let tempObject = {title: title, content: body};
      // Title wil be the topic.
      // Get copy of the topics list. (It is not possible to directly modify the list declared above.)
      // Also, it is not possible to add (push) new element to the list that is already declared as a STATE.
      let temp = [...mTopics];    // make a copy of the original data.
      temp.push(tempObject);             // Modify copied data
      setTopics(temp);              // Set copied data as a new value for this variable declared as STATE.
      setContentType(title);
    }}/>;
  } else if (contentType === 'UPDATE') {
    console.log('Test' + currentTopic.title + ' ' + currentTopic.body);
    contentDisplayed = <Update title={currentTopic.title} body={currentTopic.body} onModify={(title, body) => {
      let temp = [...mTopics];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].title === currentTopic.title) {
          temp[i] = {title: title, content: body};
          break;
        }
      }
      setTopics(temp);
      setCurrentTopic(title);
      setContentType(title);
    }} />
  } else {
    // Handles with For loop
    for (let i = 0; i < mTopics.length; i++) {
      let temp = mTopics[i];
      if (temp.title === contentType) {
        contentDisplayed = (
          <div>
            <Article content={temp.content} />
            <input type="button" value="Modify" onClick={(event) => {
              event.preventDefault();
              setCurrentTopic({title: temp.title, body: temp.content});
              setContentType('UPDATE');
            }} />
            <input type="button" value="Delete" onClick={event => {
              event.preventDefault();
              
              // DELETE
              let temp_topic = [...mTopics];
              for (let i = 0; i < temp_topic.length; i++) {
                if (temp_topic[i].title === temp.title) {
                  temp_topic.splice(i, 1);     // Delete element by index.
                  console.log('Current Size: ' + temp_topic.length);
                  break;
                }
              }
              setTopics(temp_topic);
              setCurrentTopic(null);
              setContentType('Main');
            }} />
          </div>
        )
        break;
      }
    }
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
      props.onItemClickListener(index, item.title);
    }}><a href="/">{item.title}</a></li>);
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
    <p className="BodyContent">
      {props.content}
    </p>
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

function Update(props) {
  var [title, setTitle] = useState(props.title);
  var [body, setBody] = useState(props.body);
  return (
    <div>
      <h2>UPDATE</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;

        props.onModify(title, body);
      }}>
        <input className="InputBox" type="text" name="title" value={title} onChange={(event) => {
          setTitle(event.target.value);
        }}/>
        <textarea className="InputBox" name="body" value={body} onChange={(event) => {
          setBody(event.target.value);
        }} />
        <input className="InputBox" type="submit" value="Modify!" />
      </form>
    </div>
  )
}

export default App;
