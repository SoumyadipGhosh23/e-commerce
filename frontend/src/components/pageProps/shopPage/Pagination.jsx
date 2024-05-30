/* eslint-disable react/prop-types */
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../Home/Products/Product.jsx";
// import { paginationItems } from "../../../constants";
import { useEffect } from "react";
import appwriteService from "../../../appwrite/productListing.js"
import { useSelector } from "react-redux";


function Items({ currentItems }) {
  return (
    <>
      {currentItems.length > 0 ?
        currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item._id}
              img={item.img}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={item.badge}
              des={item.des}
            />
          </div>
        )) : <h2>Sorry! No Item Found</h2>}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [items, setItems] = useState([])
  let imageArray = [];
  const [godData, setGodData] = useState([])

  const filteredCategory = useSelector(state => state.filteringSlice.category)
  const filteredColor = useSelector(state => state.filteringSlice.color)
  console.log(filteredCategory);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset},`
    // );
    setItemStart(newOffset);
  };

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
          setItems(temp)
          setGodData(temp)
        }
      })
        .catch((error) => {
          console.log(error, "Can't fetch products from appwrite server");
        })
    })();
  }, [])

  useEffect(() => {
    if (filteredCategory != "" && filteredCategory != "All") {
      const filteredItems = godData.filter((ele) => (ele.category == filteredCategory))
      console.log(filteredItems);
      setItems(filteredItems)
    }else if(filteredCategory== "All" || filteredColor == "All"){
      setItems(godData)
    }else if(filteredColor != ""){
      const filteredItems = godData.filter((ele) => (ele.color == filteredColor))
      console.log(filteredItems);
      setItems(filteredItems) 
    }
  }, [filteredCategory, filteredColor])



  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of{" "}
          {items.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
