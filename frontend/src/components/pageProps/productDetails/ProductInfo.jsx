/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { addToWishlist } from "../../../redux/wishList"
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const ProductInfo = ({ productInfo }) => {
  const isAuthenticated = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (isAuthenticated) {
      dispatch(
        addToCart({
          _id: productInfo._id,
          name: productInfo.productName,
          quantity: 1,
          image: productInfo.img,
          badge: productInfo.badge,
          price: productInfo.price,
          colors: productInfo.color,
          maxQunatity : 5
        })
      )
      toast.success("Added to cart!")
    } else {
      toast.error("Log In First!")
    }
  }

  const addToWishListHandler = () => {
    if (isAuthenticated) {
      dispatch(
        addToWishlist({
          _id: productInfo._id,
          name: productInfo.productName,
          image: productInfo.img,
          badge: productInfo.badge,
          price: productInfo.price,
          colors: productInfo.color,
        })
      )
      toast.success("Added to Wishlist!")
    } else {
      toast.error("Log In First!")
    }
  }


  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-5">
        <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
        <p className="text-xl font-semibold">₹{productInfo.price}</p>
        <p className="text-base text-gray-600">{productInfo.des}</p>
        <p className="text-sm">Be the first to leave a review.</p>
        <p className="font-medium text-lg">
          <span className="font-normal">Colors:</span> {productInfo.color}
        </p>
        <button
          onClick={addToCartHandler}
          className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
        >
          Add to Cart 🛒
        </button>
        <button
          onClick={addToWishListHandler}
          className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
        >
          Add to Wishlist ❤️
        </button>
        <p className="font-normal text-sm">
          <span className="text-base font-medium"> Categories:</span> Spring
          collection, Streetwear, Women Tags: featured SKU: N/A
        </p>
      </div>
    </>

  );
};

export default ProductInfo;
