import { Alert } from 'react-bootstrap';

type MessageProps = {
  variant?: string;
  children: React.ReactNode;
};

const Message = ({ variant, children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
