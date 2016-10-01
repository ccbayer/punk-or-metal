var React = require('react');
var ReactDOM = require('react-dom');
var update = require('react-addons-update');

require('./app/scss/main.scss');

// Firebase
var Rebase = require('re-base');
var fbconfig = {
  apiKey: "AIzaSyAj35Q1YSXIT9xWSCEWuO2DCIxhhJGOqjo",
  authDomain: "punk-or-metal.firebaseapp.com",
  databaseURL: "https://punk-or-metal.firebaseio.com",
  storageBucket: "punk-or-metal.appspot.com",
  messagingSenderId: "247591018468"
};
var base = Rebase.createClass(fbconfig);

var App = React.createClass({
  getInitialState : function() {
      return {
        albums : require('./data/albums.js'),
        matchup : {}
      }
  },
  // setup two way binding between firebase and state
  componentDidMount: function() {
     
     base.syncState('matchups', {
      context: this,
      state: 'matchup'
    });

  },
  loadSampleAlbums: function() {
    this.setState({
      albums : require('./data/albums.js')
    });
  },
  getRandomArrayItem: function(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
  },
  getAlbumsByGenre: function(albums, inGenre) {
    var genreAlbums = [];
    // loop over albums
    var albumKeys = Object.keys(albums);
    for (var i = 0, len = albumKeys.length; i < len; i++) {
      if(albums[albumKeys[i]]['genre'] === inGenre){
        genreAlbums.push(albums[albumKeys[i]]);
      }
    }
    return genreAlbums;
  },
  addAlbum : function(album) {
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.albums['album-' + timestamp] = album;
    // set the state
    this.setState({ albums : this.state.albums });
  },
  castVote: function(key) {
    var currentItem = this.state.matchup[key];

    var updatedItem = update(currentItem, {
      votes: {
        $apply: function(votes) {
          return votes + 1;
        }
      }
    });

    this.state.matchup[key] = updatedItem;
    this.setState({'matchup': this.state.matchup});

    // this.setState({'matchup', updatedItem});

  },
  createMatchup: function() {
    var thisMatchup = {};
    var punkAlbums = this.getAlbumsByGenre(this.state.albums, 'Punk');
    var metalAlbums = this.getAlbumsByGenre(this.state.albums, 'Metal');
    thisMatchup.punk = this.getRandomArrayItem(punkAlbums);
    thisMatchup.metal = this.getRandomArrayItem(metalAlbums);
    thisMatchup.metal.votes = thisMatchup.punk.votes = 0;
    // set state
    this.setState({ matchup : thisMatchup });
  },
  render : function() {
    if(!this.state.matchup.punk) {
      return (
        <div>
          <button onClick={this.createMatchup}>FIGHT</button>
          <AddAlbumForm addAlbum={this.addAlbum} />
        </div>
      )
    } else { 
      return (
        <div>
          <div className="Matchup">
            <ShowMatchup genre="punk" matchup={this.state.matchup.punk} castVote={this.castVote}/>
            - vs - 
            <ShowMatchup genre="metal" matchup={this.state.matchup.metal} castVote={this.castVote}/>
          </div>
          <AddAlbumForm addAlbum={this.addAlbum} />
        </div>
      )
    }
  }
});

var ShowMatchup = React.createClass({
  render : function() {
    if(typeof(this.props.matchup) == 'undefined') {
      return false;
    } else {
      return (
        <div>
          <p>{this.props.genre}</p>
          <ShowAlbum genre={this.props.genre} album={this.props.matchup} castVote={this.props.castVote}/>
        </div>
      )
    }
  }
})

var ShowAlbum = React.createClass({
  voteClick: function() {
    this.props.castVote(this.props.genre);
  },
  render : function() {
    return (
      <div className="album">
        <h1>{this.props.album.artist}</h1>
        <h2>{this.props.album.name}</h2>
        <img src={this.props.album.image} width="150" height="auto"/>
        <p>votes: {this.props.album.votes}</p>
        <button onClick={this.voteClick}>Vote for {this.props.album.name}</button>
      </div>
    )
  }
});

var AddAlbumForm = React.createClass({
  createAlbum: function(event) {
    event.preventDefault();
    var album = {
      name: this.refs.name.value,
      artist: this.refs.artist.value,
      genre: this.refs.genre.value,
      image: this.refs.image.value
    };
    this.props.addAlbum(album);
    // clear form
    this.refs.albumForm.reset();
  },
  render: function() {
    return (
      <form ref="albumForm" id="albumForm" onSubmit={this.createAlbum}>
        <label htmlFor="name">Album Name</label>
        <input type="text" id="name" ref="name"/>
        <label htmlFor="artist">Artist</label>
        <input type="text" id="artist" ref="artist"/>
        <fieldset>
          <legend>Genre</legend>
            <label htmlFor="punk"><input type="radio" ref="genre" id="punk" value="Punk"/>Punk</label>
            <label htmlFor="metal"><input type="radio" ref="genre" id="metal" value="Metal"/>Metal</label>
        </fieldset>
        <label htmlFor="image">Album Artwork (URL)</label>
        <input type="text" id="image" ref="image"/>
        <input type="submit" value="Add Album" className="btn"/>
      </form>
    )
  }
});



ReactDOM.render(<App/>, document.getElementById('body'));
