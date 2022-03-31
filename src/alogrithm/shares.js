/**
 * 买股票的最佳时机
 * @param prices int整型一维数组
 * @return int整型
 */
function maxProfit(prices) {
  let minprice = 999999,
    maxprofit = 0;
  prices.forEach((item) => {
    maxprofit = Math.max(item - minprice, maxprofit);
    minprice = Math.min(item, minprice);
  });
  return maxprofit;
}
