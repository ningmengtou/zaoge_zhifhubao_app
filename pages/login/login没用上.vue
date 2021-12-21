<template>
  <view class="loginPage">
    <view class="head">
      <text class="text1">小程序授权登录</text>
      <text class="text2">需要您授权登录后才能操作</text>
    </view>
    <view class="beautify">
      <view class="img"><image :src="baseimg + 'logo.png'" style="width:100%;height:100%;"></image></view>
      <view class="txt">早鸽</view>
    </view>
    <view class="means">
      <text class="txt1">小程序授权登录须知</text>
      <text class="txt2">小程序将获取你的公开信息(昵称、头像等)</text>
      <view class="txt2">
        授权前必须阅读
        <text class="font" @tap="docToggleOpen()">《用户登录须知》</text>
      </view>
    </view>
    <view class="btnbox">
      <button class="b1" @tap="doPageLogin">授权登录</button>
      <button class="b2" @click="goback(1)">暂不登录</button>
    </view>
    <view class="mask" :class="{ open: isDocOpen }" @tap="docToggleOpen()"></view>
    <view class="doc" :class="{ open: isDocOpen }">
      <view class="title">用户登录须知</view>
      <view class="docbox">
        <view class="content">
          <view class="p">
            本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。
            您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。
          </view>

          <view class="h2">1. 适用范围</view>
          <view class="p">
            (a) 在您注册本应用帐号时，您根据本应用要求提供的个人注册信息；
            <br />
            (b)
            在您使用本应用网络服务，或访问本应用平台网页时，本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；
            <br />
            (c) 本应用通过合法途径从商业伙伴处取得的用户个人数据。
            <br />
            <br />
            您了解并同意，以下信息不适用本隐私权政策：
            <br />
            (a) 您在使用本应用平台提供的搜索服务时输入的关键字信息；
            <br />
            (b) 本应用收集到的您在本应用发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；
            <br />
            (c) 违反法律规定或违反本应用规则行为及本应用已对您采取的措施。
            <br />
          </view>

          <view class="h2">2. 信息使用</view>
          <view class="p">
            (a)本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本应用（含本应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。
            <br />
            (b) 本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。
            <br />
            (c)
            为服务用户的目的，本应用可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与本应用合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。
            <br />
          </view>

          <view class="h2">3. 信息披露</view>
          <view class="p">
            在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：
            <br />
            <br />
            (a) 经您事先同意，向第三方披露；
            <br />
            (b)为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；
            <br />
            (c) 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；
            <br />
            (d) 如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露；
            <br />
            (e) 如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；
            <br />
            (f)
            在本应用平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本应用有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。
            <br />
            (g) 其它本应用根据法律、法规或者网站政策认为合适的披露。
            <br />
          </view>

          <view class="h2">4. 信息存储和交换</view>
          <view class="p">
            本应用收集的有关您的信息和资料将保存在本应用及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本应用收集信息和资料所在地的境外并在境外被访问、存储和展示。
          </view>

          <view class="h2">5. Cookie的使用</view>
          <view class="p">
            (a) 在您未拒绝接受cookies的情况下，本应用会在您的计算机上设定或取用cookies
            <br />
            ，以便您能登录或使用依赖于cookies的本应用平台服务或功能。本应用使用cookies可为您提供更加周到的个性化服务，包括推广服务。
            <br />
            (b)
            您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的本应用网络服务或功能。
            <br />
            (c) 通过本应用所设cookies所取得的有关信息，将适用本政策。
            <br />
          </view>

          <view class="h2">6. 信息安全</view>
          <view class="p">
            (a)
            本应用帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本应用将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。
            <br />
            (b) 在使用本应用网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对
            <br />
          </view>

          <view class="h2">7.本隐私政策的更改</view>
          <view class="p">
            (a)如果决定更改隐私政策，我们会在本政策中、本公司网站中以及我们认为适当的位置发布这些更改，以便您了解我们如何收集、使用您的个人信息，哪些人可以访问这些信息，以及在什么情况下我们会透露这些信息。
            <br />
            (b)本公司保留随时修改本政策的权利，因此请经常查看。如对本政策作出重大更改，本公司会通过网站通知的形式告知。
            <br />
            方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本应用用户名及密码发生泄露，请您立即联络本应用客服，以便本应用采取相应措施。
            <br />
          </view>
        </view>
      </view>
      <view class="read"><button @tap="docToggleOpen()">我已经阅读</button></view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      isDocOpen: false,
      baseimg: this.baseimg
    };
  },
  methods: {
    //查看协议
    docToggleOpen() {
      this.isDocOpen = !this.isDocOpen;
    },
    // 执行登录
    doPageLogin() {
      uni.getProvider({
        service: 'oauth',
        success: function(res) {
          console.log(res.provider[0]); //alipay
          if (res.provider[0] == 'alipay') {
            // 执行登录
            uni.login({
              provider: 'alipay',
              success: function(loginRes) {
                console.log(loginRes);
                // 执行登录
                uni.getUserInfo({
                  provider: 'alipay',
                  success: function(infoRes) {
                    console.log(infoRes);
                  }
                });
              }
            });
            return false;
          }
          console.log('其他小程序');
        }
      });
    }
  }
};
</script>
<style>
.core {
  padding-top: 30px !important;
}

