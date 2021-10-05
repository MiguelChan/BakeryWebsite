describe('SampleTest', () => {
  it('Should do something', () => {
    const anObject = {
      SomeKey: 'SomeValue',
    };

    const expectedObject = {
      SomeKey: 'SomeValue',
    };

    expect(anObject).toStrictEqual(expectedObject);
  });
});
