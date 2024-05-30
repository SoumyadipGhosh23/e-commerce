
import Heading from "../Products/Heading.jsx";
import Product from "../Products/Product";
import { useEffect, useState } from "react";
import appwriteService from "../../../appwrite/productListing.js"

const SpecialOffers = () => {
  let imageArray = []
  const [items, setItems] = useState([])

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
          setItems(temp)
        }
      })
        .catch((error) => {
          console.log(error, "Can't fetch products from appwrite server");
        })
    })();
  }, [])

  console.log(items);



  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {items && items.map((item, index) => {
          return (
            <Product
              _id={item._id}
              img={item.img}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={item.badge}
              des={item.des}
              key={index}
            />
          );
        })}
        
      </div>
    </div>
  );
};

export default SpecialOffers;
