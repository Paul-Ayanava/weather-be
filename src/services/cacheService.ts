class CacheService<T> {
    private cache: { [key: string]: { data: T; timestamp: number } } = {};
    private expiration: number;
    private static instance: CacheService<any>;

    constructor(expiration: number) {
        this.expiration = expiration;
    }

    public static getInstance<T>(expiration: number): CacheService<T> {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService<T>(expiration);
        }
        return CacheService.instance;
    }

    set(key: string, data: T): void {
        this.cache[key] = {
            data,
            timestamp: Date.now(),
        };
    }

    get(key: string): T | null {
        const cached = this.cache[key];
        if (cached && Date.now() - cached.timestamp < this.expiration) {
            return cached.data;
        }
        return null;
    }
}

export { CacheService };
