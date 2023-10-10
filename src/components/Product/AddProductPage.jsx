import React, { useState } from 'react';
import { TextField, Button, Alert, Typography } from '@mui/material';
import axios from 'axios';

const productAPI = 'http://localhost:8080/add-product';

const AddProductPage = () => {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        category: '',
        company: '',
    });
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if all fields are filled
        if (!productData.name || !productData.price || !productData.category || !productData.company) {
            setError(true)
            return false;
        }

        // If all fields are filled, make the API call
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const additionalData = {
            userId: userId,
            ...productData,
        };
        axios
            .post(productAPI, additionalData)
            .then((res) => {
                console.log(res);
                setProductData({
                    name: '',
                    price: '',
                    category: '',
                    company: '',
                });
            })
            .catch((err) => {
                console.log(err, 'error');
            });
    };



    return (
        <>
            <form onSubmit={handleSubmit} className="product-form">
                <center style={{ marginBottom: '10px' }}>Add Product Details</center>
                <TextField
                    label="Name"
                    name="name"
                    value={productData.name}
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    fullWidth
                />
                {error && !productData.name && (
                    <>
                        <Typography sx={{ marginBottom: 1 }}>
                            <Alert severity="error">Name is required!</Alert>
                        </Typography>
                    </>
                )}

                <TextField
                    label="Price"
                    name="price"
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    fullWidth
                />
                {error && !productData.price && (
                    <>
                        <Typography sx={{ marginBottom: 1 }}>
                            <Alert severity="error"> price is required!</Alert>
                        </Typography>
                    </>
                )}
                <TextField
                    label="Category"
                    name="category"
                    value={productData.category}
                    onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                    fullWidth
                />
                {error && !productData.category && (
                    <>
                        <Typography sx={{ marginBottom: 1 }}>
                            <Alert severity="error">category is required!</Alert>
                        </Typography>
                    </>
                )}
                <TextField
                    label="Company"
                    name="company"
                    value={productData.company}
                    onChange={(e) => setProductData({ ...productData, company: e.target.value })}
                    fullWidth
                />
                {error && !productData.company && (
                    <>
                        <Typography sx={{ marginBottom: 1 }}>
                            <Alert severity="error">company is required!</Alert>
                        </Typography>
                    </>
                )}
                <Button type="submit" variant="contained" color="primary">
                    Add Product
                </Button>
            </form>
        </>
    );
};

export default AddProductPage;
