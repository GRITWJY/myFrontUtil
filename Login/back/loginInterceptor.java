
@Component
public class loginInterceptor implements HandlerInterceptor {

  @Autowired
  private NonceService nonceService;

  @Autowired
  private UserDao userDao;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    // 重放攻击 --------------------------
    // 签名（时间戳+随机字符串）
    String reqSign = request.getHeader("sign");

    // 时间戳
    String reqTimeStr = request.getHeader("timestamp");

    // 随机数
    String nonce = request.getHeader("nonce");
    // 请求的uri地址
    String reqUri = request.getRequestURI();

    // 如果是options方法，直接方形
    if (HttpMethod.OPTIONS.toString().equals(request.getMethod())) {
      return true;
    }


    // 判断签名是否正确，防止用其他密钥加密
    String localSign = DigestUtils.md5DigestAsHex(("fdafasfasfdasfasfafasf" + reqTimeStr + nonce).getBytes());
    if (!reqSign.equals(localSign)) {
      response.setContentType("application/json;charset=UTF-8");
      PrintWriter pw = response.getWriter();
      JSONObject object = new JSONObject();
      object.put("code", "10001");
      object.put("msg", "信息校验失败，请合理使用系统");
      pw.write(JSONObject.toJSONString(object));
      pw.flush();
      pw.close();
      return false;
    }


    // 判断是否超过60s，非法请求
    Long locTime = new Date().getTime();

    Long reqTime = new Long(reqTimeStr);



    if (locTime - reqTime > 60000) {
      response.setContentType("application/json;charset=UTF-8");
      PrintWriter pw = response.getWriter();
      JSONObject object = new JSONObject();
      object.put("code", "10001");
      object.put("msg", "非法请求，请求超时，请合理使用系统");
      pw.write(JSONObject.toJSONString(object));
      pw.flush();
      pw.close();
      return false;
    }



    JSONObject nonceObj = new JSONObject();
    nonceObj.put("nonce", nonce);
    nonceObj.put("time", locTime - 60000);
    // 如果正确，即没有nonce随机字符串，就添加
    if (nonceService.selNonce(nonceObj)) {
      nonceService.addNonce(nonceObj);
    } else {
      // 如果错误，则返回错误
      response.setContentType("application/json;charset=UTF-8");
      PrintWriter pw = response.getWriter();
      JSONObject object = new JSONObject();
      object.put("code", "10001");
      object.put("msg", "信息校验失败，请合理使用系统");
      pw.write(JSONObject.toJSONString(object));
      pw.flush();
      pw.close();
      return false;
    }

    // 单点登录，登录时长--------------
    // 测试成功
    // 允许请求头

    final String token = request.getHeader(JwtTokenUtil.AUTH_HEADER_KEY);
    // 1、当前的请求地址是登录的方法
    if (reqUri.equals("/auth/login") || reqUri.equals("/log/add")) {
      return true;
    }

    // 2、token为空
    if (token.isEmpty()) {
      response.setContentType("application/json;charset=UTF-8");
      PrintWriter pw = response.getWriter();
      JSONObject object = new JSONObject();
      object.put("code", "10001");
      object.put("msg", "请先登录再使用");
      pw.write(JSONObject.toJSONString(object));
      pw.flush();
      pw.close();
      return false;
    }

    // 3、token不合理
    String userToken = JwtTokenUtil.verifyToken(token);
    if (userToken.equals("10002")) {
      response.setContentType("application/json;charset=UTF-8");
      PrintWriter pw = response.getWriter();
      JSONObject object = new JSONObject();
      object.put("code", "10001");
      object.put("msg", "未登录或登录信息已失效，请重新登录");
      pw.write(JSONObject.toJSONString(object));
      pw.flush();
      pw.close();
      return false;
    }

    // 4、token合理了，即在有效时间段内，但要判断是否是重复登录
    JSONObject tokenInfo = (JSONObject) JSON.parse(userToken);
    String locTok = userDao.getToken(tokenInfo);
    if(!token.equals(locTok)) {
      response.setContentType("application/json;charset=UTF-8");
      PrintWriter pw = response.getWriter();
      JSONObject object = new JSONObject();
      object.put("code", "10001");
      object.put("msg", "已在其他设备上登录");
      pw.write(JSONObject.toJSONString(object));
      pw.flush();
      pw.close();
      return false;
    }

    return true;
  }
}
