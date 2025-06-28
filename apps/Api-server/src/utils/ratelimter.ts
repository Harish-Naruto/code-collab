import rateLimit from "express-rate-limit";

export const resetPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many request from this IP, please try again later"
});

export const verifyOtpLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: "Too many OTP verification attempts from this IP, please try again after a minute."
})