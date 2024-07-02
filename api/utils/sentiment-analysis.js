import {
  ComprehendClient,
  DetectSentimentCommand,
} from "@aws-sdk/client-comprehend"; // ES Modules import
// const { ComprehendClient, DetectSentimentCommand } = require("@aws-sdk/client-comprehend"); // CommonJS import
import { config } from "dotenv";
config();

export const sentimentComprehend = async (comment, res) => {
  const config = {
    region: "ap-southeast-2", // The region you want to use
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  };

  const client = new ComprehendClient(config);
  const input = {
    // DetectSentimentRequest
    Text: comment, // required
    LanguageCode: "en", // required
  };
  const command = new DetectSentimentCommand(input);
  try {
    const response = await client.send(command);

    const positiveScore = response.SentimentScore.Positive;
    const mixedScore = response.SentimentScore.Mixed;
    const negativeScore = response.SentimentScore.Negative;

    // Assign weights to each sentiment score
    const weightedSum = positiveScore * 1 + mixedScore * 0 + negativeScore * -1;

    // The weighted sum ranges from -2 to 2, now map it to a range of 1 to 5
    const minScore = -1;
    const maxScore = 1;
    const minRange = 1;
    const maxRange = 5;

    const convertedScore =
      minRange +
      ((weightedSum - minScore) * (maxRange - minRange)) /
        (maxScore - minScore);
    console.log({ response, convertedScore });
    return convertedScore;
  } catch (err) {
    res.status(500).json({ message: "AWS comprehend error" });
  }
};
