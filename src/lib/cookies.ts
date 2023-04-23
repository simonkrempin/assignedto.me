"use client";

import { User } from "@/interfaces/auth";
import { CookieOptions } from "@/interfaces/web";
import { clientSide } from "./nextjs";

export const getCookie = (cookieName: string): string => {
    if (!clientSide()) return "";

    cookieName += "=";
    const cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) return cookie.split("=")[1];
    }
    return "";
};

export const getUserFromCookies = (): User | {} => {
    const username = getCookie("username");
    const token = getCookie("token");
    const email = getCookie("email");

    return username && token && email ? { username, token, email } : {};
};

export const clearCookies = () => {
    if (!clientSide()) return;

    document.cookie.split(";").forEach((c) => {
        deleteCookie(c.split("=")[0]);
    });
};

export const deleteCookie = (cookieName: string): void => {
    if (!clientSide()) return;

    document.cookie = `${cookieName}=;max-age=0;path=/`;
};

export const setCookie = (cookieName: string, cookieValue: string, cookieOptions: CookieOptions): void => {
    if (!clientSide()) return;

    const expires = getExpireDate(cookieOptions.expiresInDays || 0);
    document.cookie = `${cookieName}=${cookieValue}${expires};path=/`;
};

export const getExpireDate = (days: number): string => {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
    return days <= 0 ? "" : `;expires=${currentDate.toUTCString()}`;
};
