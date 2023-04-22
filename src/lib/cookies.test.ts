/**
 * @jest-environment jsdom
 */

import { getCookie, setCookie, getExpireDate, deleteCookie, clearCookies, getUserFromCookies } from "./cookies";

describe("cookies", () => {
    describe("getCookie", () => {
        it("should return null if cookie does not exist", () => {
            expect(getCookie("test")).toBe("");
        });

        it("should return a cookie if it exists", () => {
            document.cookie = "test=test";
            console.log("document.cookie: ", document.cookie);
            expect(getCookie("test")).toEqual("test");
        });
    });

    describe("setCookie", () => {
        it("should set a cookie when days are given", () => {
            setCookie("test", "test", { expiresInDays: 1 });

            const now = new Date();
            const expires = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);

            expect(document.cookie).toEqual("test=test");
        });

        it("should set when days equals to 0", () => {
            setCookie("test", "test", { expiresInDays: 0 });
            expect(document.cookie).toEqual("test=test");
        });

        it("should set when no options are provided", () => {
            setCookie("test", "test", {});
            expect(document.cookie).toEqual("test=test");
        });
    });

    describe("delete cookie", () => {
        it("should delete a cookie", () => {
            document.cookie = "test=test";
            expect(document.cookie).toEqual("test=test");
            deleteCookie("test");
            expect(document.cookie).toEqual("");
        });
    });

    describe("clear cookies", () => {
        it("should clear all cookies", () => {
            document.cookie = "test=test";
            document.cookie = "test2=test2";
            expect(document.cookie).toEqual("test=test; test2=test2");
            clearCookies();
            expect(document.cookie).toEqual("");
        });
    });

    describe("getExpireDate", () => {
        it("should return an empty string if days is 0", () => {
            expect(getExpireDate(0)).toEqual("");
        });

        it("should return an expiry date if days is greater than 0", () => {
            const date = new Date();
            date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
            expect(getExpireDate(1)).toEqual(`;expires=${date.toUTCString()}`);
        });
    });

    describe("getUserFromCookies", () => {
        it("should return null if no cookies exist", () => {
            expect(getUserFromCookies()).toBeNull();
        });

        it("should return a user if cookies exist", () => {
            document.cookie = "username=test";
            document.cookie = "token=test";
            document.cookie = "email=test";
            expect(getUserFromCookies()).toEqual({ username: "test", token: "test", email: "test" });
        });
    });
});
