import { useQuery } from '@apollo/client'
import ClientRow from './ClientRow'
import { GET_CLIENTS } from '../ClientsQuery.js/clients'
import Spinner from './Spinner'

const Clients = () => {
    // useQuery - is our context manager just like useContext in react to handle 
    // states
    const { loading, error, data } = useQuery(GET_CLIENTS)

    if (loading) return <Spinner />
     
    if(error) return <p>Something went wrong. Kindly refresh your page.</p>

    return (
        <div className="container">
            {!loading && !error && 
                (
                <div className="table-responsive">
                    <table className='table 
                        table-responive table table-dark
                        table-responsive-sm  table-responsive-md 
                        table-responsive-lg  table-responsive-xl 
                        table-bordered table table-hover mt-3'>
                            <thead className='table-primary '>
                                <tr>
                                    <th scope="col">S/N</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { data.clients.map(client => (
                                    <ClientRow key={client.id} client={ client } />
                                ))}
                            </tbody>
                        </table>
                 </div>

              
                )
             }
        </div>
    )

}

export default Clients