import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration
} from "react-router-dom";
import { useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./redux/authSlice";
import { useDispatch } from "react-redux";
import appwriteService from "./appwrite/productListing.js"

import Header from './components/Home/Header/Header'
import HeaderBottom from "./components/Home/Header/HeaderBottom";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import Shop from "./pages/shop/Shop";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/WishList/Wishlist";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Offer from "./pages/Offer/Offer";
import Footer from "./components/Home/Footer/Footer";
import FooterBottom from "./components/Home/Footer/FooterBottom";
import Chatbot from "./components/Chatbot";
import { setImageArray, setProducts } from "./redux/allProducts.js";

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Chatbot />
      <Footer />
      <FooterBottom />

    </div>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/wishlist",
        element: <Wishlist />
      },
      {
        path: "/paymentgateway",
        element: <Payment />
      },
      {
        path: "/product/:_id",
        element: <ProductDetails />
      },
      {
        path: "/offer",
        element: <Offer />
      }
    ]
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  }, {
    path: "/paymentsuccess",
    element: <PaymentSuccess />
  }
])


function App() {
  let imageArray = [];
  const dispatch = useDispatch()
  //Name of the web page
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Toggle between the original title and a custom blinking text
      document.title = document.title === 'QShop : Best E-Commerce website in India' ? 'Special Offer Available upon ₹1500 Shopping' : 'QShop : Best E-Commerce website in India';
    }, 3000);
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    authService.getCurrentUser().then(
      (userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      }
    )
  }, [])

  useEffect(() => {
    (async () => {
      await appwriteService.getPosts([]).then((posts) => {

        posts.documents.map((ele) => {
          imageArray.push(appwriteService.getFilePreview(ele.featuredImage).href)
        })
       
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
                category: ele.category
              }
            )
          })
          dispatch(setProducts(temp))
          dispatch(setImageArray(imageArray));
        }
      })
        .catch((error) => {
          console.log(error, "Can't fetch products from appwrite server");
        })
    })();
  }, [])


  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
