@RestController
@RequestMapping("/auth")
public class LoginController {
  @Autowired
  @Qualifier("loginServiceImpl")
  private LoginService loginService;

  @Autowired
  private UserDao userDao;


  @RequestMapping(value = "/login", method = {RequestMethod.POST})
  public JSONObject login(@RequestBody JSONObject jsonObject, HttpServletRequest request, HttpServletResponse response) throws Exception {

    // 转换

    //JS加密产生的密文
    String cipherData = jsonObject.getString("info");
    byte[] cipherDataByte = Hex.decode(cipherData);

    //刚才的私钥Hex，先还原私钥
    String privateKey = "fasfjasfjafjajfasf2";
    BigInteger privateKeyD = new BigInteger(privateKey, 16);
    X9ECParameters sm2ECParameters = GMNamedCurves.getByName("sm2p256v1");
    ECDomainParameters domainParameters = new ECDomainParameters(sm2ECParameters.getCurve(), sm2ECParameters.getG(), sm2ECParameters.getN());
    ECPrivateKeyParameters privateKeyParameters = new ECPrivateKeyParameters(privateKeyD, domainParameters);

    //用私钥解密
    SM2Engine sm2Engine = new SM2Engine();
    sm2Engine.init(false, privateKeyParameters);

    //processBlock得到Base64格式，记得解码
    byte[] arrayOfBytes = Base64.getDecoder().decode(sm2Engine.processBlock(cipherDataByte, 0, cipherDataByte.length));

    //得到明文：SM2 Encryption Test
    String data = new String(arrayOfBytes);
    JSONObject object = (JSONObject) JSON.parse(data);
    User user = new User();
    user.setPassword(object.getString("password"));
    user.setUsername(object.getString("username"));


    // 1、第一步，先去数据库看看是否被锁住了
    String loc = userDao.getLock(object);
    // 这是连账号都没有的情况
    if (loc == null) {
      return CommonUtil.failJson(null, "用户名或密码错误!");
    }
    Long lock = new Long(loc);

    // 已经是锁定状态了
    if (lock > 3) {
      Long time = new Date().getTime();
      if (time - lock < 30 * 60 * 1000) { // 时间没过
        return CommonUtil.failJson(null, "账号锁定中");
      } else {
        // 可以解锁了
        object.put("lock", 0);
        lock = new Long(0);
        userDao.updateLock(object);
      }
    }

    // 没有找到用户的情况下
    JSONObject userJson = loginService.login(user, request, response);
    if (userJson == null) {
      if (lock == 3) {
        System.out.println(lock == 3);
        Long time = new Date().getTime() + 30 * 60 * 1000;
        object.put("lock", time);
        userDao.updateLock(object);
        return CommonUtil.failJson(null, "输入错误超过3次，账号锁定30分钟!");
      } else {
        object.put("lock", lock + 1);
        userDao.updateLock(object);
        return CommonUtil.failJson(null, "用户名或密码错误!");
      }
    }


    // 到这里就说明账户没有被锁，正常登录的
    /*
        每次登录成功后, 把token存到数据库中
        拦截器检测token合理后（在有效期内）,就要判断token是否与数据库中的相同，如果相同就继续，不同则拦截

        在有效期内，再次登录，不会拦截登录接口，不用验证token，因为此时没有token,即登录请求可以正常进行
        到这里的时候，就用数据库中的token验证是否有效，如果有效，就返回是否下线另一个设备的提示。
        如果用户选择是，会在请求的数据中加个字段，然后这个字段有值，就跳过验证阶段，直接存储新的token
     */

    // 没有选择强制登录
    System.out.println(object.getString("status"));
    if (object.getString("status").equals("no")) {
      String locTok = userDao.getToken(object);

      // 有locTok,没有下线
      if (locTok != null && !locTok.isEmpty()) {
        // 判断是否有效
        String userToken = JwtTokenUtil.verifyToken(locTok);
        // 当前的token还有效
        if (!userToken.equals("10002")) {
          return CommonUtil.failJson(null, "当前账号已在另一个地方登录，是否下线其他设备？");
        }
        // 当前token无效，直接登录即可
      }
      // 没有locTok就直接登录即可
    }

    // 强制登录，直接走下面的逻辑





    String token = JwtTokenUtil.createToken(JSONObject.toJSONString(userJson));
    response.setHeader(JwtTokenUtil.AUTH_HEADER_KEY, token);
    object.put("token", token);
    userDao.updateToken(object);
    if (object.getString("password").equals("e10adc3949ba59abbe56e057f20f883e")) {
      return CommonUtil.successJson(userJson, "请修改密码后再登录");
    }
    return CommonUtil.successJson(userJson);
  }
}
