import React from 'react';

import { Container } from './styles';

interface Props {
  className?: string;
  title: string;
}

const Tooltip: React.FC<Props> = ({ children, className, title }) => {
  return (
    <Container className={className}>
      <span>{title}</span>
      {children}
    </Container>
  );
};

export default Tooltip;
