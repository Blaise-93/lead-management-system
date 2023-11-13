import Navbar from "../Navbar"
import AddClientModals from "../addClientModals"
import Projects from "../Projects"
import Clients from "../Clients"
import AddProjectModal from "../AddProjectModal"


export default function Home() {


  return (
    <div>
       <div className="container d-flex gap-3 mb-4">

        </div>
        < Navbar />
        <div className="d-flex pl-4 justify-content-space-between align-items-center gap-2">
            < AddClientModals />
            < AddProjectModal />
        </div>
        
        <Projects className=""/>
        <hr/>
        <Clients/>
    </div>
  )
}
