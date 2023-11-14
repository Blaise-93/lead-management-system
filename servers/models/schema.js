
const Client = require('../models/Client')
const Project = require('../models/Projects')
const jwt = require('jsonwebtoken')
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


/** ClientType is a graphql object that handles the fields belonging to the Client 
 * in our database and we use it to manipulate basic CRUd + L operation on our db using
 * mongoose / Mongodb 
 * 
 * Basic fields: `id, name, email, and phone` for collections in our db document.
 * 
 * */     
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
});



/**ProjectType is a graphql object that handles the fields belonging to the Project 
 * in our database and we use it to manipulate basic CRUd + L operation on our db using
 * mongoose / Mongodb 
 * 
 * Basic fields: `id, clientId,name, description, and status` for collections in our db document.
 * 
 * We added a relationship with client-type to our project as a one to many or one to one 
 * relationship mapping in our
 * document. So, each client can be assigned with a project or with many project in our 
 * database. By using their id, you can easily assess which project a given client is given to. 
 * 
 * */   
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

/**
 *  RootQuery is our graphql object which enables us to query all our data in the db schema, eg 
 * Project and Client. We use it to get a single or get all the data via using `GraphQLID or  GraphQLList`, 
 * and passing the type as an arguments to it. We then resolve the respective data with `args` and then used
 * `findbyId() or find() to access the given data lookup.`
 * 
 * for examples:
 * ```javascript
 *  // get client
        client:{
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parentValue, args) {
                return Client.findById(args.id)
            }
        },

    * 
        // get all projects
    projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find()
            }
        }
 * ```
 * 
  */
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
 * 
 * Here, we performed operations like create and delete clients on ClientType to our database
 * via using their respective fields `(name, email, phone )` to achieve that as shown below.
 * 
 * For ProjectType we did something similar but all the basic CRUD + L where done also using the
 * respective resolversand graphql objects to achieve that also. 
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

                //TODO: CASCADE_DELETION:delete project associated with the client too
               // Project.find({clientId: args.id})
                //    .then((projects) => {
                        //loop using foreach to delete the client assigned
                        // to the project
                     //   projects.forEach(project => {
                            // deletes all projects associated with the client
                     //    project;
                     //   });
                   // })
                
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
                        name: "ProjectStatus", // ['Not started', 'In Progress', 'Completed']
                        values: {
                            'new': {value: "Not Started"},
                            'progress': {value: "In Progress"},
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
                        clientId: args.clientId,
                    }
                    
                );    
            }
        },

        // delete a project via mutation

        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID)}

            },
            resolve(parent, args){
               // delete by id of each data that matches the project id
                return Project.findByIdAndRemove(args.id)
            }
        },

        // update a project

        updateProject:{
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID)},
               // no n
                name : {type: GraphQLString},
                description : {type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatusUpdate", // ['Not started', 'In Progress', 'Completed']
                        values: {
                            'new': {value: "Not Started"},
                            'progress': {value: "In Progress"},
                            'completed': {value: "Completed"},
                        }
                        
                    }),
              
                }
            },
            resolve(parent, args) {
                // update by id
                 const updatedProject =  Project.findByIdAndUpdate(
                    args.id,
                    {
                        // set the values of the args to update
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    {new: true }
                    )
                return updatedProject
            }
        }
    },
 });


 
// AUTH Registration 

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
