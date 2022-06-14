
describe("Testing the isEmpty function", function() {
  describe("Making sure the function is defined", function() {
    it("isEmpty is defined", function() {
      expect(isEmpty()).toBeDefined();
    });
  });
  describe("Non-empty String", function() {
   it("Non-empty String returns false", function() {
     //demonstrates use of custom matcher
     expect(isEmpty("Andrew Pickner")).toEqual(false);
   });
 });
  describe("Empty String", function() {
    it("Empty String returns true", function() {
      //demonstrates use of custom matcher
      expect(isEmpty("")).toEqual(true);
    });
  });
  describe("Undefined String", function() {
   it("Undefined String returns false", function() {
     //demonstrates use of custom matcher
     expect(isEmpty(undefined)).toEqual(true);
   });
 });
});
