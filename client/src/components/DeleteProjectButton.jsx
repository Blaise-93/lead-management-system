import { useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { GET_PROJECTS } from "../Mutations/ProjectQueries"
import { useMutation } from "@apollo/client"
import { DELETE_PROJECT } from "../Mutations/ProjectQueries"

function DeleteProjectButton({projectId}) {

    // navigate back to the projects page after successful
    // file deletion
    const navigate = useNavigate()

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: {id: projectId },

        // navigate to homepage
        onCompleted: () => navigate('/'),

        //refresh the query
        refetchQueries: [{ query: GET_PROJECTS }],
       

    }
            
        )

  return (
    <div className="mt-5 d-flex ms-auto">
         <button 
            className="btn btn-danger m-2"
            onClick={ deleteProject }
            >
            <FaTrash className="icon" />
            Delete Project
         </button>
    </div>
  )
}

export default  DeleteProjectButton
