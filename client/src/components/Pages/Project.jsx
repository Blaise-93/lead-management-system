import  { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../../Mutations/ProjectQueries'
import Spinner from '../Spinner'
import ClientInfo from './ClientInfo'
import DeleteProjectButton from '../DeleteProjectButton'
import EditProject from '../EditProject'


export default function Project() {
  const { id } = useParams();
  const {error, loading, data } = useQuery(GET_PROJECT, {
    variables: { id }
  });

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong</p>

  const { project } = data
  const { name, description, status, client } = project

  return (

    <>{
         !loading && !error && (

          <div className='mx-auto w-75 mt-5 card p-5'>
              <Link to={'/'} className='btn btn-light btn-sm 
              w-25 d-inline ms-auto'> Back</Link>
              <h1> {name } </h1>
              <p> {description } </p>
              <h5 className='mt-3'> { name } </h5 >
              <p className='lead'> {status } </p>

               < ClientInfo client={ client }/>
               <EditProject project={data.project }/>
               <DeleteProjectButton projectId={project.id }/> 
          
          </div>
         )
      }
      
      </>
  )
}
