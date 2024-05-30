import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ItemWishList from "./ItemWishList";
import { motion } from "framer-motion";
import { emptyCart } from "../../assets/images/index";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/orebiSlice";
import { resetWishlist } from "../../redux/wishList";


function Wishlist() {
    const isAuthenticated = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();
    const WishlistProducts = useSelector((state) => state.wishlist.wishlist);

    const wishlistToCart=()=>{
        if(isAuthenticated){
            WishlistProducts.map((ele)=> dispatch(addToCart({
                _id : ele._id,
                name: ele.name,
                quantity: 1,
                image: ele.image,
                badge: ele.badge,
                price: ele.price,
                colors: ele.colors,
                maxQunatity : 5,
            })))
            toast.success("All Items Added To Cart!!!")
            dispatch(resetWishlist())
        }else{
            toast.error("Log In First!")
        }
    }

    return (
        <div className="max-w-container mx-auto px-7">
            <Breadcrumbs title="Wish List ❤️" />
            {WishlistProducts.length > 0 && isAuthenticated ? (
                <div className="pb-20">
                    <div className=" hidden lg:grid grid-cols-3 w-full h-20 place-content-center px-6 text-lg font-titleFont font-bold" style={{ backgroundColor: "#F5F7F7", color: "#00000" }}>
                        <h2 className="col-span-2">Product</h2>
                        <h2>Add To Cart</h2>
                    </div>
                    <div className="mt-5">
                        {WishlistProducts.map((item) => (
                            <div key={item._id}>
                                <ItemWishList item={item} />
                            </div>
                        ))}
                    </div>

                    <div className="max-w-7xl gap-4 flex justify-end mt-4">
                        <div className="w-96 flex flex-col gap-4">

                            <div className="flex justify-end">

                                <button onClick={wishlistToCart} className="w-52 h-20 bg-primeColor text-white hover:bg-black duration-300 rounded-lg">
                                    Add All Items To Cart
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
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
            Is there nothing you like 🥺
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
                Is there nothing you like 🥺
              </h1>
              <p className="text-sm text-center px-10 -mt-2">
              Your Wishlist yearns for joy! Let it flourish with dreams and desires. Infuse it with the magic of books, the thrill of electronics, the enchantment of videos, and more. Transform your Wishlist into a haven of possibilities, and watch as it radiates happiness with each added treasure. Give your Wishlist a purpose, and let the joy of anticipation fill your digital sanctuary!
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
    );
}

export default Wishlist;
