<template>
	<section>
		<div class="timebox">
			<el-date-picker v-if="dateShow" style="width:100%;" v-model="boxDateValue" type="date" format="yyyy-MM-dd HH:mm" @change="chooseDateFn" placeholder="选择日期" :picker-options="pickerOptions0">
			</el-date-picker>
			<template v-if="!dateShow">
				<el-popover ref="popover5" placement="top" width="525" v-model="visible2">
					<table class="timeTable clearfix">
						<thead>
							<tr>
								<template v-for="(item,index) in timeOptions" v-model="time">
									<th class="head" :class="item.selected?'active':''" @click="timeOptionfn(index)">{{item.value}}</th>
								</template>
							</tr>
						</thead>
						<tbody>
							<tr>
								<template v-for="(hitem,index) in hourOptions">
									<td :class="hitem.selected?'active':''" @click="hourOptionfn(index)">{{hitem.value}}</td>
								</template>
							</tr>
							<tr>
								<template v-for="(mitem,index) in minuteOptions">
									<td :class="mitem.selected?'active':''" @click="minuteOptionfn(index)">{{mitem.value}}</td>
								</template>
							</tr>
						</tbody>
					</table>
				</el-popover>
				<el-input @change="initFn" v-popover:popover5 class="hms" v-model="daytime"></el-input>
			</template>
		</div>
	</section>
</template>

