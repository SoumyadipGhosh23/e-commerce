
import { Container, Row, Col, Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import appwriteService from "../appwrite/config"
import { useEffect, useState } from "react";
import DelPng from "../assets/del.png"
import toast, { Toaster } from "react-hot-toast"
import editPng from "../assets/edit.png"
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [data, setdata] = useState([])
  const naviagte = useNavigate()

  useEffect(() => {
    (async()=>{
      await appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          console.log(posts.documents);
          setdata(posts.documents)
        }
      })
    })();
    
  }, [])

  const deletePost = (item) => {
    appwriteService.deletePost(item.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(item.featuredImage);
        toast.success("Deleted")
        setdata([])
      }
    });
  };



  return (

    <>
      <Toaster />
      <div className="bodyArea">
        <Container fluid className="">
          <Row>
            <Col md={3} className="sidebarDv">
              <Sidebar />
            </Col>
            <Col md={9} className=" mainDv">
              <Navbar></Navbar>

              <div className="innerPages">
                <div className="innerHeading d-flex justify-content-between align-items-center">
                  <h1>Product Listing</h1>

                </div>
                <div className="listingTableDv">
                  <div
                    className="listingTable UsrlistingTable"
                  >
                    {data.length == 0 ? (
                      <p className="text-center mt-3">No Data Found</p>
                    ) : (
                      <Table striped bordered hover>
                        <colgroup>
                          <col style={{ width: '5%' }} />
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '5%' }} />
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '25%' }} />
                          <col style={{ width: '5%' }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <th>
                              <span>Sl No.</span>
                            </th>
                            <th>
                              <span>Product Name</span>
                            </th>
                            <th>
                              <span>Category</span>
                            </th>
                            <th>
                              <span>Description</span>
                            </th>
                            <th>
                              <span>Price</span>
                            </th>
                            <th>
                              <span>Color</span>
                            </th>
                            <th>
                              <span>Size</span>
                            </th>
                            <th>
                              <span>Badge</span>
                            </th>
                            <th>
                              <span>Featured Image</span>
                            </th>
                            <th>
                              <span>Actions</span>
                            </th>
                          </tr>
                        </thead>

                        <tbody>

                          {data.map((item, index) => {
                            const isBadge = item.badge;


                            return (
                              <tr key={index} className={item.badge ? "" : "inactive"}>
                                <td>{index + 1}.</td>
                                <td>{item.productName}</td>
                                <td>{item.category}</td>
                                <td>{item.des}</td>
                                <td>₹ {item.price}</td>
                                <td>{item.color}</td>
                                <td>{item.size}</td>
                                <td>
                                  <div className="form-check form-switch ">
                                    <input
                                      className="form-check-input"
                                      onChange={() => { }
                                      }
                                      type="checkbox"
                                      id="flexSwitchCheckChecked"
                                      checked={isBadge}
                                    />

                                  </div>
                                </td>
                                <td><img src={appwriteService.getFilePreview(item.featuredImage)} alt={"image"} className="image-style1"
                                /></td>
                                <td>
                                  <div style={{ display: 'flex' }}>

                                    <img src={editPng} alt="Edit" title="Edit" className="image-style" style={{ cursor: "pointer", marginRight: '1rem' }} onClick={()=> naviagte(`/edit-product/${item.$id}`)} />
                                    <img src={DelPng} alt="Delete" title="Delete" className="image-style" style={{ cursor: "pointer" }} onClick={() => deletePost(item)} />

                                  </div>
                                </td>


                              </tr>
                            );

                          }
                          )}



                        </tbody>
                      </Table>
                    )}

                  </div>

                </div>

              </div>
            </Col>
          </Row>
        </Container>

      </div>
    </>
  );
};

export default Dashboard;
