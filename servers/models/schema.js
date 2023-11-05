
const Client = require('../models/Client')
const Project = require('../models/Projects')
// console.log(Object.entries(Client))

const { 
    GraphQLObjectType, 
    GraphQLID,
     GraphQLString,
      GraphQLSchema,
      GraphQLList
      
     } = require('graphql')


const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
});

// projects
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: {type: GraphQLID},
        clientId: {type: GraphQLID },
        name: {type: GraphQLString },
        description: {type: GraphQLString },
        status: {type: GraphQLString },
        // add relationship with client. Thus the 
       
        client: { 
            type: ClientType,
            resolve(parent, args){
                 // client is a child of a project - parent.
                return Client.findById((parent.clientId))
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // get all clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                // db - gotten from our model 
                return Client.findById(parent.clientId);

            }
        },


        // get client
        client:{
            type: ClientType,
            args: {id: {type: GraphQLID}},
            // resolver - what we return to later on
            // args - coming from db
            resolve(parentValue, args) {
                return Client.findById(args.id)
            }
        },

        // projects
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args){
                return Project.findById(args.id)
            }
        },

      
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find()
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})
