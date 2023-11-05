import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Card7({ link, title, rating, price, disc, priceDisc, image, minOrder, pack, last, company, minPrice, maxPrice }) {
  return (
    <div className='w-[200px]'>
      {last ?
        <div className="absolute top-[180px] left-[55px] z-10">
          <p className="text-white text-4xl">See All</p>
        </div>
        : null}
      <div className={last ? "brightness-[0.35] transition-all duration-500 ease-in-out hover:brightness-[0.25] bg-white w-[200px] m-2 rounded-lg shadow-lg" : "bg-white w-[200px] m-2 rounded-lg shadow-lg"}>
        <Link to={link ? link : ""} className="relative">
          <div className="top">
            <img
              className="w-[200px] h-[110px] object-cover rounded-t-lg"
              src={image}
              alt="img"
            />
          </div>
          <div className="bottom flex flex-col p-4 space-y-3">
            <div className="flex flex-col">
              <p className=" text-[12px] line-clamp-1 font-semibold">{title}</p>
              <p className="text-start text-[10px] text-dark-4">{company ? company : null}</p>

            </div>
           
            <div className="">
              <div className="flex items-center gap-1 text-[9px] my-1 text-[#FDBE0F]">
                <Star /><span>{rating}</span><span className="text-[9px] text-[#888888]">(300)</span>
              </div>
            </div>
            <div className='flex justify-between w-full items-center'>
              <div>
                <div className="flex items-center gap-3 h-[23px]">
                  {priceDisc ? <p className="line-through text-[#64748B] text-[10px]">Rp. {(parseInt(priceDisc).toLocaleString()).replaceAll(',', ".")}</p> : null}
                  {disc ? <p className="bg-[#FDE5D9] font-[500] p-1 text-[10px] text-[#E6193B] rounded-md">{disc} %</p> : null}
                </div>
                <div className="flex gap-1 items-center">
                  <p className="font-semibold text-[12px]">Rp {price ? (parseInt(price).toLocaleString()).replaceAll(',', ".") : null}</p>
                  {pack ? <p className="text-dark-6 text-[12px]">/{pack}</p> : null}
                </div>
                {/* {minOrder ? <p className="text-[#888888] text-xs">Min. Order {minOrder} pax</p> : null} */}
              </div>
            
            </div>
          </div>
        </Link>
        
      </div>
    </div>
  );
}
export default Card7;
