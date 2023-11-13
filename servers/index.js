require('dotenv').config()
const express = require("express")
const color = require('colors')
const cors = require('cors')

const { graphqlHTTP } = require("express-graphql")
const connectDB = require('../db/connect')

const schema = require('./models/schema')

// The root provides a resolver function for each API endpoint

const app = express()

app.use(cors())
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development'
  })
)

const port = process.env.PORT || 3000

const start = async () => {
        try {
              await connectDB()
            app.listen(port)
            console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`)
        
        } catch (error) {
            console.log({msg: error})
        }
}
start()


