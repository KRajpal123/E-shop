import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';


const updateProductAPI = 'http://localhost:8080/product';


const UpdateProduct = () => {
    const [updateProductData, setUpdateProductData] = useState({
        name: '',
        price: '',
        category: '',
        company: '',
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    },[]);

    const onUpdateProductData = (e) => {
        e.preventDefault();
        axios.put(`${updateProductAPI}/${params.id}`, updateProductData)
            .then((res) => {
              navigate('/products')
            })
            .catch((err) => {
                console.log("error updating data",err); 
            })
    }

    // get user selected data & showing as default value
    const getProductDetails = () => {
        axios.get(`${updateProductAPI}/${params.id}`)
            .then((res) => {
                setUpdateProductData({
                    name: res.data.name,
                    price: res.data.price,
                    category: res.data.category,
                    company: res.data.company
                })
            })
            .catch((error) => {
                console.log("error fetching data",error)
            });
    }

    return (
        <>
            <form onSubmit={onUpdateProductData} className="product-form">
                <center style={{ marginBottom: '10px' }}>Update Product Details</center>
                <TextField
                    label="Name"
                    name="name"
                    value={updateProductData.name}
                    onChange={(e) => setUpdateProductData({ ...updateProductData, name: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Price"
                    name="price"
                    value={updateProductData.price}
                    onChange={(e) => setUpdateProductData({ ...updateProductData, price: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Category"
                    name="category"
                    value={updateProductData.category}
                    onChange={(e) => setUpdateProductData({ ...updateProductData, category: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Company"
                    name="company"
                    value={updateProductData.company}
                    onChange={(e) => setUpdateProductData({ ...updateProductData, company: e.target.value })}
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Update Product
                </Button>
            </form>
        </>
    );
};

export default UpdateProduct;
