<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              orderNo
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ payInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a href="javascript:;" class="btn" @click="pay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  name: "Pay",
  data() {
    return {
      orderNo: "",
      payInfo: {},
      // 这里需要对用户的一个状态码进行保存 为后面用户点击按钮时的判断依据
      payStatus: 0,
    };
  },
  beforeMount() {
    this.orderNo = this.$route.query.orderNo;
  },
  mounted() {
    this.getPayInfo();
  },
  methods: {
    async getPayInfo() {
      const result = await this.$API.reqPayInfo(this.orderNo);
      if (result.code === 200) {
        this.payInfo = result.data;
      }
    },
    // 立即支付
    async pay() {
      try {
        // 第一步: 生成二维码
        // With async/await
        // const generateQR = async (text) => {
        //   try {
        //     console.log(await QRCode.toDataURL(text));
        //   } catch (err) {
        //     console.error(err);
        //   }
        // };
        // 这里会根据微信的数据,生成二维码
        const imgUrl = await QRCode.toDataURL(this.payInfo.codeUrl);
        // 第二步: 展示二维码
        this.$alert(
          `<img src="${imgUrl}" />`,
          "请使用微信扫码支付!",
          // 这里是一个配置项
          {
            dangerouslyUseHTMLString: true,
            showClose: false,
            showCancelButton: true,
            cancelButtonText: "支付遇到问题",
            confirmButtonText: "我已成功支付",
            center: true,
            // 这里的方法会暂停这个消息提示框的关闭  ,所以我们的逻辑需要在这里进行对应的处理
            beforeClose: (action, instance, done) => {
              // action 代表用户点的哪个值  分别是'confirm', 'cancel'或'close'；  ----------- 看官网
              // instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；done 用于关闭 MessageBox 实例
              // 把用户点击按钮的逻辑转到这里面，可以让自己去决定要不要关闭messageBox
              if (action === "confirm") {
                // 代表用户点击了确定按钮
                // if (!this.payStatus) {
                //   // 判断用户是不是没支付，如果没支付提示
                //   this.$message.error("请确保支付成功");
                // }
                // 后门 ++++++++++++++++++++++++++++++
                clearInterval(this.timer);
                this.timer = null;
                done();
                this.$router.push("/paysuccess");
                // +++++++++++++++++++++++++++++++++++
              } else if (action === "cancel") {
                // 代表用户点击了取消按钮
                this.$message.warning("请联系尚硅谷前台小姐姐");
                //清除定时器
                clearInterval(this.timer);
                this.timer = null;
                // 关闭messageBox
                done();
              }
            },
          }
        )
          // 这里如果不写的话,其实这里会出现一个错误,提示未处理的promise 是因为这个this.$alert 返回的是一个promise
          // .then当中执行的是用户点击确定按钮之后的操作,它会强制自动关闭messageBox
          .then(() => {}) // 但是这两个 then  以及  catch 他会自动关闭这个消息弹出框  这不是我们需要的
          // .catch当中执行的是用户点击取消按钮之后的操作,它会强制自动关闭messageBox
          .catch(() => {});

        // 第三部: 轮询
        if (!this.timer) {
          // 确保这个订单只会有一个定时器再查询
          this.timer = setInterval(async () => {
            const result = await this.$API.reqPayStatus(this.orderNo);
            if (result.code === 200) {
              // 保存支付状态码  为了后面用户点击按钮的时候判断依据
              this.payStatus = 200;
              // 清除定时器
              clearInterval(this.timer);
              this.timer = null;

              // 关闭messageBox
              this.$msgbox.close();

              // 自动跳转到支付成功页面
              this.$router.push("/paysuccess");
            }
          }, 2000);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
