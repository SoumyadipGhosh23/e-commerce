

import {
    
    Nav,
 
} from "react-bootstrap";
import dashboardIcon from "../assets/home.png"
import "./custom.css";
import StorageImg from "../assets/storage.png"

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";



const Sidebar = () => {

    const location = useLocation()
    const navigate = useNavigate()



    return (
        <div className="sidebar_content">
            <div className="sodebarLogo text-center">
                <h3 style={{color : "#000"}}>QShop Admin</h3>
            </div>
            <div className="sidebarMenu">
                <Nav>
                    <Nav.Item>
                        <Nav.Link
                           
                            active={(location.pathname.includes("dashboard") || location.pathname == "/") ? true : false}
                            onClick={()=>{ navigate("/dashboard")}}
                        >
                            <img
                                src={dashboardIcon}
                                className="navImg"
                                alt="dashboard"
                              
                            />
                            <span>Dashboard</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            active={location.pathname.includes("products") ? true : false}
                            onClick={()=>{navigate("/products")}}
                        >
                            <img
                                src={StorageImg}
                                className="navImg"
                                alt="storage"
                              
                            />
                            <span>Add Products</span>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar;
