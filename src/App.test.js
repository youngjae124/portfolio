import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio main heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', {
      name: /사용자 흐름과 서비스 구조를 함께 고민하며 성장해온 프로젝트 기록/i,
    })
  ).toBeInTheDocument();
});
