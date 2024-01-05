import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

/* Components */
import FormContainer from '@/components/FormContainer.component';
import Loader from '@/components/Loader.component';

/* Hooks & State */
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useLoginMutation } from '@/state/slices/auth-api.slice';
import { setCredentials } from '@/state/slices/auth.slice';
import { ApiError } from '@/types/shared.types';

const LoginView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { search } = useLocation();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...user }));
      navigate(redirect);
    } catch (error) {
      if ((error as ApiError).status === 401) {
        return toast.error('Invalid email or password.');
      }
      toast.error('Unexpected error occurred. Please try again.');
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

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

        <Button disabled={isLoading} type="submit" variant="primary">
          Sign In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginView;
