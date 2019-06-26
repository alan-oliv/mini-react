import MiniReactDOM from 'mini-react-dom';
import { TEXT_ELEMENT } from '../constants';

const { propsUpdate, createElement } = MiniReactDOM;

describe('DOM', () => {
  const textFiber = { type: TEXT_ELEMENT };
  const textElement = createElement(textFiber);

  const htmlFiber = { type: 'div' };
  const htmlElement = createElement(htmlFiber);

  describe('createElement', () => {
    it('should create a new text element', () => {
      expect(textElement).toBeInstanceOf(Text);
    });

    it('should create a new element', () => {
      expect(htmlElement).toBeInstanceOf(HTMLElement);
    });
  });

  describe('propsUpdate', () => {
    it('should add or update props to dom', () => {
      expect(htmlElement.value).toBeFalsy();

      propsUpdate(htmlElement, {}, { value: 'foo' });
      expect(htmlElement.value).toBeTruthy();
    });

    it('should only update the props', () => {
      expect(htmlElement.value).toBe('foo');
      propsUpdate(htmlElement, { value: 'foo' }, { value: 'bar' });
      expect(htmlElement.value).toBe('bar');
    });
  });
});
