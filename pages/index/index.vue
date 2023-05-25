<template>
	<view class="container">
		<movable-area>
			<!-- #ifdef H5 -->
			<view class="content">
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<scroll-view :scroll-y="true" style="height: 100vh;" @scrolltolower="scrollhandle" lower-threshold="50">
					<view>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<view class="numlist flex-middle" v-if="userinfo">

							<view class="numlist-left1">
								<text class="numlist-img">
									<svg width="26" height="25" viewBox="0 0 26 25" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M20.3162 24.2404C20.9908 25.1915 21.47 24.8709 21.47 24.8709C22.9221 24.4638 22.7738 21.571 22.7738 21.571C22.5876 18.1216 20.7629 15.5998 20.7629 15.5998L16.8912 15.7475L14.2708 20.5443L14.1298 20.6703C14.1533 20.6703 14.1768 20.6721 14.2003 20.6739L14.137 20.791C14.5149 20.7478 14.8748 20.7442 15.2112 20.7676C16.8514 21.009 17.8496 21.6304 18.4229 22.0879C19.2728 22.7688 19.9039 23.655 20.318 24.2386L20.3162 24.2404Z"
											fill="url(#paint0_linear_251_584)" />
										<path
											d="M16.8677 7.68324C17.638 7.97505 19.2602 8.0507 20.8949 7.65262C20.9094 7.64902 20.9239 7.64542 20.9383 7.64361C21.1174 7.6166 22.5098 7.38243 24.2766 6.31428C24.3652 6.26205 24.4647 6.22962 24.566 6.22602C24.9168 6.21521 25.5967 6.39354 25.1537 8.07051C24.5732 10.2663 22.839 13.9192 20.8298 16.0159C20.8136 16.0339 20.7973 16.0519 20.7828 16.0717C20.5658 16.3707 18.3433 19.2383 10.0754 23.5938C10.0754 23.5938 7.42249 25.1122 5.74793 24.5791C5.16925 24.3953 4.83651 23.7883 5.01735 23.2083C5.10234 22.9309 5.2669 22.6031 5.56709 22.2392C5.56709 22.2392 7.52919 19.667 7.64492 16.2735C7.64673 16.205 7.6612 16.1366 7.68652 16.0735L8.98674 12.8006C9.03738 12.6727 9.13142 12.5647 9.25258 12.498L11.7084 11.1309L16.1299 8.474C16.3053 8.36772 16.4138 8.18219 16.421 7.97685C16.4282 7.72107 16.629 7.59138 16.8695 7.68144L16.8677 7.68324Z"
											fill="url(#paint1_linear_251_584)" />
										<path
											d="M15.1859 5.20828C15.1859 5.20828 18.0865 8.69733 18.0865 10.2518C18.0865 10.2518 18.2565 12.4836 14.8278 12.552C14.8278 12.552 10.0067 13.3302 9.53107 13.8705C9.53107 13.8705 7.96863 14.5136 7.63046 16.6427C7.63046 16.6427 7.48579 15.0306 5.96855 14.4614C5.75878 14.3839 5.53816 14.3425 5.31573 14.3317C4.43505 14.2956 1.44398 14.1732 1.21432 14.1732C0.943059 14.1732 -0.0750607 14.1047 0.943059 12.9897C1.96118 11.8747 5.97398 9.07019 10.3087 8.89727L10.8096 8.65409L13.9761 6.29985L15.1859 5.20648V5.20828Z"
											fill="url(#paint2_linear_251_584)" />
										<path
											d="M10.7607 1.68141C11.2797 1.80389 12.7536 2.40371 15.2744 5.31095C15.2744 5.31095 17.3396 8.20557 12.9489 8.74955C12.9489 8.74955 9.42252 8.82341 6.79675 9.57093C6.79675 9.57093 9.09882 8.82701 9.51114 5.98462C9.57262 5.56493 9.57081 5.13983 9.52922 4.71833C9.44965 3.90236 9.36827 1.99122 10.3249 1.68861C10.466 1.64358 10.6179 1.64718 10.7625 1.68141H10.7607Z"
											fill="url(#paint3_linear_251_584)" />
										<path
											d="M12.0067 4.29866C12.5541 4.29866 12.9977 3.54301 12.9977 2.61088C12.9977 1.67874 12.5541 0.923096 12.0067 0.923096C11.4594 0.923096 11.0157 1.67874 11.0157 2.61088C11.0157 3.54301 11.4594 4.29866 12.0067 4.29866Z"
											fill="black" />
										<path
											d="M12.2346 3.89697C12.656 3.89697 12.9977 3.32116 12.9977 2.61087C12.9977 1.90057 12.656 1.32477 12.2346 1.32477C11.8131 1.32477 11.4714 1.90057 11.4714 2.61087C11.4714 3.32116 11.8131 3.89697 12.2346 3.89697Z"
											fill="white" />
										<path
											d="M12.4787 3.12605C12.7654 3.12605 12.9977 2.81154 12.9977 2.42356C12.9977 2.03559 12.7654 1.72107 12.4787 1.72107C12.1921 1.72107 11.9597 2.03559 11.9597 2.42356C11.9597 2.81154 12.1921 3.12605 12.4787 3.12605Z"
											fill="black" />
										<path
											d="M11.0012 7.08342C11.0012 7.08342 13.1912 6.96274 14.9417 4.22662C14.9417 4.22662 13.3594 9.57817 11.0012 7.08342Z"
											fill="white" />
										<path
											d="M12.4714 7.44366C12.2617 7.47608 12.0428 7.41664 11.8186 7.26353C12.2834 7.13384 13.032 6.82403 13.8006 6.08911C13.4534 6.74477 12.9904 7.3626 12.4714 7.44366Z"
											fill="#FF9C9C" />
										<path
											d="M12.249 7.84172C11.8078 7.84172 11.3123 7.55893 10.8765 7.09961L11.1134 7.06898C11.5962 7.57874 12.0338 7.73005 12.5004 7.61837C13.6397 7.34638 14.316 5.26592 14.7374 4.5256C14.8748 4.28423 14.9399 4.22479 14.9399 4.22479C14.9019 4.35448 14.0737 7.44184 12.5456 7.8057C12.4461 7.82912 12.3467 7.84172 12.249 7.84172Z"
											fill="black" />
										<defs>
											<linearGradient id="paint0_linear_251_584" x1="15.911" y1="16.9291"
												x2="23.2728" y2="23.0387" gradientUnits="userSpaceOnUse">
												<stop stop-color="#0070FF" />
												<stop offset="1" stop-color="#1BD8DE" />
											</linearGradient>
											<linearGradient id="paint1_linear_251_584" x1="4.96852" y1="15.4611"
												x2="25.3002" y2="15.4611" gradientUnits="userSpaceOnUse">
												<stop stop-color="#2F4AF9" />
												<stop offset="1" stop-color="#FF00FD" />
											</linearGradient>
											<linearGradient id="paint2_linear_251_584" x1="6.66478" y1="13.7715"
												x2="21.2229" y2="4.73179" gradientUnits="userSpaceOnUse">
												<stop stop-color="#2F4AF9" />
												<stop offset="1" stop-color="#FF00FD" />
											</linearGradient>
											<linearGradient id="paint3_linear_251_584" x1="6.79494" y1="5.61356"
												x2="15.7591" y2="5.61356" gradientUnits="userSpaceOnUse">
												<stop stop-color="#0070FF" />
												<stop offset="1" stop-color="#1BD8DE" />
											</linearGradient>
										</defs>
									</svg>

								</text>
								<text class="numlist-name">
									{{logoName}}
								</text>
							</view>
							<view class="numlist-search" @click="toLogin()">
								<svg width="21" height="21" viewBox="0 0 21 21" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M9.25315 15.1987C10.5861 15.1987 11.8152 14.7677 12.8209 14.0493L16.6041 17.8326C16.7797 18.0082 17.0112 18.096 17.2586 18.096C17.7774 18.096 18.1446 17.6969 18.1446 17.1861C18.1446 16.9466 18.0647 16.7152 17.8892 16.5476L14.1299 12.7803C14.92 11.7427 15.3909 10.4577 15.3909 9.06088C15.3909 5.6847 12.6293 2.9231 9.25315 2.9231C5.88494 2.9231 3.11536 5.67672 3.11536 9.06088C3.11536 12.4371 5.87696 15.1987 9.25315 15.1987ZM9.25315 13.8737C6.61924 13.8737 4.44029 11.6948 4.44029 9.06088C4.44029 6.42698 6.61924 4.24803 9.25315 4.24803C11.887 4.24803 14.066 6.42698 14.066 9.06088C14.066 11.6948 11.887 13.8737 9.25315 13.8737Z"
										fill="black" fill-opacity="0.3" />
								</svg>
								ETH
							</view>
							<view class="numlist-icons">
								<view @click="$Router.push('/pages/user/integral/index')">
									{{userinfo.integral || '0.00'}}
									<text>
										<svg width="26" height="25" viewBox="0 0 26 25" fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M20.3162 24.2404C20.9908 25.1915 21.47 24.8709 21.47 24.8709C22.9221 24.4638 22.7738 21.571 22.7738 21.571C22.5876 18.1216 20.7629 15.5998 20.7629 15.5998L16.8912 15.7475L14.2708 20.5443L14.1298 20.6703C14.1533 20.6703 14.1768 20.6721 14.2003 20.6739L14.137 20.791C14.5149 20.7478 14.8748 20.7442 15.2112 20.7676C16.8514 21.009 17.8496 21.6304 18.4229 22.0879C19.2728 22.7688 19.9039 23.655 20.318 24.2386L20.3162 24.2404Z"
												fill="url(#paint0_linear_251_584)" />
											<path
												d="M16.8677 7.68324C17.638 7.97505 19.2602 8.0507 20.8949 7.65262C20.9094 7.64902 20.9239 7.64542 20.9383 7.64361C21.1174 7.6166 22.5098 7.38243 24.2766 6.31428C24.3652 6.26205 24.4647 6.22962 24.566 6.22602C24.9168 6.21521 25.5967 6.39354 25.1537 8.07051C24.5732 10.2663 22.839 13.9192 20.8298 16.0159C20.8136 16.0339 20.7973 16.0519 20.7828 16.0717C20.5658 16.3707 18.3433 19.2383 10.0754 23.5938C10.0754 23.5938 7.42249 25.1122 5.74793 24.5791C5.16925 24.3953 4.83651 23.7883 5.01735 23.2083C5.10234 22.9309 5.2669 22.6031 5.56709 22.2392C5.56709 22.2392 7.52919 19.667 7.64492 16.2735C7.64673 16.205 7.6612 16.1366 7.68652 16.0735L8.98674 12.8006C9.03738 12.6727 9.13142 12.5647 9.25258 12.498L11.7084 11.1309L16.1299 8.474C16.3053 8.36772 16.4138 8.18219 16.421 7.97685C16.4282 7.72107 16.629 7.59138 16.8695 7.68144L16.8677 7.68324Z"
												fill="url(#paint1_linear_251_584)" />
											<path
												d="M15.1859 5.20828C15.1859 5.20828 18.0865 8.69733 18.0865 10.2518C18.0865 10.2518 18.2565 12.4836 14.8278 12.552C14.8278 12.552 10.0067 13.3302 9.53107 13.8705C9.53107 13.8705 7.96863 14.5136 7.63046 16.6427C7.63046 16.6427 7.48579 15.0306 5.96855 14.4614C5.75878 14.3839 5.53816 14.3425 5.31573 14.3317C4.43505 14.2956 1.44398 14.1732 1.21432 14.1732C0.943059 14.1732 -0.0750607 14.1047 0.943059 12.9897C1.96118 11.8747 5.97398 9.07019 10.3087 8.89727L10.8096 8.65409L13.9761 6.29985L15.1859 5.20648V5.20828Z"
												fill="url(#paint2_linear_251_584)" />
											<path
												d="M10.7607 1.68141C11.2797 1.80389 12.7536 2.40371 15.2744 5.31095C15.2744 5.31095 17.3396 8.20557 12.9489 8.74955C12.9489 8.74955 9.42252 8.82341 6.79675 9.57093C6.79675 9.57093 9.09882 8.82701 9.51114 5.98462C9.57262 5.56493 9.57081 5.13983 9.52922 4.71833C9.44965 3.90236 9.36827 1.99122 10.3249 1.68861C10.466 1.64358 10.6179 1.64718 10.7625 1.68141H10.7607Z"
												fill="url(#paint3_linear_251_584)" />
											<path
												d="M12.0067 4.29866C12.5541 4.29866 12.9977 3.54301 12.9977 2.61088C12.9977 1.67874 12.5541 0.923096 12.0067 0.923096C11.4594 0.923096 11.0157 1.67874 11.0157 2.61088C11.0157 3.54301 11.4594 4.29866 12.0067 4.29866Z"
												fill="black" />
											<path
												d="M12.2346 3.89697C12.656 3.89697 12.9977 3.32116 12.9977 2.61087C12.9977 1.90057 12.656 1.32477 12.2346 1.32477C11.8131 1.32477 11.4714 1.90057 11.4714 2.61087C11.4714 3.32116 11.8131 3.89697 12.2346 3.89697Z"
												fill="white" />
											<path
												d="M12.4787 3.12605C12.7654 3.12605 12.9977 2.81154 12.9977 2.42356C12.9977 2.03559 12.7654 1.72107 12.4787 1.72107C12.1921 1.72107 11.9597 2.03559 11.9597 2.42356C11.9597 2.81154 12.1921 3.12605 12.4787 3.12605Z"
												fill="black" />
											<path
												d="M11.0012 7.08342C11.0012 7.08342 13.1912 6.96274 14.9417 4.22662C14.9417 4.22662 13.3594 9.57817 11.0012 7.08342Z"
												fill="white" />
											<path
												d="M12.4714 7.44366C12.2617 7.47608 12.0428 7.41664 11.8186 7.26353C12.2834 7.13384 13.032 6.82403 13.8006 6.08911C13.4534 6.74477 12.9904 7.3626 12.4714 7.44366Z"
												fill="#FF9C9C" />
											<path
												d="M12.249 7.84172C11.8078 7.84172 11.3123 7.55893 10.8765 7.09961L11.1134 7.06898C11.5962 7.57874 12.0338 7.73005 12.5004 7.61837C13.6397 7.34638 14.316 5.26592 14.7374 4.5256C14.8748 4.28423 14.9399 4.22479 14.9399 4.22479C14.9019 4.35448 14.0737 7.44184 12.5456 7.8057C12.4461 7.82912 12.3467 7.84172 12.249 7.84172Z"
												fill="black" />
											<defs>
												<linearGradient id="paint0_linear_251_584" x1="15.911" y1="16.9291"
													x2="23.2728" y2="23.0387" gradientUnits="userSpaceOnUse">
													<stop stop-color="#0070FF" />
													<stop offset="1" stop-color="#1BD8DE" />
												</linearGradient>
												<linearGradient id="paint1_linear_251_584" x1="4.96852" y1="15.4611"
													x2="25.3002" y2="15.4611" gradientUnits="userSpaceOnUse">
													<stop stop-color="#2F4AF9" />
													<stop offset="1" stop-color="#FF00FD" />
												</linearGradient>
												<linearGradient id="paint2_linear_251_584" x1="6.66478" y1="13.7715"
													x2="21.2229" y2="4.73179" gradientUnits="userSpaceOnUse">
													<stop stop-color="#2F4AF9" />
													<stop offset="1" stop-color="#FF00FD" />
												</linearGradient>
												<linearGradient id="paint3_linear_251_584" x1="6.79494" y1="5.61356"
													x2="15.7591" y2="5.61356" gradientUnits="userSpaceOnUse">
													<stop stop-color="#0070FF" />
													<stop offset="1" stop-color="#1BD8DE" />
												</linearGradient>
											</defs>
										</svg>
									</text>
								</view>
								<view @click="$Router.push('/pages/user/mymap/myMap')">
									{{userinfo.suipian_total}}
									<text><svg width="15" height="12" viewBox="0 0 15 12" fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M13.9052 4.22176L12.0292 0.716425C11.8546 0.391092 11.5279 0.189758 11.1746 0.189758H3.82525C3.47192 0.189758 3.14525 0.391092 2.97058 0.716425L1.09458 4.22176C0.882583 4.61776 0.935916 5.10976 1.22658 5.44442L6.78658 11.3311C6.97058 11.5378 7.23058 11.6564 7.49992 11.6564C7.76925 11.6564 8.02925 11.5378 8.21325 11.3311L13.7586 5.46043L13.7732 5.44442C14.0639 5.10976 14.1172 4.61776 13.9052 4.22176ZM12.7252 4.27776H9.94125L8.49858 1.25642H11.1079L12.7252 4.27776ZM6.23058 4.25109L7.49992 1.64042L8.74525 4.25109H6.23058ZM8.83058 5.31776L7.47992 9.03376L6.13858 5.31776H8.83058ZM5.00392 5.31776L6.50925 9.48309L2.54925 5.29109H4.53858L4.52525 5.31776H5.00392ZM9.96525 5.31776H10.4372L10.4252 5.29109H12.4506L8.42658 9.55243L9.96525 5.31776ZM3.89192 1.25642H6.50125L5.03192 4.27776H2.27458L3.89192 1.25642Z"
												fill="#333C4F" />
											<path
												d="M13.9052 4.22176L12.0292 0.716425C11.8546 0.391092 11.5279 0.189758 11.1746 0.189758H3.82525C3.47192 0.189758 3.14525 0.391092 2.97058 0.716425L1.09458 4.22176C0.882583 4.61776 0.935916 5.10976 1.22658 5.44442L6.78658 11.3311C6.97058 11.5378 7.23058 11.6564 7.49992 11.6564C7.76925 11.6564 8.02925 11.5378 8.21325 11.3311L13.7586 5.46043L13.7732 5.44442C14.0639 5.10976 14.1172 4.61776 13.9052 4.22176ZM12.7252 4.27776H9.94125L8.49858 1.25642H11.1079L12.7252 4.27776ZM6.23058 4.25109L7.49992 1.64042L8.74525 4.25109H6.23058ZM8.83058 5.31776L7.47992 9.03376L6.13858 5.31776H8.83058ZM5.00392 5.31776L6.50925 9.48309L2.54925 5.29109H4.53858L4.52525 5.31776H5.00392ZM9.96525 5.31776H10.4372L10.4252 5.29109H12.4506L8.42658 9.55243L9.96525 5.31776ZM3.89192 1.25642H6.50125L5.03192 4.27776H2.27458L3.89192 1.25642Z"
												fill="url(#paint0_linear_251_632)" />
											<defs>
												<linearGradient id="paint0_linear_251_632" x1="0.966021" y1="5.92434"
													x2="14.035" y2="5.92434" gradientUnits="userSpaceOnUse">
													<stop stop-color="#2F4AF9" />
													<stop offset="1" stop-color="#FF00FD" />
												</linearGradient>
											</defs>
										</svg>
									</text>
								</view>
							</view>

							<!-- <view class="logo">
								<image :src="IMG_URL + 'logoIndex.png'" mode=""></image>
							</view> -->
							<!-- <view class="numlist-name">
					{{logoName}}
				</view> -->
							<!-- <view class="item flex-middle">积分：{{userinfo.integral || '0.00'}}<text
									@click="$Router.push('/pages/user/integral/index')">去兑换</text></view>
							<view class="item flex-middle">藏宝图碎片：{{userinfo.suipian_total}}<text
									@click="$Router.push('/pages/user/mymap/myMap')">去兑换</text></view> -->
						</view>
						<!-- #endif -->
						<!-- 搜索 -->
						<!-- <navbarsearch :tabsactive="tabsactive" :userinfo="userinfo"></navbarsearch> -->
						<!-- 轮播 -->
						<AppBanner :bannerList="bannerList" previousMargin="40rpx" nextMargin="40rpx"></AppBanner>
						<!-- 精选 -->

						<view class="jingxuan">
							<view class="jingxuan-title">
								<text>
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<g clip-path="url(#clip0_219_380)">
											<path
												d="M0 8C-1.56548e-08 9.05058 0.206926 10.0909 0.608964 11.0615C1.011 12.0321 1.60028 12.914 2.34315 13.6569C3.08601 14.3997 3.96793 14.989 4.93853 15.391C5.90914 15.7931 6.94943 16 8 16C9.05058 16 10.0909 15.7931 11.0615 15.391C12.0321 14.989 12.914 14.3997 13.6569 13.6569C14.3997 12.914 14.989 12.0321 15.391 11.0615C15.7931 10.0909 16 9.05058 16 8C16 6.94943 15.7931 5.90914 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608964C10.0909 0.206926 9.05058 0 8 0C6.94943 0 5.90914 0.206926 4.93853 0.608964C3.96793 1.011 3.08601 1.60028 2.34315 2.34315C1.60028 3.08601 1.011 3.96793 0.608964 4.93853C0.206926 5.90914 -1.56548e-08 6.94943 0 8Z"
												fill="url(#paint0_linear_219_380)" />
											<path
												d="M8.02296 10.567L6.57846 11.3265C6.49586 11.3698 6.40279 11.3892 6.30977 11.3824C6.21675 11.3756 6.12748 11.3429 6.05206 11.288C5.97664 11.2331 5.91808 11.1583 5.88298 11.0718C5.84788 10.9854 5.83766 10.8909 5.85346 10.799L6.12896 9.191C6.14269 9.11114 6.1368 9.02913 6.1118 8.95205C6.08681 8.87496 6.04345 8.80511 5.98546 8.7485L4.81696 7.61C4.75025 7.54487 4.70309 7.46239 4.68078 7.37187C4.65848 7.28135 4.66192 7.1864 4.69073 7.09774C4.71954 7.00907 4.77257 6.93023 4.84382 6.87011C4.91507 6.80999 5.00171 6.77098 5.09396 6.7575L6.70896 6.5225C6.7891 6.51078 6.86519 6.47976 6.93068 6.43212C6.99618 6.38447 7.04912 6.32164 7.08496 6.249L7.80696 4.786C7.84822 4.70227 7.9121 4.63176 7.99136 4.58246C8.07063 4.53315 8.16211 4.50702 8.25546 4.50702C8.34881 4.50702 8.44029 4.53315 8.51955 4.58246C8.59882 4.63176 8.6627 4.70227 8.70396 4.786L9.42596 6.249C9.46178 6.32179 9.51477 6.38477 9.58037 6.43251C9.64596 6.48024 9.72218 6.5113 9.80246 6.523L11.4175 6.7575C11.5097 6.77106 11.5962 6.81012 11.6674 6.87027C11.7386 6.93042 11.7916 7.00927 11.8203 7.09793C11.8491 7.18658 11.8525 7.2815 11.8302 7.37198C11.8078 7.46247 11.7607 7.54491 11.694 7.61L10.526 8.749C10.4679 8.80556 10.4244 8.87539 10.3993 8.95248C10.3743 9.02957 10.3683 9.1116 10.382 9.1915L10.658 10.7995C10.6738 10.8915 10.6636 10.9861 10.6285 11.0726C10.5934 11.1591 10.5348 11.234 10.4593 11.2889C10.3838 11.3438 10.2944 11.3765 10.2013 11.3832C10.1082 11.3899 10.0151 11.3705 9.93246 11.327L8.48796 10.5675C8.41625 10.5298 8.33646 10.5102 8.25546 10.5102C8.17446 10.5102 8.09467 10.5298 8.02296 10.5675V10.567Z"
												fill="#002AB1" />
											<path
												d="M7.77994 10.324L6.33544 11.083C6.25287 11.1264 6.1598 11.1458 6.06675 11.1391C5.9737 11.1324 5.88439 11.0998 5.80891 11.045C5.73343 10.9901 5.67479 10.9153 5.63963 10.8289C5.60447 10.7425 5.59419 10.6479 5.60994 10.556L5.88594 8.94799C5.89961 8.86808 5.89364 8.78605 5.86856 8.70896C5.84347 8.63188 5.80002 8.56204 5.74194 8.50549L4.57344 7.36649C4.50658 7.30134 4.45929 7.21878 4.43693 7.12816C4.41456 7.03753 4.41801 6.94245 4.44689 6.85368C4.47577 6.76491 4.52892 6.686 4.60033 6.62587C4.67174 6.56575 4.75855 6.52682 4.85094 6.51349L6.46544 6.27899C6.54567 6.26733 6.62186 6.23635 6.68745 6.18871C6.75304 6.14106 6.80606 6.07818 6.84194 6.00549L7.56394 4.54249C7.60526 4.45889 7.66913 4.38851 7.74834 4.3393C7.82755 4.29009 7.91894 4.26401 8.01219 4.26401C8.10544 4.26401 8.19684 4.29009 8.27605 4.3393C8.35526 4.38851 8.41913 4.45889 8.46044 4.54249L9.18244 6.00549C9.21833 6.07818 9.27135 6.14106 9.33694 6.18871C9.40252 6.23635 9.47872 6.26733 9.55894 6.27899L11.1739 6.51399C11.2662 6.52747 11.3528 6.56647 11.4241 6.62659C11.4953 6.68671 11.5484 6.76555 11.5772 6.85422C11.606 6.94288 11.6094 7.03784 11.5871 7.12836C11.5648 7.21888 11.5176 7.30136 11.4509 7.36649L10.2824 8.50549C10.2245 8.56209 10.1811 8.63195 10.1561 8.70903C10.1311 8.78612 10.1252 8.86812 10.1389 8.94799L10.4144 10.556C10.4301 10.6479 10.4198 10.7423 10.3847 10.8286C10.3495 10.915 10.291 10.9898 10.2156 11.0446C10.1402 11.0994 10.0509 11.132 9.95798 11.1388C9.86501 11.1456 9.772 11.1263 9.68944 11.083L8.24494 10.324C8.17323 10.2863 8.09344 10.2666 8.01244 10.2666C7.93144 10.2666 7.85165 10.2863 7.77994 10.324Z"
												fill="white" />
											<path
												d="M10.3065 5.1615L10.2455 5.194C10.2184 5.20827 10.1879 5.21466 10.1573 5.21246C10.1268 5.21025 10.0975 5.19954 10.0727 5.18154C10.048 5.16353 10.0287 5.13895 10.0172 5.11058C10.0057 5.08221 10.0023 5.05118 10.0075 5.021L10.0195 4.953C10.0332 4.8731 10.0272 4.79107 10.0022 4.71398C9.97707 4.63689 9.93361 4.56706 9.87554 4.5105L9.82604 4.462C9.80419 4.44063 9.78875 4.41357 9.78146 4.38389C9.77418 4.3542 9.77533 4.32307 9.78479 4.29401C9.79425 4.26495 9.81165 4.23911 9.83502 4.2194C9.85838 4.1997 9.88679 4.18692 9.91704 4.1825L9.98554 4.1725C10.0658 4.16085 10.142 4.12987 10.2075 4.08223C10.2731 4.03458 10.3262 3.9717 10.362 3.899L10.392 3.837C10.4055 3.80946 10.4265 3.78626 10.4525 3.77004C10.4786 3.75381 10.5086 3.74521 10.5393 3.74521C10.57 3.74521 10.6 3.75381 10.626 3.77004C10.6521 3.78626 10.673 3.80946 10.6865 3.837L10.7165 3.899C10.7525 3.97176 10.8056 4.03468 10.8712 4.08233C10.9369 4.12998 11.0132 4.16093 11.0935 4.1725L11.162 4.1825C11.1923 4.18693 11.2208 4.19975 11.2442 4.21952C11.2676 4.23928 11.285 4.2652 11.2944 4.29435C11.3038 4.32349 11.3049 4.35469 11.2975 4.38441C11.2901 4.41413 11.2745 4.44118 11.2525 4.4625L11.203 4.5105C11.145 4.56711 11.1017 4.63697 11.0767 4.71405C11.0517 4.79113 11.0458 4.87314 11.0595 4.953L11.071 5.021C11.0762 5.05118 11.0729 5.08221 11.0614 5.11058C11.0499 5.13895 11.0306 5.16353 11.0059 5.18154C10.9811 5.19954 10.9518 5.21025 10.9212 5.21246C10.8907 5.21466 10.8601 5.20827 10.833 5.194L10.772 5.1615C10.7003 5.12384 10.6205 5.10416 10.5395 5.10416C10.4585 5.10416 10.3787 5.12384 10.307 5.1615H10.3065ZM11.3925 6.3665C11.379 6.37364 11.3637 6.37683 11.3484 6.37573C11.3332 6.37463 11.3185 6.36927 11.3061 6.36027C11.2937 6.35127 11.2841 6.33898 11.2784 6.32479C11.2726 6.31061 11.2709 6.29509 11.2735 6.28C11.2821 6.22953 11.2784 6.17772 11.2625 6.12903C11.2467 6.08034 11.2192 6.03623 11.1825 6.0005C11.1715 5.98983 11.1638 5.97628 11.1601 5.9614C11.1564 5.94652 11.1569 5.93091 11.1617 5.91633C11.1664 5.90175 11.1751 5.8888 11.1869 5.87893C11.1986 5.86906 11.2129 5.86268 11.228 5.8605C11.2787 5.85319 11.3269 5.83366 11.3683 5.80361C11.4098 5.77356 11.4433 5.73389 11.466 5.688C11.4728 5.6743 11.4833 5.66277 11.4963 5.6547C11.5093 5.64663 11.5242 5.64236 11.5395 5.64236C11.5548 5.64236 11.5698 5.64663 11.5828 5.6547C11.5958 5.66277 11.6063 5.6743 11.613 5.688C11.659 5.7815 11.748 5.846 11.8505 5.861C11.8657 5.86318 11.88 5.86956 11.8917 5.87943C11.9034 5.8893 11.9122 5.90225 11.9169 5.91683C11.9216 5.93141 11.9222 5.94702 11.9185 5.9619C11.9148 5.97678 11.907 5.99033 11.896 6.001C11.8594 6.03668 11.832 6.08071 11.8162 6.1293C11.8003 6.17789 11.7965 6.22961 11.805 6.28C11.8076 6.29503 11.8059 6.31046 11.8001 6.32457C11.7944 6.33867 11.7848 6.35091 11.7725 6.35989C11.7602 6.36887 11.7457 6.37425 11.7305 6.37541C11.7153 6.37658 11.7001 6.3735 11.6865 6.3665C11.6412 6.34268 11.5908 6.33023 11.5395 6.33023C11.4883 6.33023 11.4379 6.34268 11.3925 6.3665Z"
												fill="white" />
										</g>
										<defs>
											<linearGradient id="paint0_linear_219_380" x1="0.000394759" y1="8.00174"
												x2="16.001" y2="8.00174" gradientUnits="userSpaceOnUse">
												<stop stop-color="#2F4AF9" />
												<stop offset="1" stop-color="#FF00FD" />
											</linearGradient>
											<clipPath id="clip0_219_380">
												<rect width="16" height="16" fill="white" />
											</clipPath>
										</defs>
									</svg>
									精选
								</text>
								<text>
									<!-- 更多
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path opacity="0.5"
											d="M9.07803 8.00067L5.26926 11.5275C5.11724 11.6694 5.02201 11.8725 5.00443 12.0922C4.98686 12.312 5.04836 12.5305 5.17548 12.7C5.3026 12.8695 5.48498 12.9761 5.68267 12.9964C5.88036 13.0168 6.07726 12.9493 6.23024 12.8087L10.7304 8.64125C10.8148 8.56291 10.8827 8.46494 10.9293 8.35425C10.9759 8.24357 11 8.12287 11 8.00068C11 7.87849 10.9759 7.75779 10.9293 7.6471C10.8827 7.53642 10.8148 7.43844 10.7304 7.3601L6.23024 3.19272C6.07733 3.05142 5.88019 2.98335 5.68214 3.00346C5.4841 3.02358 5.30133 3.13023 5.174 3.29999C5.04666 3.46974 4.98517 3.68873 5.00303 3.90883C5.0209 4.12894 5.11665 4.33216 5.26926 4.47387L9.07803 8.00067Z"
											fill="#333333" />
									</svg> -->

								</text>
							</view>
							<view class="jingxuan-box">
								<u-scroll-list>
									<view @click="toDetail(item)" class="jingxuan-item" v-for="(item, index) in jingxuanList" :key="index">
										<image :src="item.f_img"></image>
										<!-- <u--image :showLoading="true" :src="item.f_img" width="80px" height="80px" @click="click"></u--image> -->
										<view>{{item.title}}</view>
									</view>
								</u-scroll-list>
							</view>

						</view>
						<!-- 公告 -->
						<!-- <AppNotice :noticeList="noticeList"></AppNotice> -->
						<!-- <view class="tagBox">
							<view class="classifys-item" v-for="(item, index) in tagList" type="info" :key="index">
								{{ item.name }}
							</view>
						</view> -->

						<!-- 标签 -->
						<u-sticky bgColor="#FAFAFE" <!-- #ifdef MP-WEIXIN -->
							customNavHeight="88"
							<!-- #endif -->
							<!-- #ifdef H5 -->
							customNavHeight="0"
							<!-- #endif -->
							>
							<!-- <view class="tabs">
								<u-tabs :list="tabslist" :current="tabsactive" @click="tabshandle" lineColor="#1B1BDD"
									:activeStyle="{color:'#1B1BDD'}" inactiveStyle="color: #666666" lineWidth="30"
									itemStyle="padding-left: 15px; padding-right: 15px; height: 44px;"></u-tabs>
							</view> -->
						</u-sticky>

						<!-- <u-loading-page :loading="pageLoading"></u-loading-page> -->
						<block v-if="!pageLoading">
							<view class="bottom" v-if="list && list.length">
								<!-- 热门资讯 -->
								<realimeinfo v-if="tabsactive==0" :list="list"></realimeinfo>
								<!-- 热门活动 -->
								<activitylist v-if="tabsactive==1" :list="list"></activitylist>
								<!-- 热门KOL 不可以添加 -->
								<!-- <articlelist v-if="tabsactive==2" :list="5" :isadd="false"></articlelist> -->
								<!-- 热门文章 可以添加 -->
								<!-- 这里的热门文章展示的是经过后台管理员精选出来的长短文 -->
								<articlelist v-if="tabsactive==2" :list="list" :isadd="true"
									@acticlehandle="acticlehandle" @integralhandle="integralhandle"
									:memberId="userinfo.id"></articlelist>
							</view>
							<engine-empty v-else :tipText="'暂无列表信息'"></engine-empty>
						</block>
						<view class="bottom beian flex" @click="beian" v-if="!pageLoading">
							<image class="beian-img2" src="../../static/images/beian-cj.png.gif" mode=""></image>
							<image class="beian-img1" src="../../static/images/beian.png" mode=""></image>
							<view class="beian-text">粤ICP备2023010984号-1</view>
						</view>
						<!-- #ifdef MP-WEIXIN -->
					</view>
				</scroll-view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
			</view>
			<!-- #endif -->
			<!-- 添加拖拽 -->
			<!-- <movable-view :x="x" :y="y" direction="all" @change="onChange">
				<image :src="IMG_URL+'add.png'" mode="" @click.stop="$Router.push('/pages/release/index')"></image>
			</movable-view> -->
		</movable-area>

		<engine-tabbar></engine-tabbar>
		<!-- 登录提示 -->
		<login-modal></login-modal>
		<isintegral :inputmode="inputmode" :integramessage="integramessage" :integramessagedata="integramessagedata"
			@tozizhihandle="tozizhihandle"></isintegral>
	</view>
