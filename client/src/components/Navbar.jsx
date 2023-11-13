import images from "./Images"


function Navbar() {
    return (
        <nav className="navbar bg-light mb-4 p-0">
            <div className="container">
            <a href="/" className="navbar-brand"></a>
                <div className="d-flex">
                     <img className="logo mr-2" src={ images.gallery.logo } alt="logo"  />
                    <div className=" px-2 text-primary">Project Management System</div>
                </div>
         
            </div>
           
        </nav>
    )
}

export default Navbar