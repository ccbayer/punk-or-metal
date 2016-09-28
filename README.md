PUNK *or* METAL?

# Local Development

Local development uses express as a server and webpack to combine libraries for use in the browser.

## Server

Run `node app/app.js`

## Webpack
Run `webpack --progress --colors --watch`

## Run 'em both:
Run `npm run start`

This will run the express server and webpack concurrently. Useful!


# Data Model
## Matchups
```
matchup: {
    first-album: {
        albumID
        votes
    },
    second-album: {
        albumID:
        votes: 
    }
}

```