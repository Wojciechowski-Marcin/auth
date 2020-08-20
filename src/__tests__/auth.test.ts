import request from "supertest";
import uniqid from "uniqid";

import app from "../app";
import UserModel from "../models/UserModel";

describe("/auth", () => {
  const createdUserData = {
    username: uniqid("username"),
    password: "password",
    email: uniqid() + "@domain.com",
  };

  beforeAll(() => UserModel.create(createdUserData));

  describe("login", () => {
    it("should let created user log in", (done) => {
      request(app)
        .post("/auth/login")
        .send({
          username: createdUserData.username,
          password: createdUserData.password,
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).toHaveProperty("token");
          expect(res.body.isSuccess).toBeTruthy();
          done();
        });
    });

    it("should return 401 with invalid username", (done) => {
      request(app)
        .post("/auth/login")
        .send({
          username: "notExistingUsername",
          password: createdUserData.password,
        })
        .expect("Content-Type", /json/)
        .expect(401)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).toHaveProperty("error");
          expect(res.body.isSuccess).toBeFalsy();
          done();
        });
    });

    it("should return 401 with invalid password", (done) => {
      request(app)
        .post("/auth/login")
        .send({
          username: createdUserData.username,
          password: "invalidPassword",
        })
        .expect("Content-Type", /json/)
        .expect(401)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).toHaveProperty("error");
          expect(res.body.isSuccess).toBeFalsy();
          done();
        });
    });
  });
});
