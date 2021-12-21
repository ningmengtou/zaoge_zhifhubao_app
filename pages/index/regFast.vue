<template>
	<view class="uniBigBox">
		<!-- 头部提示 开始 -->
		<!-- <view class="tipTopBox" @click="gopage('./regExpert')">
			<text class="text">自助注册太麻烦？专家注册全流程顾问式服务</text>
			<text class="iconfont icon-youjiantou"></text>
		</view> -->
		<!-- 头部提示 结束 -->

		<!-- 表单 开始 -->
		<view class="formView">
			<view class="banxin690 formView2">
				<!-- 如果是文本框 -->
				<view class="inputView allView">
					<view class="fls textFl">商标名称</view>
					<view class="frs"><input class="input" type="text" placeholder-class="place" placeholder="请输入商标名称"
							v-model="tmName" /></view>
				</view>
				<!-- 如果是下拉选择框 -->
				<view class="pickerView allView">
					<view class="fls textFl">商标类别</view>
					<view class="frs" style="width: 25%;">
						<picker @change="trademarkChange" :value="trademarkIndex" :range="trademarkArray"
							:range-key="'tradeName'">
							<view class="onlyBox">
								<text class="t1 text">{{ trademarkArray[trademarkIndex].tradeName }}</text>
								<text class="t2 iconfont icon-youjiantou"></text>
							</view>
						</picker>
					</view>
				</view>
				<!-- 如果是提示文字 -->
				<view class="tiptext">建议多选择相近行业类别，用于保护您的商标</view>
				<!-- 如果是文本域 -->
				<view class="areaView allView">
					<view class="fls textFl">商标说明</view>
					<view class="frs"><textarea class="textarea" placeholder-class="place"
							placeholder="示例：该商标由中文“****”/英文“******”" value="" v-model="tmExplain" /></view>
				</view>
				<!-- 如果是上传下载框 -->
				<view class="uploadView allView">
					<view class="fls textFl">代理委托书</view>
					<view class="frs">
						<view class="fr1">
							<view class="fr1a" >
								<image :src="imageUrl"  v-if="imageUrl" class="bookImage"></image>
								<text class="iconfont icon-shangchuan" v-else></text>
							</view>
							<view class="fr1b" @click="downLoad"><text class="text">自动生成logo</text></view>
						</view>
						<view class="fr2">
							注： 委托书已经自动生成。请下载并打印，以自然人名义申请的需黑笔签名，以企业名义申请的需盖公章后，扫描彩色件并上传。Jpg格式，小于2M，宽高要求：600px-4000px。
						</view>
					</view>
				</view>
				<!-- 如果是提交按钮 -->
				<view class="subView">
					<view class="comBtnBox" @click="apply">
						<view>立即申请</view>
					</view>
					<view class="clickMore">
						<label class="readlabel" @click="agreeBtn">
							<checkbox value="cb" :checked="isChecked" style="transform:scale(0.5)" />
							<text class="text">我已阅读并同意</text>
						</label>
						<text class="agree" @click="gopage('../index4/privacyClause')">《隐私政策》</text>
						<text class="text">和</text>
						<text class="agree" @click="gopage('../index4/userAgreement')">《用户协议》</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 表单 结束 -->

		<!-- 底部叙述的文字 开始 -->
		<view class="botTextIntro">
			<view class="banxin690 botTextIntro2">
				<view>1.在您提交商标申请后，专业顾问会在2~3个工作日之内与您联系。</view>
				<view>2.商标查询存在盲期，从商标局接受注册申请到录入数据库，其中有3-4个月的延迟期。</view>
				<view>3.在查询盲期内，可能会存在已有相同或类似的商标提交。</view>
				<view>4.商标总局对申请商标采用在先原则和近似原则的审核方式。</view>
				<view>5.本系统目前暂不支持集体商标、证明商标、三维标志、颜色组合和声音商标的注册，不支持共同商标和优先权声明。</view>
			</view>
		</view>
		<!-- 底部叙述的文字 结束 -->
	</view>
</template>

<script>
	import {
		jsonCategory
	} from '../../util/jsonCategory.js';
	import {
		request,requestYuzhua
	} from '../../util/request.js';
	export default {
		data() {
			return {
				baseimg: this.baseimg, //全局定义图片路径
				baseapi: this.baseapi, //全局定义接口路径
				trademarkArray: jsonCategory.data, // 商标类别数组
				trademarkIndex: 0, // 商标类别数组
				tmName: '',
				tmType: '',
				tmExplain: '',
				agency: '',
				// 图片路径
				imageUrl: '',
				isChecked:false,
				timer:null,
			
			};
		},
		onLoad() {},
		methods: {
			trademarkChange(e) {
				this.trademarkIndex = e.target.value;
				if (this.trademarkIndex != 0) {
					this.tmType = this.trademarkArray[this.trademarkIndex].tradeName;
				} else {
					this.tmType = '';
				}
			},
			async apply() {
				if (!this.tmName) {
					uni.showToast({
						title: '请输入商标名称',
						icon: 'none'
					});
					return false;
				} else if (!this.tmType) {
					uni.showToast({
						title: '请选择商标类别',
						icon: 'none'
					});
					return false;
				} else if (!this.tmExplain) {
					uni.showToast({
						title: '请填写商标说明',
						icon: 'none'
					});
					return false;
				} 
				
				if(this.isChecked == false) {
				  uni.showToast({
					title: '请先同意声明',
					icon: 'none'
				  });
				  return false
				}

				let data = {
					tm_name: this.tmName,
					tm_type: this.tmType,
					tm_explain: this.tmExplain,
					agency: '委托书'
				};

				let res = await request('/miniapi.esp?tm_need', data);

				if (res.success) {
					uni.showToast({
						title: res.msg,
						duration: 1000
					});
					setTimeout(() => {
						uni.switchTab({
							url: './index'
						});
					}, 1200);
				}
			},
			agreeBtn() {
				this.isChecked = !this.isChecked
			},
			async downLoad() {
				if(this.tmName.trim().length === 0) {
					uni.showToast({
						title:'请先填写商标名称',
						icon:'none'
					})
					return false
				}
				
				let res = await requestYuzhua('/lss/api.jsp?creat_logo',{
					title:this.tmName,
					page:1,
					page_size:10,
				})
				
				if(Object.keys(res.data.data).length == 0) {
					if(this.timer) {
						clearTimeout(this.timer)
					}
					this.timer = setTimeout(()=>{
						this.downLoad()
					},500)
				}else {
					this.imageUrl = res.data.data[0].img_svg
				}
				
			},
		}
	};
</script>

<style lang="scss">
	@import '@/static/css/regThree.scss';
</style>
