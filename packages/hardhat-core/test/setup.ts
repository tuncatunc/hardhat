import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chalk from "chalk";

chai.use(chaiAsPromised);

function getEnv(key: string): string | undefined {
  const variable = process.env[key];
  if (variable === undefined) {
    return undefined;
  }

  return variable.trim();
}

const DISABLE_FORKING_TESTS = process.env.DISABLE_FORK_TESTS !== undefined;
export const INFURA_URL = DISABLE_FORKING_TESTS
  ? undefined
  : getEnv("INFURA_URL");
export const ALCHEMY_URL = DISABLE_FORKING_TESTS
  ? undefined
  : getEnv("ALCHEMY_URL");

function printForkingLogicNotBeingTestedWarning(varName: string) {
  console.warn(
    chalk.yellow(
      `TEST RUN INCOMPLETE: You need to define the env variable ${varName}`
    )
  );
}

if (INFURA_URL === undefined || INFURA_URL === "") {
  printForkingLogicNotBeingTestedWarning("INFURA_URL");
}

if (ALCHEMY_URL === undefined || ALCHEMY_URL === "") {
  printForkingLogicNotBeingTestedWarning("ALCHEMY_URL");
}
