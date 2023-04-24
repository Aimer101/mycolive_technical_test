import React from 'react';
import { Container, Progress } from '.';
import { ProgressProps } from '../../constants/type';

const ProgressBar: React.FC<ProgressProps> = ({ progress }) => {

  return (
    <Container>
      <Progress progress={progress * 10} />
    </Container>
  );
};

export default ProgressBar;
