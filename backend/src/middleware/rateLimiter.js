import rateLimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await rateLimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({ success: false, message: "Too many requests, try again later!"});
        }
        next();
    } catch (error) {
        console.log("Rate limit error", error);
        next(error)
    }
}

export default rateLimiter;