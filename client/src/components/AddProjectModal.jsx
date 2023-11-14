import { useState } from "react";
import { FaList } from 'react-icons/fa'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CLIENTS } from '../ClientsQuery.js/clients'
import { ADD_PROJECTS, GET_PROJECTS } from "../Mutations/ProjectQueries";


const  AddProjectModal = () => {


    const { loading, error, data } = useQuery(GET_CLIENTS)
 

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: 'new',
        clientId: ""
    })
   // const [clientId, setClientId ] = useState('')
    // destructure the input data
    const {name, description, status, clientId } = formData


   function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
   }

        
   const [ addProject ] = useMutation(ADD_PROJECTS, {
    //variables to add the project
    variables: { name, description, status, clientId },
   // update the cache 
    update(cache, { data: { addProject} }){
        const { projects } = cache.readQuery({query:ADD_PROJECTS});
       //write to the cache
        cache.writeQuery({
            query: GET_PROJECTS,
            //data: { projects: projects.concat(addClient)}, OR
            data: { projects: [...projects, addProject ] }
        })
    }
    
})


   /** Function that enables us to post the add project via event handler of JS functionality 
    * when the user clicks the form button.
    */
    function handleSubmit(e) {
        e.preventDefault();
        try {
            if(name==="" || description==="" || status==="" 
                || clientId === '') {
                return alert("Please fill in all fields");

            }
            
            /** Add project via post request  */
            addProject(name, description, clientId, status );
            
            // empty the form input after submission
            setFormData({name: '', description: '', status: 'new', clientId: ''})
            //setClientId('')
        } catch (error) {
            console.log(error)
        }

    }
    console.log(formData)
  

    if(loading) return null;
    if(error) return <p>Something went wrong</p>
   

    return (
      
    <div className='container'>
          {!loading && !error && (
             <>
                <button type="button" className="btn btn-primary" 
                    data-toggle="modal" data-target="#addProjectModal">
                    
                    <div className="d-flex align-items-center">
                        <FaList className='icon' /> 
                        <div className=" mx-1">New Project</div>
                    </div>
                </button>

                <div className="modal fade" id="addProjectModal" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Project</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" 
                                    className='form-control'
                                    id='name'
                                    name="name"
                                    value={ name } 
                                    onChange={ handleChange }
                                />

                            <label className="form-label">Description</label>
                                <textarea type="text" 
                                    className='form-control'
                                    id='description'
                                    name="description"
                                    value={ description } 
                                    onChange={ handleChange }>Description
                                </textarea>

                            <label className="form-label">Status</label>
                                <select className="form-select"
                                name="status"
                                value={status} 
                                onChange={ handleChange }
                                id="status">
                                    <option value="new" className="">Not Started</option>
                                    <option value="progress" className="">In Progress</option>
                                    <option value="completed" className="">Completed</option>
                                </select>
                                <div className="mb-3">
                                    <label  className="form-label">Client</label>
                                    <select 
                                        name="clientId" 
                                        id="clientId" 
                                        className="form-select"
                                        value={ clientId } onChange={ handleChange }>
                                            <option value={clientId} >
                                                Select Client</option>
                                                {
                                                     data.clients
                                                     .map(client =>
                                                       <option key={client.id} 
                                                               value={client.id} 
                                                               className="">
                                                               {client.name}
                                                       </option>
                                                    )
                                                }
                                        </select>
                                </div>
                            </div>
                            <button type="submit"
                                //data-bs-dismiss="modal" 
                                //data-dismiss="modal" 
                                aria-label="submit"
                                className='btn  btn-primary'>Submit
                            </button>
                            
                        </form>
                    </div>
                    
                    </div>
                </div>
                </div>
             </>
          ) }
    
    </div>
  )
}

export default AddProjectModal