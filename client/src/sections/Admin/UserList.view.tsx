import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ApiError } from '@/types/shared.types';

/* Components */
import Loader from '@/components/Loader.component';
import Message from '@/components/Message.component';

/* Hooks & State */
import { useGetUsersQuery, useDeleteUserMutation } from '@/state/slices/user-api.slice';

const UserListView = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);

        toast.success('User deleted');
        refetch();
      } catch (error) {
        const apiError = error as ApiError;
        if (apiError.status === 400 || apiError.status === 401 || apiError.status === 404) {
          toast.error(apiError.data.message);
        }
        toast.error('Unexpected error occurred deleting User. Please try again.');
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {(error as ApiError).data.message || 'Unexpected error deleting User. Please try again.'}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.isAdmin ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />}</td>
                <td>
                  {!user.isAdmin && (
                    <>
                      <LinkContainer to={`/admin/users/${user.id}/edit`} style={{ marginRight: '10px' }}>
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user.id.toString())}>
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListView;
