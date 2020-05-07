import { expect, assert } from "chai";
import { AES } from "crypto-js";
import * as lib from "../dist/index";

const stateExample = {
  authentication: {
    token: "long-token",
    user: { id: "1", name: "user", email: "email@email.com" },
  },
};

describe("Should Return State", () => {
  it("Should Return State as String", () => {
    const state = lib.preserveState(stateExample);
    assert.isString(state);
  });
  it("Should Return State as Object", () => {
    const sent = lib.preserveState(stateExample);
    const state = lib.retrieveState(sent);
    expect(state).to.deep.equal(stateExample);
  });
});
