import { createChallenge, verifySolution } from "altcha-lib";

export const getCaptchaChallenge = async (req, res) => {
  try {
    const challenge = await createChallenge({
      hmacKey: process.env.ALTCHA_SECRET,
      maxNumber: 100000,
    });
    res.status(200).json(challenge);
  } catch (err) {
    console.error("Error generating captcha challenge:", err);
    res.status(500).json({ error: "Failed to generate captcha challenge" });
  }
};

export const verifyCaptchaSolution = async (req, res) => {
  const { payload } = req.body;
  if (!payload) {
    return res
      .status(400)
      .json({ success: false, message: "Captcha payload is missing" });
  }
  try {
    const ok = await verifySolution(payload, process.env.ALTCHA_SECRET);
    if (ok) {
      res.status(200).json({ success: true, message: "Captcha verified" });
    } else {
      res.status(400).json({ success: false, message: "Captcha verification failed" });
    }
  } catch (err) {
    console.error("Error verifying captcha solution:", err);
    res.status(500).json({ success: false, message: "Error verifying captcha solution" });
  }
};
