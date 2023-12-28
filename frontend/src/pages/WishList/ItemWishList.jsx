/* eslint-disable react/prop-types */

import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { deleteWishlist } from "../../redux/wishList";
import { addToCart } from "../../redux/orebiSlice";
import toast from "react-hot-toast";

const ItemWishList = ({ item }) => {
    const dispatch = useDispatch();
    const singleItemWishlistToCart = () => {
        dispatch(addToCart({
            _id: item._id,
            name: item.name,
            quantity: 1,
            image: item.image,
            badge: item.badge,
            price: item.price,
            colors: item.colors,
            maxQunatity: 5,
        }))
        dispatch(deleteWishlist(item._id))
        toast.success("Added to Cart!")
    }

    return (
        <div className="w-full grid grid-cols-3 mb-4 border py-2">
            <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
                <ImCross
                    onClick={() => dispatch(deleteWishlist(item._id))}
                    className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
                />
                <img className="w-32 h-32" src={item.image} alt="productImage" />
                <h1 className="font-titleFont font-semibold">{item.name}</h1>
            </div>


            <div className="flex w-1/3 items-center text-lg font-semibold">
                <button onClick={singleItemWishlistToCart} className="bg-gray-800 text-white px-7 py-2 rounded-full hover:bg-gray-700 transition duration-300 ease-in-out">
                    🛍️ Buy !
                </button>
            </div>


        </div>
    );
};

export default ItemWishList