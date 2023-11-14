import images from "./Images"
import { useState } from "react"
import {useQuery} from '@apollo/client'
import { GET_PROJECT } from '../Mutations/ProjectQueries'
import { ADD_CLIENT } from '../Mutations/ClientMutations'
import { OpenAI } from 'langchain/llms/openai'
import { SerpAPI } from 'langchain/tools'




function Navbar() {
    const [searchBar, setSearchBar] = useState('')


    function handleChange(e) {
        setSearchBar(e.target.value)
    }
    console.log(searchBar)

    function handleSubmit(e) {
        e.preventDefault();

        try {
           
            
            setSearchBar('')
        } catch (error) {
            alert(error)
        }
    }


    return (
        <nav className="navbar bg-light mb-4 p-0">
            <div className="container mt-5 d-flex ms-auto">
            <a href="/" className="navbar-brand"></a>
                <div className="d-flex">
                     <img className="logo mr-2" src={ images.gallery.logo } alt="logo"  />
                    <div className=" px-2 text-primary">Project Management System</div>

                    <form className=" d-flex ms-auto " action="" onSubmit={handleSubmit}>
                            <div className="mb-3 d-flex align-items-center gap-2">
                                <input type="text" 
                                    className='form-control'
                                    id='name'
                                    value={ searchBar } 
                                    onChange={ handleChange }
                                />
                                <button className="btn btn-primary">
                                    Search
                                </button>
                            </div>
                </form>
                </div>

                
            </div>
           
        </nav>
    )
}

export default Navbar