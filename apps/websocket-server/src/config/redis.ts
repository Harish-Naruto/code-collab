
import { createClient, RedisClientType } from 'redis';

const redisclient:RedisClientType = createClient({
  url: `redis://redis:${process.env.REDIS_PORT || 6379}`, 
});

redisclient.on('error', (err) => console.error('Redis Error:', err));

(async () => {
  try {
    await redisclient.connect();
    console.log("Connected to redis");
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
})();


export default redisclient
