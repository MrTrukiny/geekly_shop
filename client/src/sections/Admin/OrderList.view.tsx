import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { ApiError } from '@/types/shared.types';

/* Components */
import Loader from '@/components/Loader.component';
import Message from '@/components/Message.component';

/* Hooks & State */
import { useGetOrdersQuery } from '@/state/slices/order-api.slice';

const OrderListView = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {(error as ApiError).data.message || 'Unexpected error occurred loading Orders. Please try again.'}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user && order.user.email}</td>
                <td>{new Date(order.createdAt as Date).toLocaleString()}</td>
                <td>${order.totalPrice}</td>
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
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListView;
