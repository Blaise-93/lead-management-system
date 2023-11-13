


export default function ProjectCard({ project }) {
  
    const projectURL = `/projects/${project.id}`
    return (
    <div className="col-md-4 mt-3">
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex
                 justify-content-between 
                 align-items-center">
                    <h5 className="card-title">
                        { project.name }
                    </h5>
                    <a className="btn btn-light " href={projectURL} >View</a>
                </div>
                <p className="small"><strong>{ project.status }</strong> 
                </p>
            </div>
        </div>
        
    </div>
  )
}
