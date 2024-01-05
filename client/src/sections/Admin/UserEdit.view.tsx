import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ApiError } from '@/types/shared.types';

/* Components */
import FormContainer from '@/components/FormContainer.component';
import Loader from '@/components/Loader.component';
import Message from '@/components/Message.component';

/* Hooks & State */
import { useGetUserDetailsQuery, useUpdateUserMutation } from '@/state/slices/user-api.slice';

const UserEditView = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId as string);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateUser({ userId: userId as string, userData: { email, isAdmin } });
      toast.success('User updated successfully');

      refetch();
      navigate('/admin/users');
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status === 401 || apiError.status === 404) {
        return toast.error(apiError.data.message);
      }
      toast.error('Unexpected error occurred updating User. Please try again.');
    }
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setIsAdmin(user.isAdmin as boolean);
    }
  }, [user]);

  return (
    <>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {(error as ApiError).data.message || 'Unexpected error loading User details. Please try again.'}
          </Message>
        ) : (
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

            <Form.Group className="my-2" controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditView;
