import { useState } from "react"
import { GET_PROJECTS, UPDATE_PROJECT} from "../Mutations/ProjectQueries"
import { useMutation } from "@apollo/client"


function EditProject({ project }) {
    const [description, setDescription ] = useState(project.description) 
    const [name, setName ] = useState(project.name) 
    // we used enum in the backend so we can't just update it 
    // as a string => cos it is a choicefield
    const [status, setStatus ] = useState('') 
  


    const [ updateProject ] = useMutation(UPDATE_PROJECT, {
        variables: {id:project.id, name, description, status },
        // refresh the query
        refetchQueries: [{query: GET_PROJECTS, variables: {id: project.id}}]
         
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            if(!name || !description || !status) {
                return alert('please provide all the fields.')
            }

            updateProject( name, description, status );
            setName('');
            setDescription('');
            setStatus('');
        } catch (error) {
            console.log(error)
        }
    }
    console.log(name, description, status)

    return (
            <div className="mt-5">
                <form action=""
                         onSubmit={handleSubmit}>
                    <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" 
                                className='form-control'
                                id='name'
                                name="name"
                                value={ name } 
                                onChange={(e) => setName(e.target.value)}
                            />

                        <label className="form-label">Description</label>
                            <textarea type="text" 
                                className='form-control'
                                id='description'
                                name="description"
                                value={ description } 
                                onChange={ e => setDescription(e.target.value) }>Description
                            </textarea>

                        <label className="form-label">Status</label>
                            <select className="form-select"
                            name="status"
                            value={status} 
                            onChange={e => setStatus(e.target.value)}
                            id="status">
                                <option value="new" className="">Not Started</option>
                                <option value="progress" className="">In Progress</option>
                                <option value="completed" className="">Completed</option>
                            </select>
                        
                    </div>
                    <button type="submit"
                                //data-bs-dismiss="modal" 
                                //data-dismiss="modal" 
                                aria-label="submit"
                                className='btn  btn-primary'>Edit Project
                            </button>
                </form>
            </div>
    )
}

export default  EditProject
