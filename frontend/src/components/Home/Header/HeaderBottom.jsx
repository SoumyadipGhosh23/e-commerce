/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../../appwrite/auth";
import toast, { Toaster } from "react-hot-toast";
import LoadingBar from 'react-top-loading-bar';
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";
import { BsSuitHeartFill } from "react-icons/bs";
import appwriteService from "../../../appwrite/productListing.js"

const HeaderBottom = () => {
  //User Logged In or Not
  const [data, setData] = useState("Log In!");
  const [loggedIn, setloggedIn] = useState(false)
  let imageArray = [];
  const fetchData = async () => {
    try {
      const userData = await authService.getCurrentUser();

      if (userData) {
        const firstName = getFirstName(userData.name);
        const userName = "Hello ! " + firstName
        setData(userName);
        setloggedIn(true)
        toast.success("Logged In Successful!!!")
      } else {
        setData("Log In!");
      }
    } catch (error) {
      console.error("Fetching data failed:", error);
    }
  };

  // Function to extract the first name
  const getFirstName = (fullName) => {
    // Assuming names are separated by a space
    const names = fullName.split(' ');

    // Extract the first name
    const firstName = names.length > 0 ? names[0] : '';

    return firstName;
  };
  useEffect(() => {
    fetchData();
  }, []);

  //End

  //log out
  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0);
  const logoutHandler = async () => {
    try {
      setProgress(33);
      await authService.logout();
      dispatch(logout());
      setProgress(100);
      setData("Log In!")
      setloggedIn(false)
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  //end


  const products = useSelector((state) => state.orebiReducer.products);
  const wishlistProducts = useSelector((state) => state.wishlist.wishlist);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref?.current?.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [items, setItems] = useState([])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, items]);

  useEffect(() => {
    (async () => {
      await appwriteService.getPosts([]).then((posts) => {
        console.log(posts.documents);
        posts.documents.map((ele) => {
          imageArray.push(appwriteService.getFilePreview(ele.featuredImage).href)
        })
        console.log(imageArray);
        return posts;
      }).then((posts) => {
        if (posts) {
          const temp = [];
          posts.documents.map((ele, index) => {
            temp.push(
              {
                _id: ele.$id,
                img: imageArray[index],
                productName: ele.productName,
                price: ele.price,
                color: ele.color,
                badge: ele.badge,
                des: ele.des,
              }
            )
          })
          setItems(temp)
        }
      })
        .catch((error) => {
          console.log(error, "Can't fetch products from appwrite server");
        })
    })();
  }, [])

  return (
    <>
      <Toaster />
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="w-full bg-[#F5F5F3] relative">
        <div className="max-w-container mx-auto">
          <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">

            <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative text-gray-50">
              .
            </div>

            <div className="relative  w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl ">
              <input
                className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                type="text"
                onChange={handleSearch}
                value={searchQuery}
                placeholder="Search your products here"
              />
              <FaSearch className="w-5 h-5" />
              {searchQuery && (
                <div
                  className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
                >
                  {searchQuery &&
                    filteredProducts.map((item) => (
                      <div
                        onClick={() =>
                          navigate(
                            `/product/${item.productName
                              .toLowerCase()
                              .split(" ")
                              .join("")}`,
                            {
                              state: {
                                item: item,
                              },
                            }
                          ) &
                          setShowSearchBar(true) &
                          setSearchQuery("")
                        }
                        key={item._id}
                        className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                      >
                        <img className="w-24" src={item.img} alt="productImg" />
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-lg">
                            {item.productName}
                          </p>
                          <p className="text-xs">{item.des}</p>
                          <p className="text-sm">
                            Price:{" "}
                            <span className="text-primeColor font-semibold">
                              ₹{item.price}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-20 cursor-pointer relative">
              < h1 className="font-semibold text-lg">{data}</h1>
              <div onClick={() => setShowUser(!showUser)} className="flex">

                <FaUser />
                <FaCaretDown />
              </div>
              {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 5, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-6 right-3 z-50 w-44 text-[#767676] h-auto p-4 pb-6 bg-black"
                >
                  <Link to="/signin">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer mb-2" style={loggedIn ? { display: `none` } : { display: `block` }}>
                      Login
                    </li>
                  </Link>
                  <Link onClick={() => setShowUser(false)} to="/signup">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer mb-2">
                      Sign Up
                    </li>
                  </Link>

                  <div onClick={logoutHandler} className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer mb-2" style={loggedIn ? { display: `block` } : { display: `none` }}>
                    <li className="text-gray-400  hover:text-white duration-300 cursor-pointer" >
                      Log Out
                    </li>

                  </div>
                  <Link to="http://localhost:5173/">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer mb-2">
                      Access to admin panel
                    </li>
                  </Link>
                 


                </motion.ul>
              )}
              <Link to="/cart">
                <div className="relative">
                  <FaShoppingCart />
                  <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-black text-white">
                    {(products.length > 0 && loggedIn) ? products.length : 0}
                  </span>
                </div>
              </Link>
              <Link to="/wishlist">
                <div className="relative">
                  <BsSuitHeartFill />
                  <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-black text-white">
                    {(wishlistProducts.length > 0 && loggedIn) ? wishlistProducts.length : 0}
                  </span>
                </div>
              </Link>
            </div>
          </Flex>
        </div>
      </div>
    </>

  );
};

export default HeaderBottom;
