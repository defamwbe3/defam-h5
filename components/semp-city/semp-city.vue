<template>
	<view class="semp-city">
		<view class="title">
			<text>问题类别选择</text>			
		</view>
		<view class="has-choose-box flex-row pad-left">
			<text class="has-choose" :class="index==showRank?'active':''" v-for="(item,index) in cityList" :key="index"
			 @click="onRankClick(index)" v-show="index<=showRank">{{item.name!='0'?item.name:'请选择'}}</text>			
		</view>
		<view>
		<scroll-view id="city-item-box" scroll-y="true">
			<view class="city-item pad-left flex-row" v-for="(item,index) in cityList[showRank].showList" :key="index" 
			 :class="item.id==valueObj[cityList[showRank].identify].value?'active':''" @click="onChooseClick(item)">
				<view>{{item.name}}</view>
				<view v-if="item.id==valueObj[cityList[showRank].identify].value">
					<semp-icon type="gou" color="#0faeff" size="26"></semp-icon>
				</view>
			</view>	
		</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				other:{
					label:"",
					value:'0'
				},
				showRank:0,
				cityData: [],
				cityList:[
					{
						identify:'province',
						name:'0',
						showList:[],
					},
					{
						identify:'city',
						name:'0',
						showList:[]
					},
					{
						identify:'county',
						name:'0',						
						showList:[]
					},
					{
						identify:'town',
						name:'0',
						showList:[]
					}
				],
				valueObj:{
					province:{
						label:'',												
						value:'0'
					},
					city:{
						label:'',						
						value:'0'
					},
					county:{
						label:'',						
						value:'0'
					},
					town:{
						label:'',						
						value:'0'
					},						
				}		
			};
		},
		props: {
			// cityData: {
			// 	type: [Array],
			// 	default: []
			// },
		},
		watch:{
			// cityData(newDate, oldDate){
			// 	console.log(456,newDate)
			// 	this.cityData = newDate
			// 	this.cityList[0].showList = this.cityData
			// }
		},
		mounted() {
			this.getproblemList()
		},
		methods:{
			getproblemList() {
				this.$http('problem/get_problem').then(res=>{
					if(res.code === 10000) {
						this.cityData = res.data
						this.cityList[0].showList = this.cityData
					}
				})
			},
			onChooseClick(item){
				if(item.children!='' && item.children){
					this.valueObj[this.cityList[this.showRank].identify].label=item.name;
					this.valueObj[this.cityList[this.showRank].identify].value=item.id;
					this.cityList[this.showRank].name=item.name;
					// this.cityList[this.showRank+1].name='0';
					this.showRank++;
					this.cityList[this.showRank].showList=item.children;
				}else{
					this.valueObj.town.label='';
					this.valueObj.town.value='0';
					console.log(111,this.cityList[this.showRank].identify);
					this.valueObj[this.cityList[this.showRank].identify].label=item.name;
					this.valueObj[this.cityList[this.showRank].identify].value=item.id;	
					// this.cityList[this.showRank].name='0';
					console.log('valueObj',this.valueObj);
					this.$emit('confirm',this.valueObj);
				}
			},
			onRankClick(key){
				console.log(key);
				this.showRank=key;
				if(this.cityList[this.showRank]){
					this.valueObj[this.cityList[this.showRank].identify] = {}
				}
				if(this.cityList[this.showRank+1]){
					this.valueObj[this.cityList[this.showRank+1].identify] = {}
				}
				if(this.cityList[this.showRank+2]){
					this.valueObj[this.cityList[this.showRank+2].identify] = {}
				}
				if(this.cityList[this.showRank+3]){
					this.valueObj[this.cityList[this.showRank+3].identify] = {}
				}
				if(this.cityList[this.showRank+4]){
					this.valueObj[this.cityList[this.showRank+4].identify] = {}
				}
			},				
		},
		computed: {
			
		}
		
	
	}

</script>

<style>
	.flex-row{
		display: flex;
		flex-direction: row;
	
	}
	.pad-left{
		padding-left:30rpx
	}
	view{
		font-size:26rpx;
	}
	.semp-city{
	}
	.title{
		font-size: 30rpx;
		color: #000000;
		font-weight: 700;
		text-align: center;
		margin: 20rpx 0;
	}
   .has-choose-box{
	   height:80rpx;
	   box-shadow:  0 5rpx 5rpx #ccc;
	   line-height: 80rpx;	   
	}
	.has-choose{
		margin-right:50rpx;
		border-bottom:2px solid #f5f5f5;
	}
	.has-choose.active{
		color:#0faeff;
		border-color:#0faeff;
	}
	#city-item-box{
		height:500rpx;
	}
	.city-item{
		height:80rpx;		
		border-bottom:2rpx solid #F3f3f3;
		line-height: 80rpx;
	}
	.city-item view{
		justify-content: center;
	}
	.city-item.active{
		color:#0faeff;
	}
	.flex-row {
		display: flex;
		flex-direction: column;
		flex-direction: row;
	}
	.pad-left {
		padding-left: 30rpx;;
	}
</style>
