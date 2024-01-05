import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ApiError } from '@/types/shared.types';

/* Components */
import Loader from '@/components/Loader.component';
import Message from '@/components/Message.component';
import Paginate from '@/components/Paginate.component';

/* Hooks & State */
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '@/state/slices/product-api.slice';

const ProductListView = () => {
  const { page = 1 } = useParams<{ page: string }>();

  const { data, isLoading, error, refetch } = useGetProductsQuery({ page: Number(page) });
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);

        refetch();
      } catch (error) {
        const apiError = error as ApiError;
        if (apiError.status === 401 || apiError.status === 404) {
          return toast.error(apiError.data.message);
        }
        toast.error('Unexpected error occurred. Please try again.');
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct(undefined);

        refetch();
      } catch (error) {
        const apiError = error as ApiError;
        if (apiError.status === 401) {
          return toast.error(apiError.data.message);
        }
        toast.error('Unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {(error as ApiError).data.message || 'Unexpected error ocurred loading Products. Please try again.'}
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product.id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product.id.toString())}>
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={Number(data?.totalPages)} page={Number(data?.page)} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListView;
