import { ValidationPipe } from "./validation.pipes";
describe('MyCustomPipe', () => {
  it('should be defined', () => {
    expect(new ValidationPipe()).toBeDefined();
  });
});
