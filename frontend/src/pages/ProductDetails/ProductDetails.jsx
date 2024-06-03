import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo.jsx";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale.jsx";
import service from "../../appwrite/productListing.js";

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const [imageURL, setImageURL] = useState("")

  function getLastSegment(urlPath) {
    // Split the URL path by slashes
    const segments = urlPath.split('/');

    // The last segment will be the last element in the array
    return segments.pop();
  }

  useEffect(() => {
    setPrevLocation(location.pathname);
  }, [location, productInfo]);

  console.log(location.pathname);

  useEffect(() => {
    (async () => {
      const slug = getLastSegment(location.pathname)
      await service.getPost(slug).then(async (post) => {
        if (post) {
          console.log(post);
          const imageURL = await service.getFilePreview(post.featuredImage).href;
          console.log(imageURL);
          setImageURL(imageURL)
          setProductInfo(post)
        }
      })
    })();

  }, [location.pathname])

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full">
            <ProductsOnSale />
          </div>
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full object-cover"
              src={imageURL}
              alt={"image"}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} imageURL = {imageURL}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
