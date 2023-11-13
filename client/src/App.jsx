import React from "react";
import  Navbar  from "./components/Navbar";
import {BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer';
import  { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client/'
import NotFound from "./components/Pages/NotFound";
import Home from "./components/Pages/Home";
import Project from "./components/Pages/Project";

const cache = new InMemoryCache( {
     typePolicies: {
          Query: {
               fields: {
                    clients: {
                         merge(existing, incoming) {
                              return incoming;
                         }
                    },
                    projects: {
                         merge(existing, incoming) {
                              return incoming;
                         }
                    }
               }
          }
        }
}
   
)


const client = new ApolloClient({
     uri: 'http://localhost:5000/graphql',
     cache: new InMemoryCache()
     
})

function App() {

    return (
        <div>
         
          <ApolloProvider client={client}>
          <Router>
               <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/projects/:id" element={<Project />} />
               </Routes>
               
              
          </Router>
          </ApolloProvider>
        
          
        </div>

        )
}



export default App