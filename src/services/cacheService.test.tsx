import { CacheService } from "./cacheService";

describe("CacheService", () => {
  let cacheService: CacheService<string>;

  beforeEach(() => {
    cacheService = new CacheService<string>(1000);
  });

  test("should store and retrieve data within expiration time", () => {
    cacheService.set("key", "value");
    const data = cacheService.get("key");
    expect(data).toBe("value");
  });

  test("should return null for expired cache", (done) => {
    cacheService.set("key", "value");
    setTimeout(() => {
      const data = cacheService.get("key");
      expect(data).toBeNull();
      done();
    }, 1100);
  });
});