</template>

<script>
	import AppBanner from '@/components/common/AppBanner.vue';
	import AppNotice from '@/components/common/AppNotice.vue';
	import isintegral from '@/components/common/is_integral.vue';
	import {
		userInfo
	} from '@/engine/storage';
	import navbarsearch from './components/navbarsearch.vue';
	import realimeinfo from './components/realimeinfo.vue';
	import activitylist from './components/activitylist.vue';
	import articlelist from './components/articlelist.vue';
	export default {
		components: {
			AppBanner,
			AppNotice,
			navbarsearch,
			realimeinfo,
			activitylist,
			articlelist,
			isintegral
		},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				bannerList: [{
						id: 1,
						image: this.$IMG_URL + 'banner.png',
						path: 'https://juejin.cn/'
					},
					{
						id: 1,
						image: this.$IMG_URL + 'banner1.png',
						path: 'https://juejin.cn/'
					},
					{
						id: 1,
						image: this.$IMG_URL + 'banner2.png',
						path: 'https://juejin.cn/'
					}
				],
				noticeList: [{
						id: 1,
						title: '公告信息'
					},
					{
						id: 1,
						title: '公告信息'
					}
				],
				tabslist: [{
						id: 0,
						name: '热门资讯',
					},
					{
						id: 1,
						name: '热门活动'
					},
					// {id: 2,name: '热门KOL'},
					{
						id: 2,
						name: '热门文章'
					},
				],
				tabsactive: 0,
				x: 300,
				y: 690,
				old: {
					x: 0,
					y: 0
				},
				userinfo: {},
				list: [],
				hasNext: false,
				page: 1,
				loadStatus: 'loadmore',
				pageLoading: true,
				disalbed: false,
				inputmode: false,
				integramessage: '',
				integramessagedata: {},
				logo: '',
				logoName: '',
				tagList: [],
				jingxuanList: []
			}
		},
		onShow() {
			let bottom = 0
			uni.getSystemInfo({
				success: function(res) {
					bottom = res.safeAreaInsets.bottom
				}
			})
			this.y = uni.getWindowInfo().screenHeight - (180 + bottom)
			this.getbannerList();
			this.getnoticelist();
			this.gettagList()

			if (uni.getStorageSync('token')) {
				userInfo.get(true).then(res => {
					this.userinfo = res
				})
				this.tabslist = [{
						id: 0,
						name: '热门资讯',
					},
					{
						id: 1,
						name: '热门活动'
					},
					// {id: 2,name: '热门KOL'},
					{
						id: 2,
						name: '热门文章'
					},
				]
			} else {
				this.tabslist = [{
						id: 0,
						name: '热门资讯',
					},
					{
						id: 1,
						name: '热门活动',
						disabled: true
					},
					// {id: 2,name: '热门KOL',disabled: true},
					{
						id: 2,
						name: '热门文章',
						disabled: true
					},
				]
			}
		},
		onLoad() {
			this.getLogo();
			this.getList();
			this.getJXList();
			setTimeout(() => {
				this.pageLoading = false
			}, 1000)
		},
		watch: {},
		onPullDownRefresh() {
			this.getbannerList();
			this.getnoticelist();
			this.gettagList()

			this.page = 1;
			this.getList();
			this.getJXList();
		},
		onShareAppMessage(res) {
			this.$http('member/forward', {
				action_id: res.target.dataset.id,
				type: 2
			}, 'get').then(res => {}).catch(() => {})
		},
		mounted() {
			this.$nextTick(() => {
				// #ifdef H5
				let scrollTargetBox = document.querySelector('.content');
				console.log(scrollTargetBox.scrollHeight)
				scrollTargetBox.onscroll = () => {
					var scrollHeight = scrollTargetBox.scrollHeight;
					var scrollTop = scrollTargetBox.scrollTop;
					var clientHeight = scrollTargetBox.clientHeight;
					// console.log(scrollHeight,clientHeight,scrollTop )
					// if (scrollHeight - clientHeight == scrollTop) {
					// 	//滚动条滚到最底部
					// 	if (this.hasNext) {
					// 		this.page++;
					// 		this.getList();
					// 	}
					// }
				}
				// #endif
			})
		},
		// onReachBottom() {
		// 	if(this.hasNext) {
		// 		this.page++;
		// 		this.getList();
		// 	}
		// },
		methods: {
			toDetail(item){
				this.$Router.push({
					path: '/pages/index/articledetails',
					query: {
						type: '1',
						id: item.id
					}
				})
			},
			getJXList() {
				this.$http('realinfo/recommend_list', {
					is_page: 0,
					page: 1,
					limit: 4
				}, 'get').then((res) => {
					this.jingxuanList = res.data.data || []
				}).catch(() => {})
			},
			toLogin() {
				if (uni.getStorageSync('token')) {
					this.$Router.push({
						path: '/pages/other/search',
						query: {
							tabsactive: this.tabsactive
						}
					})
				} else {
					this.$store.commit('IS_LOGIN', true);
					// uni.navigateTo({
					// 	url:'/pages/public/login'
					// })
				}
			},
			click() {
				// saveImg(url) {
				var oA = document.createElement("a");
				oA.download = ''; // 设置下载的文件名，默认是'下载'
				oA.href = 'https://api.defam.info/icon/avatar.png';
				document.body.appendChild(oA);
				oA.click();
				oA.remove(); // 下载之后把创建的元素删除
				// },
			},
			scrollhandle(e) {
				console.log(e)
				if (this.hasNext) {
					this.page++;
					this.getList();
				}
			},
			// 获取LOGO
			getLogo() {
				this.$http('config', {
					module: 'basic'
				}, 'get').then((res) => {
					this.logo = res.data.logo
					this.logoName = res.data.name
				}).catch(() => {})
			},
			//获取公告notice?is_page=1&page=&limit=
			getnoticelist() {
				this.$http('notice', {
					is_page: 0,
					page: 1,
					limit: 10
				}, 'get').then((res) => {
					uni.stopPullDownRefresh()
					this.noticeList = res.data || []
				}).catch(() => {})
			},
			gettagList() {
				this.$http('tage/recommend', {
					// is_page: 0,
					// page: 1,
					// limit: 10
				}, 'get').then((res) => {
					uni.stopPullDownRefresh()
					this.tagList = res.data || []
				}).catch(() => {})
			},
			tabshandle(item) {
				// if(uni.getStorageSync('token')){
				this.tabsactive = item.index
				this.page = 1;
				this.list = [];
				this.getList();
				// }else{
				// this.$store.commit('IS_LOGIN', true);
				// uni.navigateTo({
				// 	url:'/pages/public/login'
				// })
				// }
			},
			//热门文章article/index_article
			//热门资讯realinfo/index_realinfo
			getList() {
				let url = ''
				if (this.tabsactive == 0) {
					url = 'realinfo/index_realinfo'
				} else if (this.tabsactive == 2) {
					url = 'article/index_article'
				} else if (this.tabsactive == 1) {
					url = 'activity/hot_activity'
				}
				this.pageLoading = true
				this.$http(url, this.tabsactive != 1 ? {
					page: this.page
				} : {
					page: this.page,
					status: 'hot'
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					this.pageLoading = false
					if (this.tabsactive == 0 || this.tabsactive == 2) {
						for (let item of res.data.data) {
							item.created_at = this.$tools.getTimeInterval(new Date(item.created_at).getTime(),
								new Date().getTime())
						}
					}
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.list = this.page == 1 ? newData.data : [...this.list, ...newData.data];
				}).catch(() => {})
			},
			acticlehandle(e) {
				if (e.dianzan) {
					this.page = 1;
					this.getList()
				}
			},
			integralhandle(e) {
				this.inputmode = e.inputmode
				this.integramessage = e.message
				this.integramessagedata = e.messagedata
			},
			tozizhihandle(e) {
				this.inputmode = e
			},
			//banner数据
			getbannerList() {
				this.$http('banner', {
					is_page: 0,
					code: 'index'
				}, 'get').then((res) => {
					uni.stopPullDownRefresh()
					this.bannerList = res.data || []
				}).catch(() => {})
			},
			onChange(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			beian() {
				this.$tools.routerTo('https://beian.miit.gov.cn/')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.tagBox {
		width: 95%;
		margin: 15upx auto 0upx;
		display: flex;
		// margin-top: 15upx;
		overflow-x: scroll;
		border-bottom: 1px #646464 solid;
		padding-bottom: 10px;

		.classifys-item {

			margin-top: 10px;
			border-radius: 4upx;
			border: 1upx solid #000000;
			font-size: 12upx;
			font-family: Oswald-Regular, Oswald;
			font-weight: 400;
			color: #151515;
			white-space: nowrap;
			margin-left: 13upx;
			padding: 5upx 10upx;
		}
	}

	.container {
		overflow: hidden;
		max-height: 100vh;

		.content {
			height: 100vh;
			overflow: scroll;
			// #ifdef H5
			margin-top: -2upx;
			// #endif
		}

		.bottom {
			padding-bottom: calc(120upx + env(safe-area-inset-bottom));
		}

		.tabs {
			margin-top: 10upx;
			padding: 0 15upx;
		}
	}

	.tabs {
		/deep/.u-tabs__wrapper__nav__item__text--disabled {
			color: #606266 !important;
		}
	}

	movable-view {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 136upx;
		height: 136upx;
		z-index: 9999;

		image {
			width: 136upx;
			height: 136upx;
		}
	}

	movable-area {
		width: 100%;
		height: 100%;
	}

	.numlist {
		padding: 20upx 0upx 20upx 32upx;

		.logo {
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;

			image {
				width: 60rpx;
				height: 60rpx;
				border-radius: 0rpx;
			}
		}

		.numlist-left1 {
			width: 200rpx;

			.numlist-img {
				svg {
					width: 60rpx;
					height: 60rpx;
					vertical-align: middle;
					margin-top: -20rpx;
				}
			}


			.numlist-name {
				width: 18%;
				font-size: 30rpx;
				color: #060606;
				font-weight: 800;
				margin-left: 5rpx;
			}
		}

		.numlist-search {
			width: 290rpx;
			height: 65rpx;
			background: #f1f1f2;
			border-radius: 65rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: rgba(0, 0, 0, 0.3);

		}

		.numlist-icons {
			padding-left: 20rpx;
			display: flex;
			justify-content: space-around;
			color: #2F4AF9;
			font-weight: 700;
			white-space: nowrap;

			svg {
				width: 30rpx;
				height: 30rpx;
				margin: 0 15rpx;
				vertical-align: middle;
				margin-top: -5rpx;
			}
		}

		.item {
			font-size: 26upx;
			color: #666666;
			width: 50%;

			text {
				display: inline-block;
				width: 86rpx;
				height: 40rpx;
				border-radius: 8rpx;
				background: rgba(27, 27, 221, 0.1);
				color: #1B1BDD;
				font-size: 24upx;
				text-align: center;
				line-height: 40upx;
				margin-left: 10upx;
			}
		}
	}

	.beian {
		margin: 0 140rpx 0rpx;

		.beian-img1 {
			width: 38rpx;
			height: 38rpx;
			margin-left: 20rpx;
		}

		.beian-img2 {
			width: 38rpx;
			height: 38rpx;
		}

		.beian-text {
			margin-left: 20rpx;
			color: #111;
		}
	}

	.jingxuan {
		/deep/ .u-scroll-list__indicator{
			display: none;
		}
		.jingxuan-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-left: 40rpx;
			height: 60rpx;
			margin-top: 20rpx;

			text {
				svg {
					vertical-align: middle;
					margin: -8rpx 10rpx 0 10rpx;
				}
			}
		}

		.jingxuan-box {
			padding-left: 40rpx;
			// 	overflow-y: hidden;
			// 	overflow-x: auto;
			height: 268rpx;

			// 	>view {
			// 		display: flex;
			// 		width: 100%;
			// 		width: calc(300rpx * 4 + 40rpx * 3);

			.jingxuan-item {
				width: 300rpx;
				height: 268rpx;
				margin-right: 40rpx;
				border-radius: 20rpx;

				uni-image {
					height: 168rpx;
				}

				>view {
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					display: -webkit-box;
					-webkit-box-orient: vertical;

					font-size: 26rpx;
					font-weight: 700;
				}

				// 			&:last-of-type {
				// 				margin-right: 0;
				// 			}
			}

			// 	}
		}
	}
</style>