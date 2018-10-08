import { DragDrop2Module } from './drag-drop2.module';

describe('DragDrop2Module', () => {
  let dragDrop2Module: DragDrop2Module;

  beforeEach(() => {
    dragDrop2Module = new DragDrop2Module();
  });

  it('should create an instance', () => {
    expect(dragDrop2Module).toBeTruthy();
  });
});
