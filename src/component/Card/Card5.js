import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Card5({ title, rating, price, disc, priceDisc, image, minOrder, pack, last }) {
  return (
    <>
      <Link to={""} className="relative">
        {last ?
          <div className="absolute top-[180px] left-[55px] z-10">
            <p className="text-white text-4xl">See All</p>
          </div>
          : null}
        <div className={last ? "brightness-[0.35] transition-all duration-500 ease-in-out hover:brightness-[0.25] bg-white w-[300px] m-2 rounded-lg shadow-lg" : "bg-white w-[300px] m-2 rounded-lg shadow-lg"}>
          <div className="top">
            <img
              className="w-full h-[171px] object-cover rounded-t-lg"
              src={image}
              alt="img"
            />
          </div>
          <div className="bottom flex flex-col justify-center items-start p-3 space-y-7">
            <div className="space-y-3.5">
              <div className="text-base my-1 text-[#2E3A44]">
                {title}
              </div>
              <div className="flex items-center gap-1 text-sm my-1 text-[#FDBE0F]">
                <Star /><span>{rating}</span><span className="text-xs text-[#888888]">(300)</span>
              </div>
            </div>
            <div className="space-y-1.5 pb-5">
              <div className="flex items-center gap-3">
                {priceDisc ? <p className="line-through text-[#A8A8A8] text-[10px]">Rp. {(parseInt(priceDisc).toLocaleString()).replaceAll(',', ".")}</p> : null}
                {disc ? <p className="bg-[#E2FFFC] p-1 text-[10px] text-[#00CDB4] rounded-md">{disc} %</p> : null}
              </div>
             
              <div className="flex items-center">
                <p className="font-semibold text-xl text-[#282828]">Rp {price ? (parseInt(price).toLocaleString()).replaceAll(',', ".") : null}</p>
                {pack ? <p className="text-[#888888] text-sm">/{pack}</p> : null}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
export default Card5;
