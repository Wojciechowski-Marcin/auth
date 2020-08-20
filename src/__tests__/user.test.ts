import { compare } from "bcrypt";
import request from "supertest";
import uniqid from "uniqid";

import app from "../app";
import UserModel from "../models/UserModel";

describe("/user", () => {
  const createdUserData = {
    username: uniqid("username"),
    password: "password",
    email: uniqid() + "@domain.com",
  };
  let userId: object;

  beforeAll(() =>
    UserModel.create(createdUserData).then((user) => (userId = user._id)),
  );

  describe("POST", () => {
    it("should return status 200 on correct request", (done) => {
      const userData = {
        username: uniqid("username"),
        password: "password",
        email: uniqid() + "@domain.com",
      };
      request(app)
        .post("/user")
        .send(userData)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).toHaveProperty("token");
          expect(res.body.isSuccess).toBeTruthy();
          done();
        });
    });

    it("should return status 200 on correct request without email", (done) => {
      const userData = {
        username: uniqid("username"),
        password: "password",
      };
      request(app)
        .post("/user")
        .send(userData)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).toHaveProperty("token");
          expect(res.body.isSuccess).toBeTruthy();
          done();
        });
    });

    it("should return status 400 with no username", (done) => {
      const userData = {
        password: "password",
        email: uniqid() + "@domain.com",
      };
      request(app)
        .post("/user")
        .send(userData)
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).toHaveProperty("error");
          expect(res.body.isSuccess).toBeFalsy();
          done();
        });
    });

    it("should return status 400 with empty username", (done) => {
      const userData = {
        username: "",
        password: "password",
        email: uniqid() + "@domain.com",
      };
      request(app)
        .post("/user")
        .send(userData)
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).toHaveProperty("error");
          expect(res.body.isSuccess).toBeFalsy();
          done();
        });
    });

    it("should return status 400 with no password", (done) => {
      const userData = {
        username: uniqid("username"),
        email: uniqid() + "@domain.com",
      };
      request(app)
        .post("/user")
        .send(userData)
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).toHaveProperty("error");
          expect(res.body.isSuccess).toBeFalsy();
          done();
        });
    });

    it("should return status 400 with empty password", (done) => {
      const userData = {
        username: uniqid("username"),
        password: "",
        email: uniqid() + "@domain.com",
      };
      request(app)
        .post("/user")
        .send(userData)
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) done(err);

          expect(res.body).toHaveProperty("error");
          expect(res.body.isSuccess).toBeFalsy();
          done();
        });
    });

    it("should return status 400 when username already exists", (done) => {
      const userData = {
        username: createdUserData.username,
        password: "password",
        email: uniqid() + "@domain.com",
      };
      request(app)
        .post("/user")
        .send(userData)
        .expect("Content-Type", /json/)
        .expect(409)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).toHaveProperty("error");
          expect(res.body.isSuccess).toBeFalsy();
          done();
        });
    });

    it("should return status 400 when email already exists", (done) => {
      const userData = {
        username: uniqid("username"),
        password: "password",
        email: createdUserData.email,
      };
      request(app)
        .post("/user")
        .send(userData)
        .expect("Content-Type", /json/)
        .expect(409)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).toHaveProperty("error");
          expect(res.body.isSuccess).toBeFalsy();
          done();
        });
    });

    it("should hash passwords when creating user", (done) => {
      const userData = {
        username: uniqid("username"),
        password: "password",
        email: uniqid("email"),
      };
      request(app)
        .post("/user")
        .send(userData)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).toHaveProperty("token");
          expect(res.body.isSuccess).toBeTruthy();
          UserModel.findOne({ username: userData.username }).then((user) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            compare(userData.password, user!.password).then((result) => {
              expect(result).toBeTruthy();
              done();
            });
          });
        });
    });
  });

  describe("GET", () => {
    it("should return created user with status 200", (done) => {
      request(app)
        .get("/user/" + userId)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.username).toEqual(createdUserData.username);
          expect(res.body.email).toEqual(createdUserData.email);
          expect(res.body.id).toEqual(userId.toString());
          done();
        });
    });
    it("should return 400 invalid id format", (done) => {
      request(app)
        .get("/user/123")
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.isSuccess).toBeFalsy();
          done();
        });
    });
    it("should return 404 when user does not exist", (done) => {
      request(app)
        .get("/user/1a23456789012b3456cd7890")
        .expect("Content-Type", /json/)
        .expect(404)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.isSuccess).toBeFalsy();
          done();
        });
    });
  });
});
