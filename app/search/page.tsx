import { PRICE, PrismaClient } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSidebar from "./components/SearchSidebar";

const prisma = new PrismaClient();

interface SearchParams {city?: string, cuisine?: string, price?: PRICE}

const fetchRestaurantByCity = (searchParams: SearchParams) => {

   const where: any = {};

   if(searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase()
      }
    }
    where.location = location;
   }
   if(searchParams.cuisine){
     const cuisine = {
       name: {
         equals: searchParams.cuisine.toLowerCase(),
       },
     };
     where.cuisine = cuisine;

   }

    if (searchParams.price) {
      const price = {
        
          equals: searchParams.price
        
      };
      where.price = price;
    }



  prisma.restaurant.findMany({

   
    // where: {
    //   location: {
    //     name: {
    //       equals: "toronto",
    //     }
    //   },
    //   cuisine: {
    //     name: {
    //       equals: "mexican",
    //     }
    //   },
    //   price: {
    //     equals: PRICE.CHEAP,
    //   }
    // }
  })
  const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: true,
    location: true,
    price: true,
    slug: true,
  };


  return prisma.restaurant.findMany({
    where,
    select,
  });

 
}

const fetchLocations = async () => {
  return prisma.location.findMany()
}

const fetchCuisines = async () => {
  return prisma.cuisine.findMany();

}


export default async function Search({searchParams}: {searchParams: SearchParams }) {

  const restaurants = await fetchRestaurantByCity(searchParams);
  const location = await fetchLocations();
  const cuisine = await fetchCuisines();

  //console.log({ restaurants });
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar locations={location} cuisines={cuisine} searchParams={searchParams}/>

        <div className="w-5/6">
          {restaurants.length ? (
            <>
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </>
          ) : (
            <p>Sorry, we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </>
  );
}
