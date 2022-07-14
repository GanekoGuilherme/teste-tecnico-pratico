import { v4 as uuidv4 } from "uuid";

export default class UUID {
  public getV4(): string {
    return uuidv4();
  }
}
