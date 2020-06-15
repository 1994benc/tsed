import {expect} from "chai";
import {PlatformTest} from "@tsed/common";
import {expect} from "chai";
import * as SuperTest from "supertest";
import {FakeServer} from "./helpers/FakeServer";

describe("Rest", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  before(PlatformTest.bootstrap(FakeServer));
  before(() => {
    request = SuperTest(PlatformTest.callback());
  });
  after(PlatformTest.reset);
  describe("integration", () => {
    describe("GET /rest/calendars", () => {
      it("should return an object (without annotation)", done => {
        request
          .get("/rest/calendars/classic/1")
          .expect(200)
          .end((err: any, response: any) => {
            if (err) {
              throw err;
            }
            const obj = JSON.parse(response.text);

            expect(obj).to.be.an("object");
            expect(obj.id).to.equal("1");
            expect(obj.name).to.equal("test");

            done();
          });
      });

      it("should return an object (PathParamsType annotation)", (done: Function) => {
        request
          .get("/rest/calendars/annotation/test/1")
          .expect(200)
          .end((err: any, response: any) => {
            if (err) {
              throw err;
            }

            const obj = JSON.parse(response.text);
            expect(obj).to.be.an("object");
            expect(obj.id).to.equal("1");
            expect(obj.name).to.equal("test");

            done();
          });
      });

      it("should return an object (Via promised response)", (done: Function) => {
        request
          .get("/rest/calendars/annotation/promised/1")
          .expect(200)
          .end((err: any, response: any) => {
            if (err) {
              throw err;
            }
            const obj = JSON.parse(response.text);

            expect(obj).to.be.an("object");
            expect(obj.id).to.equal("1");
            expect(obj.name).to.equal("test");

            done();
          });
      });

      it("should return an object status (Via promised response)", (done: Function) => {
        request
          .get("/rest/calendars/annotation/status/1")
          .expect(202)
          .end((err: any, response: any) => {
            if (err) {
              throw err;
            }

            const obj = JSON.parse(response.text);

            expect(obj).to.be.an("object");
            expect(obj.id).to.equal("1");
            expect(obj.name).to.equal("test");

            done();
          });
      });

      it("should use middleware to provide user info", (done: Function) => {
        request
          .get("/rest/calendars/middleware")
          .set({
            Authorization: "tokenauth"
          })
          .expect(200)
          .end((err: any, response: any) => {
            if (err) {
              throw err;
            }

            const obj = JSON.parse(response.text);

            expect(obj).to.be.an("object");
            expect(obj.user).to.equal(1);
            expect(obj.token).to.equal("tokenauth");

            done();
          });
      });

      it("should set token", (done: Function) => {
        request
          .get("/rest/calendars/token/newTOKENXD")
          // .send({id: 1})
          .set("Cookie", "authorization=auth")
          .expect(200)
          .end((err: any, response: any) => {
            const token = response.text;

            expect(token).to.be.an("string");
            expect(token).to.equal("token updated");
            done();
          });
      });

      it("should return get updated token", (done: Function) => {
        request
          .get("/rest/calendars/token")
          // .send({id: 1})
          .set("Cookie", "authorization=auth")
          .expect(200)
          .end((err: any, response: any) => {
            const token = response.text;

            expect(token).to.be.an("string");
            expect(token).to.equal("newTOKENXD");
            done();
          });
      });

      it("should return query", (done: Function) => {
        request
          .get("/rest/calendars/query?search=ts-express-decorators")
          .expect(200)
          .end((err: any, response: any) => {
            const token = response.text;
            expect(token).to.be.an("string");
            expect(token).to.equal("ts-express-decorators");
            done();
          });
      });

      it("should use mvc to provide info (Use)", (done: Function) => {
        request
          .get("/rest/calendars/mvc")
          .set({authorization: "token"})
          .expect(200)
          .end((err: any, response: any) => {
            if (err) {
              throw err;
            }

            const obj = JSON.parse(response.text);

            expect(obj).to.be.an("object");
            expect(obj.id).to.equal("1-local-10909-ctx-10909");

            done();
          });
      });

      it("should use mvc to provide info (UseAfter)", (done: Function) => {
        request
          .get("/rest/calendars/middlewares2")
          .set({authorization: "token"})
          .expect(200)
          .end((err: any, response: any) => {
            if (err) {
              throw err;
            }

            const obj = JSON.parse(response.text);

            expect(obj).to.be.an("object");
            expect(obj.id).to.equal(10909);

            done();
          });
      });

      it("should set all headers", (done: Function) => {
        request
          .get("/rest/calendars/headers")
          .expect(200)
          .end((err: any, response: any) => {
            if (err) {
              throw err;
            }

            expect(response.headers["x-token-test"]).to.equal("test");
            expect(response.headers["x-token-test-2"]).to.equal("test2");
            expect(response.headers["content-type"]).to.equal("application/xml; charset=utf-8");

            done();
          });
      });
    });

    describe("PUT /rest/calendars", () => {
      it("should throw a BadRequest", (done: Function) => {
        request
          .put("/rest/calendars")
          .expect(400)
          .end((err: any, response: any) => {
            expect(response.body).to.deep.eq({
              "message": "Bad request on parameter \"request.body.name\".\nIt should have required parameter 'name'",
              "status": 400,
              "name": "REQUIRED_VALIDATION_ERROR",
              "errors": [{
                "dataPath": "",
                "keyword": "required",
                "message": "It should have required parameter 'name'",
                "modelName": "body",
                "params": {"missingProperty": "name"},
                "schemaPath": "#/required"
              }]
            });
            done();
          });
      });

      it("should return an object", (done: Function) => {
        request
          .put("/rest/calendars")
          .send({name: "test"})
          .expect(200)
          .end((err: any, response: any) => {
            const obj = JSON.parse(response.text);

            expect(obj).to.be.an("object");
            expect(obj.name).to.equal("test");
            done();
          });
      });
    });

    describe("HEAD /rest/calendars/events", () => {
      it("should return headers", done => {
        request
          .head("/rest/calendars/events")
          .expect(200)
          .end((err: any, response: any) => {
            expect(response.text).to.eq(undefined);

            done();
          });
      });
    });
    describe("GET /rest/calendars/events", () => {
      it("should return array", async () => {
        const response = await request.get("/rest/calendars/events").expect(200);

        expect(response.body).to.deep.eq([{id: "1"}, {id: "2"}]);
      });
    });

    describe("PATCH /rest/calendars/events/:id", () => {
      it("should return headers", async () => {
        const response = await request
          .patch("/rest/calendars/events/1")
          .send({
            startDate: new Date(),
            endDate: new Date(),
            Name: "test"
          });

        expect(response.status).to.eq(200);
      });
    });

    describe("POST /rest/user/", () => {
      it("should allow creation", async () => {
        const response = await request
          .post(`/rest/user/`)
          .send({name: "test", email: null, password: null})
          .expect(201);

        expect(response.body).to.deep.eq({
          name: "test",
          email: null
        });
      });

      it("should return an error when email is empty", async () => {
        const response = await request
          .post(`/rest/user/`)
          .send({name: "test", email: ""})
          .expect(400);

        // @ts-ignore
        expect(response.body).to.deep.eq({
          "errors": [
            {
              "dataPath": ".email",
              "keyword": "format",
              "message": "should match format \"email\"",
              "modelName": "UserCreation",
              "params": {
                "format": "email"
              },
              "schemaPath": "#/properties/email/format"
            }
          ],
          "message": "Bad request on parameter \"request.body\".\nUserCreation.email should match format \"email\". Given value: \"undefined\"",
          "name": "AJV_VALIDATION_ERROR",
          "status": 400
        });
      });

      it("should return an error when password is empty", async () => {
        const [response]: any[] = await Promise.all([
          request
            .post(`/rest/user/`)
            .send({name: "test", email: "test@test.fr", password: ""})
            .expect(400),
          request
            .post(`/rest/user/`)
            .send({name: "test", email: "test@test.fr", password: ""})
            .expect(400)
        ]);

        expect(response.body).to.deep.eq({
          "name": "AJV_VALIDATION_ERROR",
          "message": "Bad request on parameter \"request.body\".\nUserCreation.password should NOT be shorter than 6 characters. Given value: \"undefined\"",
          "status": 400,
          "errors": [{
            "keyword": "minLength",
            "dataPath": ".password",
            "schemaPath": "#/properties/password/minLength",
            "params": {"limit": 6},
            "message": "should NOT be shorter than 6 characters",
            "modelName": "UserCreation"
          }]
        });
      });

      it("should allow creation with data", async () => {
        const response = await request
          .post(`/rest/user/`)
          .send({name: "test", email: "test@test.fr", password: "test1267"})
          .expect(201);

        expect(JSON.parse(response.text)).to.deep.eq({name: "test", email: "test@test.fr"});
      });
    });

    describe("GET /rest/user/:id", () => {
      const send = (id: string) =>
        new Promise((resolve, reject) => {
          request
            .get(`/rest/user/${id}`)
            .expect(200)
            .end((err: any, response: any) => {
              if (err) {
                reject(err);
              } else {
                resolve({id, ...JSON.parse(response.text)});
              }
            });
        });

      it("should respond with the right userid", () => {
        const promises = [];

        promises.push(send("0"));
        promises.push(send("1"));
        promises.push(send("2"));

        return Promise.all(promises).then(responses => {
          expect(responses).to.deep.eq([
            {
              id: "0",
              idCtrl: "0",
              idSrv: "0",
              userId: "0"
            },
            {
              id: "1",
              idCtrl: "1",
              idSrv: "1",
              userId: "1"
            },
            {
              id: "2",
              idCtrl: "2",
              idSrv: "2",
              userId: "2"
            }
          ]);
        });
      });
    });
  });

  describe("GET /rest/products", () => {
    it("should respond with the right userid", done => {
      request
        .get(`/rest/products`)
        .expect(200)
        .end((err: any, response: any) => {
          expect(JSON.parse(response.text)).to.deep.eq([{id: "1", name: "test"}]);
          done();
        });
    });
  });

  describe("Errors", () => {
    it("GET /rest/errors/custom-bad-request", done => {
      request
        .get("/rest/errors/custom-bad-request")
        .expect(400)
        .end((err: any, response: any) => {
          expect(response.body).to.deep.eq({
            "errors": [
              "test"
            ],
            "message": "Custom Bad Request",
            "name": "CUSTOM_BAD_REQUEST",
            "status": 400
          });
          expect(response.headers["x-header-error"]).to.eq("deny");
          done();
        });
    });

    it("POST /rest/errors/required-param", done => {
      request
        .post("/rest/errors/required-param")
        .expect(400)
        .end((err: any, response: any) => {
          expect(response.body).to.deep.eq({
            "name": "REQUIRED_VALIDATION_ERROR",
            "message": "Bad request on parameter \"request.body.name\".\nIt should have required parameter 'name'",
            "status": 400,
            "errors": [{
              "dataPath": "",
              "keyword": "required",
              "message": "It should have required parameter 'name'",
              "modelName": "body",
              "params": {"missingProperty": "name"},
              "schemaPath": "#/required"
            }]
          });
          done();
        });
    });

    it("POST /rest/errors/required-model", done => {
      request
        .post("/rest/errors/required-model")
        .expect(400)
        .end((err: any, response: any) => {
          expect(response.body).to.deep.eq({
            "name": "AJV_VALIDATION_ERROR",
            "message": "Bad request on parameter \"request.body\".\nCustomModel should have required property 'name'. Given value: \"undefined\"",
            "status": 400,
            "errors": [{
              "keyword": "required",
              "dataPath": "",
              "schemaPath": "#/required",
              "params": {"missingProperty": "name"},
              "message": "should have required property 'name'",
              "modelName": "CustomModel"
            }]
          });
          done();
        });
    });

    it("POST /rest/errors/required-prop-name", done => {
      request
        .post(`/rest/errors/required-prop-name`)
        .send({})
        .expect(400)
        .end((err: any, response: any) => {
          expect(response.body).to.deep.eq({
            "name": "AJV_VALIDATION_ERROR",
            "message": "Bad request on parameter \"request.body\".\nCustomPropModel should have required property 'role_item'. Given value: \"undefined\"",
            "status": 400,
            "errors": [{
              "keyword": "required",
              "dataPath": "",
              "schemaPath": "#/required",
              "params": {"missingProperty": "roleItem"},
              "message": "should have required property 'role_item'",
              "modelName": "CustomPropModel"
            }]
          });
          done();
        });
    });

    it("GET /rest/errors/error (original error is not displayed", done => {
      request
        .get("/rest/errors/error")
        .expect(500)
        .end((err: any, response: any) => {
          expect(response.body).to.eq("InternalServerError");
          done();
        });
    });

    it("GET /rest/errors/custom-internal-error", done => {
      request
        .get("/rest/errors/custom-internal-error")
        .expect(500)
        .end((err: any, response: any) => {
          expect(response.body).to.deep.eq({
            "errors": [
              "test"
            ],
            "message": "My custom error",
            "name": "CUSTOM_INTERNAL_SERVER_ERROR",
            "status": 500
          });
          expect(response.headers["x-header-error"]).to.eq("deny");
          done();
        });
    });
  });
});
