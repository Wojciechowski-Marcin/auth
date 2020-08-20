import supertest from "supertest";

import app from "../app";

describe("Server", () => {
  it("should return status 200", async () => {
    const res = await supertest(app).get("");

    expect(res.status).toEqual(200);
  });
});
