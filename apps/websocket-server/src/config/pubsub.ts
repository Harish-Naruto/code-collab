import { createClient, RedisClientType } from "redis";

 const pub:RedisClientType = createClient({
    url: 'redis://redis:6379'
 });

 const sub:RedisClientType= createClient({
    url: 'redis://redis:6379'
 });

(async () => {
  try {
    await pub.connect();
    console.log("Connected to pub");
  } catch (err) {
    console.error("pub connection failed:", err);
  }
})();

(async () => {
  try {
    await sub.connect();
    console.log("Connected to sub");
  } catch (err) {
    console.error("sub connection failed:", err);
  }
})();

export{
  pub,sub
}