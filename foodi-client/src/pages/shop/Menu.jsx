import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  // loading data
  useEffect(() => {
    //fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("/menu.json");
        const data = await response.json();
        //console.log(data);
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Ërror fetching data");
      }
    };
    // call the function
    fetchData();
  }, []);

  //filtering data based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
  };

  //Show all data
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
  };

  // sorting based on A-Z, Z-A, Low-High pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filterItems];

    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
  };
  return (
    <div>
      {/* menu banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col justify-center items-center gap-8">
          {/* texts */}
          <div className="text-center space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl  font-bold md:leading-snug leading-snug">
              For the love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Magyu, Olivas
              Rellens and more for a moderate cost
            </p>
            <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop section */}
      <div className="section-container">
        {/* filtering and sorting  */}
        <div className="pb-16">
          {/* all category btns */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button onClick={showAll}>All</button>
            <button onClick={() => filterItems("salad")}>Salad</button>
            <button onClick={() => filterItems("pizza")}>Pizza</button>
            <button onClick={() => filterItems("soup")}>Soups</button>
            <button onClick={() => filterItems("dessert")}>Desserts</button>
            <button onClick={() => filterItems("drinks")}>Drinks</button>
          </div>
        </div>

        {/* products card */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
