var React = require('react');
var ReactDOM = require('react-dom');


// for now load some sample data:
var albums = require('./data/albums.js');

var App = React.createClass({
  getInitialState : function() {
      return {
        votes : {},
        albums : {}
      }
  },
  componentDidMount: function () {
    // set initial state:
    if(albums) {
      this.setState({ albums : albums });
    }
  },
  render : function() {
    return (
      <div>
        <Albums/>
      </div>
    )
  }
});

var Albums = React.createClass({
  getRandomAlbums: function() {
    console.log(this.state.albums);
  },
  render : function() {
    return (
      <div className="albums">
        {this.getRandomAlbums}
      </div>
    )
  }
});


ReactDOM.render(<App/>, document.getElementById('body'));
