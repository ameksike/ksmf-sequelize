
const lib = require('../');

describe('LOAD', () => {
    it("should a valid lib", () => {
        expect(lib).toBeInstanceOf(Object);
        expect(lib.cls.Manager).toBeInstanceOf(Function);
        expect(lib.cls.Wrapper).toBeInstanceOf(Function);
    });
});