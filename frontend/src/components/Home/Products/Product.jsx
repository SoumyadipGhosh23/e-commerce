/* eslint-disable react/prop-types */

import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { addToWishlist } from "../../../redux/wishList";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";


const Product = (props) => {

  const dispatch = useDispatch();

 
  

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    console.log(productItem);
    console.log(productItem._id);
    navigate(`/product/${productItem._id}`);
  };
  const isAuthenticated = useSelector((state) => state.auth.status);

  const handleAddToCart = ()=>{
    
    if(isAuthenticated){
      dispatch(
        addToCart({
          _id: props._id,
          name: props.productName,
          quantity: 1,
          image: props.img,
          badge: props.badge,
          price: props.price,
          colors: props.color,
          maxQunatity : 5,
        })
      )
      toast.success("Added to cart!")
    }else{
      toast.error("Log In First!")
    }
  }

  const handleAddToWishlist = ()=>{
    if(isAuthenticated){
      dispatch(
        addToWishlist({
          _id: props._id,
          name: props.productName,
          image: props.img,
          badge: props.badge,
          price: props.price,
          colors: props.color
        })
      )
      toast.success("Added to wishlist!")
    }else{
      toast.error("Log In First!")
    }
  }

  
  return (
    <>
    <Toaster/>
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div>
          <Image className="w-full h-full" imgSrc={props.img} />
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li>
            <li

              onClick={handleAddToCart}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li 
            onClick={handleAddToWishlist}
            className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">₹{props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Product;
