
const Client = require('../models/Client')
const Project = require('../models/Projects')
// console.log(Object.entries(Client))

const { 
    GraphQLObjectType, 
    GraphQLID,
     GraphQLString,
      GraphQLSchema,
      GraphQLList,
      GraphQLNonNull,
      GraphQLEnumType
      
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
                return Client.find();

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


// Mutations
/** Mutation, variable is a type of operation that can modify server-side data.
 * Such as the basic CRUD + L operation
  */
 const mutation = new GraphQLObjectType({
    name : "Mutation",
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},
             },
             resolve(parent, args){
                // create or add client data
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
                // commit the data to the db
                return client.save()
             }
        },

        // delete client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                // delete by id of each data that matches the client id
                // 
                return Client.findByIdAndDelete(args.id)
            }
        },

        // add projects
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                description: { type: GraphQLNonNull(GraphQLString)},
                status: { 
                    type: new GraphQLEnumType({
                        name: "ProjectStatus",
                        values: {
                            'new': {value: "Not Started"},
                            'progress': {value: "In progress"},
                            'completed': {value: "Completed"},
                        }
                    }),
                    defaultValue: "Not Started",
                },
               // clientId 
               clientId: { type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                // create and save to db
                return Project.create(
                    {
                        name: args.name,
                        description: args.description,
                        status:args.status,
                        clientId: args.clientId
                    }
                )

            },
        },


    },
 });

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
