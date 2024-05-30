/* eslint-disable react/prop-types */
import { setCategory, setColor } from "../../../../redux/filteringSlice";
import NavTitle from "./NavTitle";
import { useDispatch } from "react-redux";


const Category = () => {
  const dispatch = useDispatch()

  const items = [
    {
      _id: 991,
      title: "Grocery",
    },
    {
      _id: 992,
      title: "Electronics",
    
    },
    {
      _id: 993,
      title: "Garments",
    },
    {
      _id: 993,
      title: "All",
    },
  ];

  const categoryClicked = (title)=>{
    dispatch(setCategory(title))
    dispatch(setColor(""))
  }
  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, title }) => (
            <li
              key={_id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between" style={{cursor: "pointer"}}
              onClick={()=> categoryClicked(title)}
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
