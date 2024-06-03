import { useEffect, useState } from "react";
import appwriteService from "../../../appwrite/productListing.js"

const ProductsOnSale = () => {
  let imageArray = []
  const [SplOfferData, setSplOfferData] = useState([])

  useEffect(() => {
    (async () => {
      await appwriteService.getPosts([]).then((posts) => {
        console.log(posts.documents);
        posts.documents.map((ele) => {
          imageArray.push(appwriteService.getFilePreview(ele.featuredImage).href)
        })
        return posts;
      }).then((posts) => {
        if (posts) {
          const temp = [];
          posts.documents.map((ele, index) => {
            if (ele.badge) {
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
            }
          })
          setSplOfferData(temp)
        }
      })
        .catch((error) => {
          console.log(error, "Can't fetch products from appwrite server");
        })
    })();
  }, [])
  return (
    <div>
      <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
        Products on sale
      </h3>
      <div className="flex flex-col gap-2" style={{overflowY : "scroll", height: "30rem"}}   >
        {SplOfferData.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2"
          >
            <div>
              <img src={item.img} alt={item.img} style={{height: "7rem", width: "7rem"}}/>
            </div>
            <div className="flex flex-col gap-2 font-titleFont">
              <p className="text-base font-medium">{item.productName}</p>
              <p className="text-sm font-semibold">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
