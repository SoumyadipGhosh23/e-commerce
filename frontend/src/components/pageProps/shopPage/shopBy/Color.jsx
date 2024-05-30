/* eslint-disable react/prop-types */
import { setCategory, setColor } from "../../../../redux/filteringSlice";
import NavTitle from "./NavTitle";
import { useDispatch } from "react-redux";
import "./custom.css"


const Color = () => {
  const dispatch = useDispatch()

  const items = [
    {
      _id: 991,
      title: "Green",
    },
    {
      _id: 992,
      title: "Red",
    
    },
    {
      _id: 993,
      title: "Blue",
    },
    {
      _id: 993,
      title: "Yellow",
    },
    {
      _id: 993,
      title: "White",
    },
    {
      _id: 993,
      title: "Black",
    },
    {
      _id: 993,
      title: "Others",
    },
    {
      _id: 993,
      title: "All",
    },
  ];

  const ColorClicked = (title)=>{
    dispatch(setColor(title))
    dispatch(setCategory(""))
  }
  return (
    <div className="w-full">
      <NavTitle title="Shop by Color" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, title }) => (
            <li
              key={_id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between" style={{cursor: "pointer"}}
              onClick={()=> ColorClicked(title)}
            >
              <div className="container">
              {title} 
              <div className={`circle ${title.toLowerCase()}`}></div>
              </div>
            
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Color;
