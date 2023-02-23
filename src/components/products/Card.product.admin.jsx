import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteProduct, setProductToEdit } from "../../data/actions";

const CardProductAdmin = ({ product }) => {
  const dispatch = useDispatch();
  const category = useSelector((state) =>
    state.products.categories.find((e) => e._id === product.category)
  );

  return (
    <div className="col-md-3 bg-dark" key={product._id}  >
      <div className="card rounded-15 mt-4">

        <div className="card-body">
          <p>
            <mark>{(category && category.name) || product.category}</mark>
          </p>
          <div className="dropend b-grid">
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              id={"dropdownMenu" + product._id}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/*<span className="textToReduce">Descripcion</span>*/}
            </button>
            <ul
              className="dropdown-menu bg-secondary"
              aria-labelledby={"dropdownMenu" + product._id}
            >
              <p className="">
                {product.description}
              </p>
            </ul>
          </div>
          
          {/*{product.quantity === 0 ? (
            <button
              onClick={() =>
                toast.warn("Producto agotado. Agrege más productos")
              }
              className="btn btn-warning"
            >
              Agotado
            </button>
          ) : (
            <p>
              <mark>En stock: {product.quantity}</mark>
            </p>
          )}*/}
        </div>
        <div className="card-footer">
          <button
            className="btn btn-danger "
            onClick={() => {
              dispatch(deleteProduct(product._id));
            }}
          >
            Eliminar
          </button>
          <button
            className="btn btn-primary "
            onClick={() => {
              dispatch(setProductToEdit(product));
              window.scrollTo(0, 0);
            }}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductAdmin;
