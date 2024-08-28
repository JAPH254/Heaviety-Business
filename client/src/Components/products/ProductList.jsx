import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../features/products/productActions';
const ProductsList = () => {
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.products);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products?.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded shadow-md">
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
          <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-800 font-bold">${product.price}</p>
          <p className="text-sm text-gray-500">Posted by {product.user_full_name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
