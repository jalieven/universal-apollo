import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { StaticRouter as Router } from 'react-router-dom'
import Routes from '../src/routes'

export default ({ clientStats }) => (req, res) => {
  const context = {}
  const App = () => (
    <Router location={req.url} context={context}>
      <Routes />
    </Router>
  )
  const app = ReactDOM.renderToString(<App />)
  const chunkNames = flushChunkNames()

  const {
    js, styles, cssHash, scripts, stylesheets
  } = flushChunks(
    clientStats,
    { chunkNames }
  )

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
  )
}
