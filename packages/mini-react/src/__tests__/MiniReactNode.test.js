import { Node } from 'mini-react';

describe('node', () => {
  describe('element', () => {
    const title = {
      tagName: 'title',
      textContent: 'Ajuste de limite'
    };

    const fiber = Node(title);

    it('should flatten the object', () => {
      expect(fiber).toHaveProperty('type');
      expect(fiber).toHaveProperty('props');
    });
  });
});
