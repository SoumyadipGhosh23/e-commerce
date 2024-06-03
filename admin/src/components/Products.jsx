import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import UploadIcon from "../assets/upload-icon.png";
import CrossIcon from "../assets/cross.png";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"
import "./custom.css"
import PropTypes from 'prop-types';
import Cookies from "js-cookie"
import UploadImage from "../assets/UploadImg.png"
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";





const AddLocationSchema = yup.object().shape({
  productName: yup.string().required("Product Name is a required field"),
  category: yup.string().required("Category is a required field"),
  des: yup.string().required("Description is a required field"),
  price: yup.string().required("Price is required field"),
  color: yup.string().required("Color is required field"),
  size: yup.string().required("size is required field"),
  badge: yup.boolean().required(),
  image: yup.string(),
  noOfItems : yup.string().required("No Of Items is a required field")

});

function createSlug(str) {
  // Convert the string to lowercase and replace spaces with hyphens
  return str.toLowerCase().replace(/\s+/g, '-');
}
const Product = ({ title = "Add Product", post }) => {
  const [progress, setProgress] = useState(0)

  const initialValues = {
    productName: "",
    des: "",
    price: "",
    color: "",
    badge: false,
    image: "",
    size: "",
    category: "",
    noOfItems : ""

  };

  const navigate = useNavigate()
  const handleProduct = async (data) => {
    setProgress(progress + 33)
    if (post) {

      const file = data.image ? await appwriteService.uploadFile(data.image) : null;

      if (file) {
        setProgress(progress + 33)
        appwriteService.deleteFile(post.featuredImage)
      }
      const editId = Cookies.get("editId")
      if (editId) {
        console.log(data);
        const dbPost = await appwriteService.updatePost(editId, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          setProgress(100)
          toast.success("Product Edited")
          navigate("/dashboard");
        }
      } else {
        setProgress(100)
        toast.error("Edit Id Not Present! Allow all the Cookies")
      }

    } else {
      const slug = createSlug(data.productName)
      data.slug = slug
      const file = await appwriteService.uploadFile(data.image);

      if (file) {
        setProgress(progress + 33)
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log(data);
        const dbPost = await appwriteService.createPost({ ...data });

        if (dbPost) {
          setProgress(100)
          toast.success("Product Added")
          navigate("/dashboard");
        }
      }
    }

  }

  return (
    <>
      <Toaster />
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Formik
        initialValues={post ? post : initialValues}
        validationSchema={AddLocationSchema}
        onSubmit={handleProduct}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          setFieldValue
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {console.log(values)}
            <div className="tabInner innerPages pt-5">
              <div className="innerHeading">
                <h1>{title}</h1>
              </div>
              <Row>
                <Col md={6}>

                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        autoFocus
                        name="productName"
                        onChange={handleChange}
                        value={values.productName}
                        isValid={touched.productName && !errors.productName}
                        isInvalid={touched.productName && !!errors.productName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.productName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Category</Form.Label>
                      <Form.Select
                        name="category"
                        onChange={handleChange}
                        value={values.category}
                        isValid={touched.category && !errors.category}
                        isInvalid={touched.category && !!errors.category}
                        defaultValue=""
                      >
                        <option disabled value="">Select</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Garments">Garments</option>
                        <option value="Others">Others</option>
                      </Form.Select>

                      <Form.Control.Feedback type="invalid">
                        {errors.category}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""

                        name="price"
                        onChange={handleChange}
                        value={values.price}
                        isValid={touched.price && !errors.price}
                        isInvalid={touched.price && !!errors.price}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.price}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Color</Form.Label>
                      <Form.Select
                        name="color"
                        onChange={handleChange}
                        value={values.color}
                        isValid={touched.color && !errors.color}
                        isInvalid={touched.color && !!errors.color}
                        defaultValue=""
                      >
                        <option disabled value="">Select</option>
                        <option value="Grocery">Green</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Yellow">Yellow</option>
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                        <option value="Others">Others</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.color}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Image</Form.Label>
                      <div className="photo">
                        {
                          values.image && (
                            <div className="photo-upload-crossIcon">
                              <img
                                onClick={() => setFieldValue("image", "")}
                                src={CrossIcon}
                                alt="..."
                                style={{ height: "30px", width: "30px" }}
                              />
                            </div>
                          )
                        }
                        {values.image && (
                          <img
                            src={URL.createObjectURL(values.image)}
                            alt="..."
                            style={{ height: "200px", width: "150px", overflow: "hidden" }}
                          />
                        )}
                        {!values.image && (
                          <div className="photo-upload-userIcon">
                            <img
                              src={UploadImage}
                              alt="..."
                              style={{ height: "150px", width: "150px", overflow: "hidden" }}
                            />
                          </div>
                        )}
                      </div>
                      <Form.Label htmlFor="image" className="upload-btn">
                        <div className="upload-icon">
                          <img
                            src={UploadIcon}
                            alt="..."
                            style={{ height: "10px", width: "10px" }}
                          />
                        </div>
                        Upload
                      </Form.Label>
                      <Form.Control
                        className="photo-input"
                        style={{ display: "none" }}
                        id="image"
                        type="file"
                        placeholder=""
                        key={values.image}
                        autoFocus
                        name="image"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue("image", e.target.files[0]);
                          }
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            // setImagePreview(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }}
                        isValid={touched.image && !errors.image}
                        isInvalid={touched.image && !!errors.image}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.image}
                      </Form.Control.Feedback>
                      <div>{values?.image?.name}</div>
                    </Form.Group>
                  </Col>
                </Col>
                <Col md={6}>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <div className="txtArea1">
                        <Form.Control
                          className="txtArea"
                          as="textarea"
                          type="text"
                          placeholder=""

                          name="des"
                          onChange={handleChange}
                          value={values.des}
                          isValid={touched.des && !errors.des}
                          isInvalid={touched.des && !!errors.des}
                        />
                      </div>
                      <Form.Control.Feedback type="invalid">
                        {errors.des}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Row style={{ marginTop: "1.7rem" }}>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""

                          name="size"
                          onChange={handleChange}
                          value={values.size}
                          isValid={touched.size && !errors.size}
                          isInvalid={touched.size && !!errors.size}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.size}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label></Form.Label>
                        <Form.Check
                          type="checkbox"
                          label="Badge"
                          name="badge"
                          value={values.badge}
                          onChange={handleChange}
                          checked={values.badge}
                          className="badge-checkbox"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>No Of Items</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder=""

                        name="noOfItems"
                        onChange={handleChange}
                        value={values.noOfItems}
                        isValid={touched.noOfItems && !errors.noOfItems}
                        isInvalid={touched.noOfItems && !!errors.noOfItems}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.noOfItems}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>





                </Col>
              </Row>
            </div>
            <div className="border-0 d-flex align-items-center justify-content-end pt-1 pb-3 frmBtns">
              <Button type="submit" className="btn-cust ">
                {post ? "Edit" : "Add"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};


Product.propTypes = {
  post: PropTypes.object,
  title: PropTypes.string,
};
export default Product;
