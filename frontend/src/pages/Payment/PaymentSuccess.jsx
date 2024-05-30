import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { saveAs } from 'file-saver';
import LoadingBar from "react-top-loading-bar";
import toast, { Toaster } from "react-hot-toast";
import authService from "../../appwrite/auth";

const PaymentSuccess = () => {
  const [progress, setProgress] = useState(0);
  const [userName, setUserName] = useState("Unknown!");
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");

  // Fetch user name
  const fetchData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        setUserName(userData.name);
      }
    } catch (error) {
      console.error("Fetching data failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch order details
  const getOrder = async () => {
    try {
      if (userName !== "Unknown!") {
        const response = await axios.post("https://e-commerce-backend-hazel.vercel.app/api/getOrderDetails", {
          name: userName,
        });
        if (response) {
          setOrderDetails(response.data);
        } else {
          console.log("Error in getting order details");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // PDF download
  const createAndDownloadPdf = () => {
    if(orderDetails === null || paymentDetails === null){
        toast.error("At first click get all the details button!!!")
    }else{
        setProgress(progress + 33);
    axios
      .post('http://localhost:5000/create-pdf', {
        name: userName,
        razorpay_order_id: paymentDetails.razorpay_order_id,
        razorpay_signature: paymentDetails.razorpay_signature,
        razorpay_payment_id: referenceNum,
        price: orderDetails.price,
        shippingFee: orderDetails.shippingFee,
      })
      .then(() => axios.get('http://localhost:5000/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        setProgress(100);
        saveAs(pdfBlob, 'newPdf.pdf');
        toast.success("PDF Downloaded!");
      });
    }
    
  };

  // Get payment details
  const razorpay_payment_id = String(referenceNum);
  const getPaymentDetails = async () => {
    try {
      setProgress(progress + 33);
      const response = await axios.post("https://e-commerce-backend-hazel.vercel.app/api/getPaymentDetails", {
        razorpay_payment_id: razorpay_payment_id,
      });
      setProgress(100);
      setPaymentDetails(response.data);
    } catch (error) {
      console.error("Error fetching payment details:", error.message);
    }
  };

  // Master function to get all the details
  const getAllDetails = async () => {
    getPaymentDetails();
    getOrder();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 flex items-center justify-center">
      <Toaster />
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4">Order Successful</h1>
        <p className="text-gray-500 mb-4">{referenceNum}</p>
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={getAllDetails}
          >
            Get All the Details
          </button>
        </div>
        {paymentDetails && (
          <div className="mb-4">
            <p className="text-sm">Razorpay Order ID: {paymentDetails.razorpay_order_id}</p>
            <p className="text-sm">Razorpay Signature: {paymentDetails.razorpay_signature}</p>
          </div>
        )}
        {orderDetails && (
          <div className="mb-4">
            <p className="text-sm">Price: {orderDetails.price}</p>
            <p className="text-sm">Shipping Charge: {orderDetails.shippingFee}</p>
          </div>
        )}
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={createAndDownloadPdf}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