<script>
	import moment from 'moment'
	export default {
		props: ['enddate'],
		data() {
			return {
				mytype: "date",
				dateShow: true,
				boxDateValue: '',
				daytime: '',
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				timeOptions: [{
						value: ' 凌晨',
						selected: false,
						children: [{
								value: '凌晨0点',
								selected: false,
								children: [{
										value: '00:00',
										selected: false
									},
									{
										value: '00:10',
										selected: false
									},
									{
										value: '00:20',
										selected: false
									},
									{
										value: '00:30',
										selected: false
									},
									{
										value: '00:40',
										selected: false
									},
									{
										value: '00:50',
										selected: false
									}
								]
							},
							{
								value: '凌晨1点',
								selected: false,
								children: [{
										value: '01:00',
										selected: false
									},
									{
										value: '01:10',
										selected: false
									},
									{
										value: '01:20',
										selected: false
									},
									{
										value: '01:30',
										selected: false
									},
									{
										value: '01:40',
										selected: false
									},
									{
										value: '01:50',
										selected: false
									}
								]
							},
							{
								value: '凌晨2点',
								selected: false,
								children: [{
										value: '02:00',
										selected: false
									},
									{
										value: '02:10',
										selected: false
									},
									{
										value: '02:20',
										selected: false
									},
									{
										value: '02:30',
										selected: false
									},
									{
										value: '02:40',
										selected: false
									},
									{
										value: '02:50',
										selected: false
									}
								]
							},
							{
								value: '凌晨3点',
								selected: false,
								children: [{
										value: '03:00',
										selected: false
									},
									{
										value: '03:10',
										selected: false
									},
									{
										value: '03:20',
										selected: false
									},
									{
										value: '03:30',
										selected: false
									},
									{
										value: '03:40',
										selected: false
									},
									{
										value: '03:50',
										selected: false
									}
								]
							},
							{
								value: '凌晨4点',
								selected: false,
								children: [{
										value: '04:00',
										selected: false
									},
									{
										value: '04:10',
										selected: false
									},
									{
										value: '04:20',
										selected: false
									},
									{
										value: '04:30',
										selected: false
									},
									{
										value: '04:40',
										selected: false
									},
									{
										value: '04:50',
										selected: false
									}
								]
							},
							{
								value: '凌晨5点',
								selected: false,
								children: [{
										value: '05:00',
										selected: false
									},
									{
										value: '05:10',
										selected: false
									},
									{
										value: '05:20',
										selected: false
									},
									{
										value: '05:30',
										selected: false
									},
									{
										value: '05:40',
										selected: false
									},
									{
										value: '05:50',
										selected: false
									}
								]
							}
						]
					},
					{
						value: ' 上午',
						selected: true,
						children: [{
								value: '上午6点',
								selected: false,
								children: [{
										value: '06:00',
										selected: false
									},
									{
										value: '06:10',
										selected: false
									},
									{
										value: '06:20',
										selected: false
									},
									{
										value: '06:30',
										selected: false
									},
									{
										value: '06:40',
										selected: false
									},
									{
										value: '06:50',
										selected: false
									}
								]
							},
							{
								value: '上午7点',
								selected: false,
								children: [{
										value: '07:00',
										selected: false
									},
									{
										value: '07:10',
										selected: false
									},
									{
										value: '07:20',
										selected: false
									},
									{
										value: '07:30',
										selected: false
									},
									{
										value: '07:40',
										selected: false
									},
									{
										value: '07:50',
										selected: false
									}
								]
							},
							{
								value: '上午8点',
								selected: true,
								children: [{
										value: '08:00',
										selected: true
									},
									{
										value: '08:10',
										selected: false
									},
									{
										value: '08:20',
										selected: false
									},
									{
										value: '08:30',
										selected: false
									},
									{
										value: '08:40',
										selected: false
									},
									{
										value: '08:50',
										selected: false
									}
								]
							},
							{
								value: '上午9点',
								selected: false,
								children: [{
										value: '09:00',
										selected: false
									},
									{
										value: '09:10',
										selected: false
									},
									{
										value: '09:20',
										selected: false
									},
									{
										value: '09:30',
										selected: false
									},
									{
										value: '09:40',
										selected: false
									},
									{
										value: '09:50',
										selected: false
									}
								]
							},
							{
								value: '上午10点',
								selected: false,
								children: [{
										value: '10:00',
										selected: false
									},
									{
										value: '10:10',
										selected: false
									},
									{
										value: '10:20',
										selected: false
									},
									{
										value: '10:30',
										selected: false
									},
									{
										value: '10:40',
										selected: false
									},
									{
										value: '10:50',
										selected: false
									}
								]
							},
							{
								value: '上午11点',
								selected: false,
								children: [{
										value: '11:00',
										selected: false
									},
									{
										value: '11:10',
										selected: false
									},
									{
										value: '11:20',
										selected: false
									},
									{
										value: '11:30',
										selected: false
									},
									{
										value: '11:40',
										selected: false
									},
									{
										value: '11:50',
										selected: false
									}
								]
							}
						]
					},
					{
						value: ' 下午',
						selected: false,
						children: [{
								value: '中午12点',
								selected: false,
								children: [{
										value: '12:00',
										selected: false
									},
									{
										value: '12:10',
										selected: false
									},
									{
										value: '12:20',
										selected: false
									},
									{
										value: '12:30',
										selected: false
									},
									{
										value: '12:40',
										selected: false
									},
									{
										value: '12:50',
										selected: false
									}
								]
							},
							{
								value: '下午1点',
								selected: false,
								children: [{
										value: '13:00',
										selected: false
									},
									{
										value: '13:10',
										selected: false
									},
									{
										value: '13:20',
										selected: false
									},
									{
										value: '13:30',
										selected: false
									},
									{
										value: '13:40',
										selected: false
									},
									{
										value: '13:50',
										selected: false
									}
								]
							},
							{
								value: '下午2点',
								selected: false,
								children: [{
										value: '14:00',
										selected: false
									},
									{
										value: '14:10',
										selected: false
									},
									{
										value: '14:20',
										selected: false
									},
									{
										value: '14:30',
										selected: false
									},
									{
										value: '14:40',
										selected: false
									},
									{
										value: '14:50',
										selected: false
									}
								]
							},
							{
								value: '下午3点',
								selected: false,
								children: [{
										value: '15:00',
										selected: false
									},
									{
										value: '15:10',
										selected: false
									},
									{
										value: '15:20',
										selected: false
									},
									{
										value: '15:30',
										selected: false
									},
									{
										value: '15:40',
										selected: false
									},
									{
										value: '15:50',
										selected: false
									}
								]
							},
							{
								value: '下午4点',
								selected: false,
								children: [{
										value: '16:00',
										selected: false
									},
									{
										value: '16:10',
										selected: false
									},
									{
										value: '16:20',
										selected: false
									},
									{
										value: '16:30',
										selected: false
									},
									{
										value: '16:40',
										selected: false
									},
									{
										value: '16:50',
										selected: false
									}
								]
							},
							{
								value: '下午5点',
								selected: false,
								children: [{
										value: '17:00',
										selected: false
									},
									{
										value: '17:10',
										selected: false
									},
									{
										value: '17:20',
										selected: false
									},
									{
										value: '17:30',
										selected: false
									},
									{
										value: '17:40',
										selected: false
									},
									{
										value: '17:50',
										selected: false
									}
								]
							}
						]
					},
					{
						value: ' 晚上',
						selected: false,
						children: [{
								value: '晚上6点',
								selected: false,
								children: [{
										value: '18:00',
										selected: false
									},
									{
										value: '18:10',
										selected: false
									},
									{
										value: '18:20',
										selected: false
									},
									{
										value: '18:30',
										selected: false
									},
									{
										value: '18:40',
										selected: false
									},
									{
										value: '18:50',
										selected: false
									}
								]
							},
							{
								value: '晚上7点',
								selected: false,
								children: [{
										value: '19:00',
										selected: false
									},
									{
										value: '19:10',
										selected: false
									},
									{
										value: '19:20',
										selected: false
									},
									{
										value: '19:30',
										selected: false
									},
									{
										value: '19:40',
										selected: false
									},
									{
										value: '19:50',
										selected: false
									}
								]
							},
							{
								value: '晚上8点',
								selected: false,
								children: [{
										value: '20:00',
										selected: false
									},
									{
										value: '20:10',
										selected: false
									},
									{
										value: '20:20',
										selected: false
									},
									{
										value: '20:30',
										selected: false
									},
									{
										value: '20:40',
										selected: false
									},
									{
										value: '20:50',
										selected: false
									}
								]
							},
							{
								value: '晚上9点',
								selected: false,
								children: [{
										value: '21:00',
										selected: false
									},
									{
										value: '21:10',
										selected: false
									},
									{
										value: '21:20',
										selected: false
									},
									{
										value: '21:30',
										selected: false
									},
									{
										value: '21:40',
										selected: false
									},
									{
										value: '21:50',
										selected: false
									}
								]
							},
							{
								value: '晚上10点',
								selected: false,
								children: [{
										value: '22:00',
										selected: false
									},
									{
										value: '22:10',
										selected: false
									},
									{
										value: '22:20',
										selected: false
									},
									{
										value: '22:30',
										selected: false
									},
									{
										value: '22:40',
										selected: false
									},
									{
										value: '22:50',
										selected: false
									}
								]
							},
							{
								value: '晚上11点',
								selected: false,
								children: [{
										value: '23:00',
										selected: false
									},
									{
										value: '23:10',
										selected: false
									},
									{
										value: '23:20',
										selected: false
									},
									{
										value: '23:30',
										selected: false
									},
									{
										value: '23:40',
										selected: false
									},
									{
										value: '23:50',
										selected: false
									}
								]
							}
						]
					}
				],
				hourOptions: [],
				minuteOptions: [],
				visible2: false,
			}
		},

		methods: {
			initFn() {
				if(!this.daytime) {
					console.log("clear");
					this.visible2 = true;
					this.boxDateValue = moment(this.boxDateValue).format('YYYY-MM-DD');
					this.daytime = moment(this.daytime).format('YYYY-MM-DD HH:mm');
					this.dateShow = false;
				}
			},
			chooseDateFn() {
				if(moment(this.boxDateValue).isValid()) {
					this.dateShow = false;
					setTimeout(() => {
						this.visible2 = true;
					}, 300)
					this.daytime = moment(this.boxDateValue).format('YYYY-MM-DD');
				} else {
					this.dateShow = true;
					this.visible2 = false;
					this.boxDateValue = "";
					this.daytime = this.boxDateValue;
				}

			},
			timeOptionfn: function(val) {
				this.hourOptions = [];
				this.minuteOptions = [];
				this.timeOptions.forEach((item, index) => {
					this.timeOptions[index].selected = false;
				});
				this.timeOptions[val].selected = true;
				this.timeOptions[val].children.forEach(item => {
					this.hourOptions.push(item);
				})
				this.hourOptions[0].selected = true;
				this.hourOptions[0].children.forEach(item => {
					this.minuteOptions.push(item);
				})
			},
			hourOptionfn: function(val) {
				this.minuteOptions = [];
				this.hourOptions.forEach((item, index) => {
					this.hourOptions[index].selected = false;
				});
				this.hourOptions[val].selected = true;
				this.hourOptions[val].children.forEach(item => {
					this.minuteOptions.push(item);
				})
			},
			minuteOptionfn: function(val) {
				this.minuteOptions.forEach((item, index) => {
					this.minuteOptions[index].selected = false;
				});
				this.minuteOptions[val].selected = true;
				//选完时分后 隐藏时分INPUT 显示日期INput
				//console.log("this.boxDateValue", this.boxDateValue, this.minuteOptions[val].value);
				this.boxDateValue = moment(moment(this.boxDateValue).format('YYYY-MM-DD') + " " + this.minuteOptions[val].value).format();
				//this.$emit('getDateTime',moment(this.boxDateValue+" "+ this.minuteOptions[val].value+":00").format('YYYY-MM-DD HH:mm'));
				this.$emit('getDateTime', this.boxDateValue);
				var _this = this;
				setTimeout(function() {
					_this.visible2 = false;
					_this.dateShow = true;
				}, 30);

			},
			timeInit() {
				console.log('enddate', this.enddate);
				if(this.enddate) {
					this.boxDateValue = moment(this.enddate).format('YYYY-MM-DD HH:mm');
				}
				this.hourOptions = [];
				this.timeOptions[1].children.forEach(item => {
					this.hourOptions.push(item);
				});
				this.minuteOptions = [];
				this.hourOptions[2].children.forEach(item => {
					this.minuteOptions.push(item);
				})
			},
		},
		watch: {
			"enddate": function(val, oldval) {
				if(oldval == "") {
					this.timeInit()
				}

			}
		},
		computed: {
			getNewTime: function() {
				if(this.boxDateValue && this.daytime) {
					return this.boxDateValue + this.daytime;
				}
				if(this.boxDateValue == 'Invalid date') {
					return moment().format('YYYY-MM-DD') + this.daytime;
				}

				this.$emit("getDateTime", this.boxDateValue + this.daytime);
				//				console.log("getnewtime",this.boxDateValue+this.daytime)
			}
		},
		mounted() {
			this.timeInit();
		}
	}
</script>

<style lang="scss" scoped>

</style>