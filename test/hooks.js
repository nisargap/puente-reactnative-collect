import { initialize } from "../services/parse/auth";

export function hooks() {
  beforeEach(async () => initialize())
}