<template>
    <!-- 未设置支付密码 -->
    <u-popup :show="isShow" mode="bottom"
        :customStyle="{ width: '92%', background: '#383838', marginBottom: '0rpx', marginLeft: '4%' }">
        <view class="mods">
            <view class="heads">
                <image src="/static/images/zhifumima.png" class="thumb" mode="aspectFill"></image>
            </view>
            <view>
                <view class="text">您尚未设置支付密码</view>
                <view class="text text1">当前操作需要支付密码，是否继续？</view>
            </view>
            <view class="btns">
                <button class="button" @click="toSetPayPwd">前往设置</button>
                <button class="button" @click="$emit('update:isShow', false)">以后再说</button>
            </view>
        </view>
    </u-popup>
</template>

<script>
export default {
    props: ['isShow'],
    methods: {
        // 设置支付密码
        toSetPayPwd() {
            this.$Router.push({ path: '/pages/user/payPassword/index', query: { type: 'add' } });
            this.$emit('update:isShow', false)
        },
    }
}
</script>

<style lang="scss" scoped>
.mods {
    padding-bottom: 20rpx;
    padding-top: 20rpx;

    .heads {
        text-align: center;

        image {
            width: 349rpx;
            height: 277rpx;
            margin: 30rpx 0;
        }
    }

    .text {
        text-align: center;
        font-size: 28rpx;
        font-weight: 600;
        color: $textwhite;
    }

    .text1 {
        color: $secondFontColor;
        margin-top: 20rpx;
    }

    .btns {
        padding: 30rpx;
        padding-bottom: 0;

        .button {
            width: 60%;
            margin: 0 auto;
            height: 70rpx;
            line-height: 70rpx;
            text-align: center;
            font-size: 30rpx;
            border: none;
            background: $btnColor;
            color: $btnText;
            border-radius: 0;
            margin-top: 20rpx;
            font-weight: 600;
        }

        .button:last-child {
            background: none;
            color: $secondFontColor;
            font-weight: 500;
        }

        .button::after {
            border: none;
        }
    }
}
</style>