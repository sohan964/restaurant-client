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
  const seekh = menu.filter((item) => item.category === "seekh");
  const boti = menu.filter((item) => item.category === "boti");
  const reshmi = menu.filter((item) => item.category === "reshmi");
  const shami = menu.filter((item) => item.category === "shami");
  const shik = menu.filter((item) => item.category === "shik");
  console.log(seekh, "\n", reshmi, "\n", shik, "\n", shami, "\n", boti);

  return (
    <div className="">
      <Helmet>
        <title>Online Order | Menu</title>
      </Helmet>
      <Cover img={menuImg} title="Our Menu"></Cover>
      <SectionTitle
        subHeading={"Don't Miss"}
        heading={"To Days Offter"}
      ></SectionTitle>
      <MenuCategory items={shami}></MenuCategory>
      
      {/* for Dessert menu Items */}
      <MenuCategory items={seekh} title="seekh" coverImg={desertImg}></MenuCategory>
      <MenuCategory items={reshmi} title="reshmi" coverImg={pizzaImg}></MenuCategory>
      <MenuCategory items={shik} title="shik" coverImg={saladImg}></MenuCategory>
      <MenuCategory items={boti} title="boti" coverImg={soupImg}></MenuCategory>
    </div>
  );
};

export default Menu;
