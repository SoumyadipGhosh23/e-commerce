import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard.jsx";
import { setAmount } from "../../redux/amountSlice.js";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth.js";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import toast, { Toaster } from "react-hot-toast"



const Cart = () => {

  const [userName, setUserName] = useState("Unknown!");
  const [progress, setProgress] = useState(0)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const [addressEntered, setAddressEntered] = useState(false)

  // get user name:
  const fetchData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      console.log(userData);
      if (userData) {
        setUserName(userData.name);
      }
    } catch (error) {
      console.error("Fetching data failed:", error);
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (firstName && lastName && city && zip) {
      toast.success("Address Submitted Successfully!")
      setAddressEntered(true)
      console.log("Addressed Entered successfully");
    } else {
      toast.error("Enter all the details")
    }


  };

  useEffect(() => {
    fetchData();
  }, []);



  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.status);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  const paymentHandler = async () => {
    if (addressEntered) {
      if (userName !== "Unknown!") {
        try {
          setProgress(progress + 33)
          await axios.post("http://localhost:4000/api/saveOrder", {
            name: userName,
            price: totalAmt,
            shippingFee: shippingCharge
          })
          setProgress(progress + 33)
        } catch (error) {
          console.error("Error saving order details: ", error);
          setProgress(100)
        }
      }
      dispatch(setAmount(totalAmt + shippingCharge))
      setProgress(100)
      navigate("/paymentgateway")
    }else{
      toast.error("Enter shipping address first")
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
      <div className="max-w-container mx-auto px-7">
        <Breadcrumbs title="Cart 🛒" />
        {(products.length > 0 && isAuthenticated) ? (
          <>
            <div className="pb-20">
              <div className=" hidden lg:grid grid-cols-5 w-full h-20 place-content-center px-6 text-lg font-titleFont font-bold" style={{ backgroundColor: "#F5F7F7", color: "#00000" }}>
                <h2 className="col-span-2">Product</h2>
                <h2>Price</h2>
                <h2>Quantity</h2>
                <h2>Sub Total</h2>
              </div>
              <div className="mt-5">
                {products.map((item) => (
                  <div key={item._id}>
                    <ItemCard item={item} />
                  </div>
                ))}
              </div>

              <button
                onClick={() => dispatch(resetCart())}
                className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
              >
                Reset cart
              </button>



              <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
                <div className="flex items-center gap-4">
                  <input
                    className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                    type="text"
                    placeholder="Coupon Number"
                  />
                  <p className="text-sm mdl:text-base font-semibold">
                    Apply Coupon
                  </p>
                </div>
                <p className="text-lg font-semibold">Update Cart</p>
              </div>
              <div className="max-w-7xl gap-4 flex justify-between mt-4">
                <div>
                  <h1 className="text-2xl font-semibold text-left mb-5">Add Address</h1>
                  <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          First Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Jane"
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                        />
                        {firstName === '' && (
                          <p className="text-red-500 text-xs italic">
                            Please fill out this field.
                          </p>
                        )}
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Last Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-city"
                        >
                          Address
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-city"
                          type="text"
                          placeholder="Albuquerque"
                          value={city}
                          onChange={(event) => setCity(event.target.value)}
                        />
                      </div>

                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-zip"
                        >
                          Zip
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-zip"
                          type="text"
                          placeholder="90210"
                          value={zip}
                          onChange={(event) => setZip(event.target.value)}
                        />
                      </div>
                    </div>
                    <button
                    style={{ display: addressEntered ? "none" : "" }}
                      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline-purple focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                <div className="w-96 flex flex-col gap-4">
                  <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
                  <div>
                    <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                      Subtotal
                      <span className="font-semibold tracking-wide font-titleFont">
                        ₹{totalAmt}
                      </span>
                    </p>
                    <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                      Shipping Charge
                      <span className="font-semibold tracking-wide font-titleFont">
                        ₹{shippingCharge}
                      </span>
                    </p>
                    <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                      Total
                      <span className="font-bold tracking-wide text-lg font-titleFont">
                        ₹{totalAmt + shippingCharge}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-end">

                    <button onClick={paymentHandler} className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                      Proceed to Checkout
                    </button>

                  </div>
                </div>
              </div>
            </div>

          </>

        ) : (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
          >
            <div>
              <img
                className="w-80 rounded-lg p-4 mx-auto"
                src={emptyCart}
                alt="emptyCart"
              />
            </div>
            {!isAuthenticated ? <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
              <h1 className="font-titleFont text-xl font-bold uppercase">
                Your Cart feels lonely.
              </h1>
              <p className="text-sm text-center px-10 -mt-2">
                We think you&apos;re not logged in yet!!! What&apos;re you waiting for!!?
              </p>
              <Link to="/signin">
                <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                  Log In
                </button>
              </Link>
            </div> :
              <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
                <h1 className="font-titleFont text-xl font-bold uppercase">
                  Your Cart feels lonely.
                </h1>
                <p className="text-sm text-center px-10 -mt-2">
                  Your Shopping cart lives to serve. Give it purpose - fill it with
                  books, electronics, videos, etc. and make it happy.
                </p>
                <Link to="/shop">
                  <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                    Continue Shopping
                  </button>
                </Link>
              </div>}


          </motion.div>
        )}
      </div>
    </>
  );
};

export default Cart;
