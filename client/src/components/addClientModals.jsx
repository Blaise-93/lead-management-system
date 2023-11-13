import {useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import Spinner from './Spinner'
import { ADD_CLIENT } from '../Mutations/ClientMutations'
import { GET_CLIENTS } from '../ClientsQuery.js/clients'


export default function AddClientModals() {
    const [formData, setFormData] = useState({
        name: "",
        email: '',
        phone: "",

    })
    const [error, setErrors] = useState('')
    const [loading, setLoading] = useState('')

    // destructure the input data
    const {name, email, phone } = formData

    
const [ addClient ] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient} }){

        const { clients } = cache.readQuery({query:GET_CLIENTS});

        cache.writeQuery({
            query: GET_CLIENTS,
            //data: { clients: clients.concat(addClient)}, OR
            data: { clients: [...clients, addClient] }
        })
    }
})

console.log(formData)

   function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
   }


    function handleSubmit(e) {
        if(loading) return <Spinner />
        if(error) return <p>Something went wrong</p>
        e.preventDefault()
        try {
            if(name==="" || email==="" || phone==="") {
                return alert("Please fill in all fields");

            }
            /** Add client via post request  */
            addClient(name, email, phone);
            setFormData({name:'', email: '', phone: ''});
        } catch (error) {
            alert("Something went wrong on your end. Kindly check the\
             form and submit again or refresh your browser.")
        }
    }


    return (
    <div className='container'>

        <button type="button" className="btn btn-secondary" 
        data-toggle="modal" data-target="#addClientModal">
        
            <div className="d-flex align-items-center">
                <FaUser className='icon' /> 
                <div className=" mx-1">Add Client</div>
            </div>
        </button>

        <div className="modal fade" id="addClientModal" tabIndex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Client</h5>
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

                    <label className="form-label">Email</label>
                            <input type="text" 
                            className='form-control'
                            id='email'
                            name="email"
                            value={ email } 
                            onChange={ handleChange }
                        />

                    <label className="form-label">Phone</label>
                            <input type="text" 
                            className='form-control'
                            id='phone'
                            name="phone"
                            value={ phone } 
                            onChange={ handleChange }
                        />
                    </div>
                    <button type="submit"
                        aria-label="submit"
                        className='btn  btn-success'>Submit
                    </button>
                    
                    
                </form>
            </div>
            
            </div>
        </div>
        </div>
            </div>
        )
}