.core-close {
  top: 0 !important;
}
.img {
  border-radius: 100%;
}
.loginPage {
  position: fixed;
  background: #fff;
  height: 100%;
  width: 100%;
  padding: 10vh 0 0 0;
  box-sizing: border-box;
}

.loginPage .head {
  padding: 0 20px !important;
}

.loginPage .head .text1 {
  font-size: 22px;
  font-weight: 700;
  display: block;
  padding: 10px 0 4px 0;
}

.loginPage .head .text2 {
  font-size: 14px;
  display: block;
  color: #656565;
  line-height: 18px;
}

.loginPage .beautify .img {
  height: 100px;
  width: 100px;
  margin: 10px auto;
  border-radius: 50%;
  margin: 20px auto;
}

.loginPage .beautify .txt {
  font-size: 16px;
  text-align: center;
  padding-bottom: 20px;
  font-weight: 700;
}

.loginPage .means {
  font-size: 14px;
  padding: 0 20px;
  border-top: 1px solid #eee;
  padding-top: 10vh;
}

.loginPage .means text {
  display: block;
}

.loginPage .means .txt1 {
  font-weight: 700;
  color: #333;
  font-size: 16px;
}

.loginPage .means .txt2 {
  color: #999;
  margin-top: 5px;
}

.loginPage .means .txt2 .font {
  display: inline;
  color: #3e2723;
}

.loginPage .btnbox {
  margin-top: 20px;
  padding: 0 20px;
}

.loginPage .btnbox button {
  background: #f6f6f6;
  padding: 13px 18px;
  color: #333;
  white-space: nowrap;
  text-align: center;
  font-size: 17px;
  line-height: 20px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  margin: 0 0 20px 0;
}

.loginPage .btnbox .b1 {
  background: #005fbc;
  color: #fff;
}

.loginPage .mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: none;
}

.loginPage .mask.open {
  display: block;
}

.loginPage .doc {
  position: fixed;
  width: 100%;
  height: 80%;
  left: 0;
  bottom: 0;
  transform: translateY(100%);
  -webkit-transform: translateY(100%);
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  z-index: 11;
}

.loginPage .doc.open {
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  transform: translateY(0);
  -webkit-transform: translateY(0);
}

.loginPage .doc .docbox {
  background: #fff;
  height: 100%;
  position: absolute;
  width: 100%;
  bottom: 0;
  overflow-y: auto;
  border-radius: 5px 5px 0 0;
}

.loginPage .doc .title {
  font-size: 16px;
  text-align: center;
  border-bottom: 0.5px solid #eee;
  height: 50px;
  line-height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  background: #fff;
  font-weight: 700;
  border-radius: 5px 5px 0 0;
}

.loginPage .doc .content {
  margin: 0 10px;
  padding: 50px 0 60px 0;
}

.loginPage .doc .content .h1 {
  font-size: 16px;
  font-weight: 700;
  padding: 2px 0;
}

.loginPage .doc .content .h2 {
  font-size: 14px;
  font-weight: 700;
  padding: 10px 0;
  margin-top: 10px;
}

.loginPage .doc .content .p {
  font-size: 14px;
  color: #666;
  padding: 5px 0;
  line-height: 2;
}

.loginPage .doc .read {
  width: 100%;
  left: 0;
  bottom: 0;
  border-top: 1px solid #f5f5f5;
  background: #fff;
  position: absolute;
  padding: 10px 0;
}

.loginPage .doc .read button {
  display: block;
  width: 120px;
  height: 40px;
  margin: 0 auto;
  line-height: 40px;
  font-size: 14px;
  background: #005fbc;
  color: #fff;
}
</style>
