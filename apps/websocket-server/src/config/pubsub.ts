import { createClient, RedisClientType } from "redis";

 const pub:RedisClientType = createClient();

 const sub:RedisClientType= createClient();

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