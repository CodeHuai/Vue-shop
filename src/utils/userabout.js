import { v4 as uuidv4 } from "uuid";
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

export function getUserTempId() {
  //生成用户临时标识
  // 这个用户临时标识：1、唯一   2、一个用户唯一标识不会轻易改变
  // 首先我们判断用户localStorage是不是已经有了身份标识，如果有了，那么直接拿自己有的
  // 如果没有，再给用户创建新的,然后再存储localStorage
  let userTempId = localStorage.getItem("userTempId_key");
  if (userTempId === null) {
    //代表没有
    userTempId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    localStorage.setItem("userTempId_key", userTempId);
  }

  return userTempId;
}
