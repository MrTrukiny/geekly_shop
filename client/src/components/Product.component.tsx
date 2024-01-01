import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type ProductProps = {
  id: number;
  name: string;
  image: string;
  price: number;
};

const Product = ({ ...product }: ProductProps) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
