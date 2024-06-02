import { ConditionStrategy } from "../strategies/ConditionStrategy";
import { HighTemperatureStrategy } from "../strategies/HighTemperatureStrategy";
import { RainStrategy } from "../strategies/RainStrategy";
import { WindStrategy } from "../strategies/WindStrategy";
import { ThunderStormStrategy } from "../strategies/ThunderStormStrategy";

const conditionsConfig: ConditionStrategy[] = [
  new HighTemperatureStrategy(),
  new RainStrategy(),
  new WindStrategy(),
  new ThunderStormStrategy(),
];

export { conditionsConfig };
