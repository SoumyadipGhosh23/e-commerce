import srchIcn from "../assets/srch_icn.png";
import bellIcon from "../assets/bell.png";
import settigsIcon from "../assets/settings.png";
import avtarImg from "../assets/avtar.png";
import logoutIcon from "../assets/signout.png"
import { Form } from "react-bootstrap";


const Navbar = () => {
  




  return (

    <div className="topNav d-flex align-items-center justify-content-between">
      
      <div className="navLeft">
        <div className="searchArea d-flex align-items-center">
          <div className="searchIcon">
            <img
              src={srchIcn}
              className="srchIcon"
              alt="search-Ic0n"
            />
          </div>
          <div className="srchDv">
            <Form.Select aria-label="Default select example" className="custom-select srearchSelect">
              <option>Search</option>
              <option value="1">Search 1</option>
              <option value="2">Search 2</option>
            </Form.Select>

          </div>
        </div>
      </div>
      <div className="nav-right">
        <div className="nabRightcont d-flex align-items-center justify-content-end">
          <div className="notificationDv">
            <div className="noti_cont">
              <div className="notiImage">
                <img
                  src={bellIcon}
                  className="notiIcon"
                  alt="bell_Icon"
                 
                />
              </div>
              <span className="notiNumber">22</span>
            </div>
          </div>
          <div className="settingsDv">
            <div className="settiImage">
              <img
                src={settigsIcon}
                className="settigs_Icon"
                alt="settigs_Icon"
               
              />
            </div>
          </div>
          <div >
            <div className="settiImage">
              <img
                src={logoutIcon}
                alt="logout_Icon"
               
                style={{ cursor: "pointer" }}
                onClick={()=>{}}
                title="Logout"
              />
            </div>
          </div>

          <div className="usrDtlsDv  d-flex align-items-center">
            <div className="usrDtldSec">
              <div className="usrName">
                Welcome, Nabanita
              </div>
              <div className="userStatus">available </div>
            </div>
            <div className="usrImgDv">
              <img
                src={avtarImg}
                className="avtar_image"
                alt="avtar_icon"
                
              />
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Navbar;
