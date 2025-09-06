import { useLoaderData } from 'react-router-dom';

const MenuDetails = () => {
  const { name, category, recipe, price, _id, image } = useLoaderData();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-200">
      <div className="w-full max-w-2xl bg-base-100 rounded-lg shadow-lg p-8">
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover rounded-md mb-6"
        />
        <h2 className="text-3xl font-bold mb-3">{name}</h2>
        <p className="text-base text-gray-500 mb-2">
          <span className="font-semibold">Category:</span> {category}
        </p>
        <p className="text-base text-gray-500 mb-2">
          <span className="font-semibold">ID:</span> {_id}
        </p>
        <p className="text-xl font-semibold text-primary mb-4">
          ${Number(price).toFixed(2)}
        </p>
        <div>
          <span className="font-semibold">Recipe:</span>
          <p className="mt-2">{recipe}</p>
        </div>
      </div>
    </div>
  );
};
export default MenuDetails;