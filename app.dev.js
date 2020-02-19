'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./api/lib/resolvers.js')


const app = express()
const port = process.env.port || 3000

// initial schema
const typeDefs = readFileSync(
  join(__dirname, 'api', 'lib', 'schema.graphql'),
  'utf-8'
)
const schema = makeExecutableSchema({typeDefs,resolvers})


//run test service route
app.use('/v1', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

//run server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/v1`)
})
