
import { createClient, RedisClientType } from 'redis';

const redisclient:RedisClientType = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379',   
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
