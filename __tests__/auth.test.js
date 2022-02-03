const supertest = require("supertest");
const app = require("../src/server/setup");
const db = require("../mockDb");

const request = supertest(app);

beforeAll(() => db.connect());
afterAll(() => db.close());

describe("Test Authentication Endpoints", () => {
    test("/GET Logged in status", async () => {
        const resp = await request.get("/auth/loggedin");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toBe(false);
    });

    test("/POST Register", async () => {
        const preResp = await request.get("/auth/loggedin");
        const cookie = preResp.headers["set-cookie"];
        let xsrf;
        cookie.forEach((elm) => {
            const token = elm.split("=");
            if (token[0] === "csrfToken") {
                xsrf = token.at(1).split(";").at(0);
            }
        });
        const resp = await request
            .post("/auth")
            .set("cookie", cookie)
            .set("X-XSRF-TOKEN", xsrf)
            .send({
                firstName: "test",
                lastName: "account",
                email: "test.account@gmail.com",
                password: "12345678"
            });
        expect(resp.statusCode).toBe(200);
        expect(resp.body.success).toBe(true);
    });

    test("/POST Login", async () => {
        const preResp = await request.get("/auth/loggedin");
        const cookie = preResp.headers["set-cookie"];
        let xsrf;
        cookie.forEach((elm) => {
            const token = elm.split("=");
            if (token[0] === "csrfToken") {
                xsrf = token.at(1).split(";").at(0);
            }
        });
        const resp = await request
            .post("/auth/login")
            .set("cookie", cookie)
            .set("X-XSRF-TOKEN", xsrf)
            .send({
                email: "test.account@gmail.com",
                password: "12345678"
            });
        expect(resp.statusCode).toBe(200);
        expect(resp.body.success).toBe(true);
    });

    test("/GET Logout", async () => {
        const resp = await request.get("/auth/logout");
        expect(resp.statusCode).toBe(200);
    });
});
