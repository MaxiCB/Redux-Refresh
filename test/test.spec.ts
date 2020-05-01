import { expect } from "chai";
import * as lib from "../dist/index";
describe("Redux-Refresh Function Test", () => {
  it("Should Return 'This is from Redux-Refresh: Hello World!'", () => {
    const result = lib.testLib("Hello World!");
    expect(result).to.equal("This is from Redux-Refresh: Hello World!");
  });
});
