import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const productsAPI = "http://localhost:8080/products";
const deleteApi = "http://localhost:8080/product";
const searchAPI = "http://localhost:8080/search"

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get(productsAPI)
      .then((res) => {
        if (res.data && res.status && res.status === 200) {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      })
  }


  const onDeleteSave = (id) => {
    axios.delete(`${deleteApi}/${id}`)
      .then((res) => {
        if (res.data && res.status && res.status === 200) {
          getProducts();
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onSearch = async (e) => {
    let key = e.target.value;
    if (key) {
      try {
        const response = await axios.get(`${searchAPI}/${key}`);
        setProducts(response.data);
      }
      catch (err) {
        console.log("error in search", err);
      }
    }
    else {
      getProducts()
    }
  }

  return (
    <div className='product-list'>
      <h3>Product List</h3>
      <input type="text"
        placeholder='search products'
        className='search'
        onChange={onSearch} />
      <ul>
        <li>s.no</li>
        <li>name</li>
        <li>price</li>
        <li>category</li>
        <li>company</li>
        <li>operation</li>
      </ul>

      {
        products.length > 0 ? products.map((val, index) =>
          <ul key={val._id}>
            <li>{index + 1}</li>
            <li>{val.name}</li>
            <li>{val.price}</li>
            <li>{val.category}</li>
            <li>{val.company}</li>
            <li className='pd'>
              <Button onClick={() => onDeleteSave(val._id)} size='small'>
                Delete
              </Button>
              <Link to={'/Update-product/' + val._id}>
                Update
              </Link>
            </li>
          </ul>

        )
          :
          <h1>No result found</h1>
      }
    </div>
  )
}

export default Products
