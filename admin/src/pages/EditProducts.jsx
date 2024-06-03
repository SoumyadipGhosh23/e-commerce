import { useParams } from "react-router-dom"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"
import EditProduct from "../components/Products";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

function EditProducts() {
    const { slug } = useParams()
    const [post, setPosts] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    Cookies.set("editId", post.$id)
                    console.log(post);
                    setPosts({
                        productName: post.productName,
                        category : post.category,
                        des: post.des,
                        price: post.price,
                        color: post.color,
                        size: post.size,
                        badge: post.badge,
                        featuredImage: post.featuredImage,
                        noOfItems : post.noOfItems
                    })
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return (<>
        <Toaster />
        <div className="bodyArea">
            <Container fluid className="">
                <Row>
                    <Col md={3} className="sidebarDv">
                        <Sidebar />
                    </Col>
                    <Col md={9} className="mainDv">
                        <Navbar></Navbar>
                        <div className="innerPages">
                            {post && <EditProduct title = {"Edit Product"} post = {post}/>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>

    );

}

export default EditProducts