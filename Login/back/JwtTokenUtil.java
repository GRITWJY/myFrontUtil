public class JwtTokenUtil {

  //定义token返回头部
  public static final String AUTH_HEADER_KEY = "Authorization";


  //token前缀
  public static final String TOKEN_PREFIX = "Bearer ";


  //签名密钥
  public static final String KEY = "fubfkvhbj3r2f/.,.`1[vpf[demv";

  //有效期默认为 2hour
  public static final Long EXPIRATION_TIME = 1000L*60*30;

  /**
   * 创建TOKEN
   * @param content
   * @return
   */
  public static String createToken(String content) {
    return TOKEN_PREFIX + JWT.create()
        .withSubject(content)
        .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        .sign(Algorithm.HMAC512(KEY));
  }


  /**
   * 验证TOKEN
   * @param token
   * @return
   * @throws Exception
   */
  public static String verifyToken(String token) throws Exception {
    try {
      return JWT.require(Algorithm.HMAC512(KEY))
          .build()
          .verify(token.replace(TOKEN_PREFIX,""))
          .getSubject();
    } catch (JWTVerificationException e) {
      return "10001";
    }
  }
}
