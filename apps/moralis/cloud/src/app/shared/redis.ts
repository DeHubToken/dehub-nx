class RedisClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _client: any;

  async connect() {
    const that = this;
    const promise = new Promise((resolve, reject) => {
      const client = redis.createClient({ host: 'moralis-redis', port: 6379 });
      client.on('error', (err: unknown) => {
        reject(err);
      });
      client.on('connect', function () {
        that._client = client;
        resolve(client);
      });
    });
    return await promise;
  }

  set(key: string, value: string, expire?: number) {
    // expire in second if requires
    if (!this._client) throw Error('Redis not ready');

    const that = this;
    return new Promise((resolve, reject) => {
      that._client.set(key, value, (error: unknown, result: unknown) => {
        if (error) reject(error);
        else {
          if (expire) {
            that._client.expire(
              key,
              expire,
              (error: unknown, result: unknown) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
          } else resolve(result);
        }
      });
    });
  }

  get(key: string): Promise<string> {
    if (!this._client) throw Error('Redis not ready');

    const that = this;
    return new Promise((resolve, reject) => {
      that._client.get(key, (error: unknown, result: string) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  remove(key: string) {
    if (!this._client) throw Error('Redis not ready');

    const that = this;
    return new Promise((resolve, reject) => {
      that._client.del(key, (error: unknown, result: unknown) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  async getExpired(
    key: string,
    callbackIfExpire: (args?: unknown) => Promise<string>,
    options: {
      args?: unknown;
      expire?: number;
    }
  ): Promise<string> {
    if (!this._client) throw Error('Redis not ready');

    const value = await this.get(key);
    if (!value) {
      const latest = await callbackIfExpire(options.args);
      this.set(key, latest, options.expire);
      return latest;
    }
    return value;
  }
}

export default RedisClient;
