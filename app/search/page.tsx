import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Navbar from "../components/Navbar";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSidebar from "./components/SearchSidebar";

const prisma = new PrismaClient();

const fetchRestaurantByCity = (city: string | undefined) => {

  const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: true,
    location: true,
    price: true,
    slug: true,
  };
  if(!city) return prisma.restaurant.findMany({select});

  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city,
        },
      },
    },
    select,
  });

 
}

const fetchLocations = async () => {
  return prisma.location.findMany()
}

const fetchCuisines = async () => {
  return prisma.cuisine.findMany();

}


export default async function Search({searchParams}: {searchParams: {city: string}}) {

  const restaurants = await fetchRestaurantByCity(searchParams.city);
  const location = await fetchLocations();
  const cuisine = await fetchCuisines();

  //console.log({ restaurants });
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar locations={location} cuisines={cuisine}/>

        <div className="w-5/6">
          {restaurants.length ? (
            <>
              {restaurants.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} />
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
