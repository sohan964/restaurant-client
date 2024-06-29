import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import desertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  const salad = menu.filter((item) => item.category === "salad");
  console.log(dessert, "\n", pizza, "\n", salad, "\n", offered, "\n", soup);

  return (
    <div>
      <Helmet>
        <title>Online Order | Menu</title>
      </Helmet>
      <Cover img={menuImg} title="Our Menu"></Cover>
      <SectionTitle
        subHeading={"Don't Miss"}
        heading={"To Days Offter"}
      ></SectionTitle>
      <MenuCategory items={offered}></MenuCategory>
      
      {/* for Dessert menu Items */}
      <MenuCategory items={dessert} title="dessert" coverImg={desertImg}></MenuCategory>
      <MenuCategory items={pizza} title="pizza" coverImg={pizzaImg}></MenuCategory>
      <MenuCategory items={salad} title="salad" coverImg={saladImg}></MenuCategory>
      <MenuCategory items={soup} title="soup" coverImg={soupImg}></MenuCategory>
    </div>
  );
};

export default Menu;
