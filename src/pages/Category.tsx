import { Link } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "../contexts/CategoryContext";

const CategoryComponent = () => {
  // console.log('Products:', products)
  const { state, handleDeleteCategory } = useContext(CategoryContext);
  console.log(state);
  return (
    <div className="mb-[100px]">
      <p className="text-[30px] py-5">List Category</p>
      <div className="m-5 text-start">
        <Link
          className="ml-[30px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          to="/add-cate"
        >
          {/* {' '} */}
          Add Category
        </Link>
      </div>
      <table className="w-full table table-bordered table-striped px-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.categories.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.title}</td>
              <td>{item.slug}</td>
              <td>{item.description}</td>
              <td className="flex justify-evenly content-center items-center">
                <Link
                  to={`/edit-cate/${item._id}`}
                  className="w-[100px] px-5 rounded-xl py-2 bg-red-500 text-white"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDeleteCategory(item._id)}
                  className="w-[100px] px-5 rounded-xl py-2 bg-sky-500 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryComponent;
