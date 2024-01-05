import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ApiError } from '@/types/shared.types';

/* Components */
import FormContainer from '@/components/FormContainer.component';
import Loader from '@/components/Loader.component';
import Message from '@/components/Message.component';

/* Hooks & State */
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '@/state/slices/product-api.slice';

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

const ProductEditView = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId as string);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateProduct({
        productId,
        productData: {
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock,
        },
      }).unwrap();

      toast.success('Product updated');
      refetch();
      navigate('/admin/products');
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status === 401 || apiError.status === 404) {
        return toast.error(apiError.data.message);
      }
      toast.error('Unexpected error occurred updating Product. Please try again.');
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e: React.ChangeEvent<FormControlElement>) => {
    const formData = new FormData();
    formData.append('image', (e as unknown as React.ChangeEvent<HTMLFormElement>).target.files?.[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();

      console.log(res);

      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status === 401 || apiError.status === 400) {
        toast.error(apiError.data.message);
      }
      toast.error('Unexpected error occurred uploading Image. Please try again.');
    }
  };

  return (
    <>
      <Link to="/admin/products" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {(error as ApiError).data.message || 'Unexpected error ocurred loading Product details. Please try again.'}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control onChange={uploadFileHandler} type="file"></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditView;
