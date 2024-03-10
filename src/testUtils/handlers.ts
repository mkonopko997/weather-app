import { rest } from "msw";
import weather from "src/testUtils/weather.json";

export const handlers = [
  rest.get("forecast", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(weather));
  }),
];
