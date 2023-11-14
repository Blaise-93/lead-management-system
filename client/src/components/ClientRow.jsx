import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../Mutations/ClientMutations'
import { GET_CLIENTS } from '../ClientsQuery.js/clients'
import { GET_PROJECTS } from '../Mutations/ProjectQueries';



/** ClientRow is a function where we drill our client row props which is being fetched from 
 * database after been mapped through the Client data.
  */
function ClientRow({ client }) {
       
    // delete client hook => useMutation
    // with the help of the id of the client.
    const [ deleteClient ] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        // refetches the query to update the state of the UI
        // this method is not cool for multiple queries
     //  refetchQueries: [{ query: GET_CLIENTS}]

       // update method is better than refetchQuery
    update(cache, {data: { deleteClient }}) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients
                    .filter(client => client.id !== deleteClient.id) },
            });
       } 
    });


    return (
      <>
       {/*   <th scope="row"></th> */}
       <tr>     
                <td>{client.id}</td>
                <td>{client.name }</td>
                <td>{ client.email }</td>
                <td>{client.phone }</td>
                <td>
                    <button className="mx-2 btn btn-danger" 
                     onClick={ deleteClient }>
                        Delete
                        <FaTrash/>
                    </button>
                </td>
            </tr>
      </>
         
       
    )
}

export default ClientRow