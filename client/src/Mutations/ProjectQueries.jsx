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


export { GET_PROJECTS, GET_PROJECT, ADD_PROJECTS };