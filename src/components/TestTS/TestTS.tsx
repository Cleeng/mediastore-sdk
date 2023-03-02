import { TestTSProps } from './TestTS.types';

const TestTS = ({ title, paragraph }: TestTSProps) => (
  <aside>
    <h2>{title}</h2>
    <p>{paragraph}</p>
  </aside>
);

export default TestTS;
