import Navbar from "../../components/Navbar";
import Header from "./components/Header";
import RestaurantNavbar from "./components/RestaurantNavbar";
import Ratings from "./components/Ratings";
import Title from "./components/Title";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import Reservation from "./components/Reservation";


export default function RestaurantDetails() {
  return (
    <>
    
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <RestaurantNavbar />
          <Title />
          <Ratings />
          <Description />
          <Images />
          <Reviews />
        </div>
        <div className="w-[27%] relative text-reg">
          <Reservation />
        </div>
     
    </>
  );
}
