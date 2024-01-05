import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ApiError } from '@/types/shared.types';

/* Components */
import Loader from '@/components/Loader.component';
import Message from '@/components/Message.component';

/* Hooks & State */
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCredentials } from '@/state/slices/auth.slice';
import { useGetMyOrdersQuery } from '@/state/slices/order-api.slice';
import { useUpdateProfileMutation } from '@/state/slices/user-api.slice';

const ProfileView = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userInfo } = useAppSelector((state) => state.auth);

  const { data: orders, isLoading: isLoadingOrders, error } = useGetMyOrdersQuery();
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      const user = await updateProfile({
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(user));
      toast.success('Profile updated successfully');
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status === 400 || apiError.status === 401 || apiError.status === 404) {
        return toast.error(apiError.data.message);
      }
      toast.error('Unexpected error occurred. Please try again.');
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>

          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>

        <h2>My Orders</h2>
        {isLoadingOrders ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {(error as ApiError).data.message || 'Unexpected error ocurred loading Orders. Please try again.'}
          </Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      new Date(order.paidAt as Date).toLocaleString()
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      new Date(order.deliveredAt as Date).toLocaleString()
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order.id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileView;
