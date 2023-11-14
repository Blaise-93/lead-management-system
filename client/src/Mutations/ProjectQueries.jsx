import { gql } from "@apollo/client";


const GET_PROJECTS = gql`
    query getProjects {
        projects {
            id
            name
            status
         
        }
    }

`
const GET_PROJECT = gql`
    query getProject($id:ID!) {
        project(id:$id){
            id
            name
            description
            status
            client {
                id
                name
                email 
                phone 
            }
        }
    }

`


// add project
const ADD_PROJECTS = gql`
    mutation AddProject($name:String!, $description:String!, 
        $status:ProjectStatus!, $clientId:ID!) {
            addProject(name:$name, description:$description, status: $status, clientId:$clientId) {
                    id
                    name
                    description
                    status
                    client  {
                         id
                         name
                         email
                         phone 

                    }
            }
        }
        `;

const DELETE_PROJECT = gql`
        mutation DeleteProject($id:ID!) {
            deleteProject(id:$id) {
                id
            }
        }

`;

/* {
    "query": "mutation ($id: ID!, $description: String!, $status: ProjectStatusUpdate!) {
      updateProject(id: $id, description: $description, status: $status) {
        id
        description
        status
      }
    }",
    "variables": {
      "id": "123",
      "description": "A new description for the project",
      "status": "COMPLETED"
    }
  }
   */


// update project
const UPDATE_PROJECT = gql`
    mutation UpdateProject(
          $id:ID!
          $name:String!
          $description:String! 
          $status:ProjectStatusUpdate! 
        ) {
            updateProject(
                id: $id
                name:$name
                description:$description
                status: $status
                
                ) {
                    id
                    name
                    description
                    status
                    client  {
                         id
                         name
                         email
                         phone 

                    }
            }
        }
        `;



export { GET_PROJECTS, GET_PROJECT, ADD_PROJECTS, 
        DELETE_PROJECT, UPDATE_PROJECT };