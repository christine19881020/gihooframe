<template>
	<section>
		<div class="amap-page-container">
			<el-amap :vid="vid" :zoom="zoom" :center="center" class="amap-demo">
				<el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender"></el-amap-marker>
				<el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
			</el-amap>			
		</div>
	</section>
</template>

<script>
	const exampleComponents = {
		props: ['text'],
		template: `<div></div>`
	}
	export default {
		name: 'mapsmall',
		prop:{
			vid:String,
		},
		data() {
			return {
				vid:'',
				count: 1,
				slotStyle: {
					padding: '2px 8px',
					background: '#eee',
					color: '#333',
					border: '1px solid #aaa'
				},
				zoom: 14,
				center: [121.5273285, 31.21515044],
				markers: [{
					position: [121.5273285, 31.21515044],
					events: {
						click: () => {
							alert('click marker');
						},
						dragend: (e) => {
							console.log('---event---: dragend')
							this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
						}
					},
					visible: true,
					draggable: false,
					template: '<span>1</span>',
				}],
				renderMarker: {
					position: [121.5273285, 31.21715058],
					contentRender: (h, instance) => {
						// if use jsx you can write in this
						// return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
						return h(
							'div', {
								style: {
									background: '#80cbc4',
									whiteSpace: 'nowrap',
									border: 'solid #ddd 1px',
									color: '#f00'
								},
								on: {
									click: () => {
										const position = this.renderMarker.position;
										this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002];
									}
								}
							}, ['marker inner text']
						)
					}
				},
				componentMarker: {
					position: [121.5273285, 31.21315058],
					contentRender: (h, instance) => h(exampleComponents, {
						style: {
//							backgroundColor: '#fff'
						},
						props: {
							text: ''						
						}
					}, ['xxxxxxx'])
				},
				slotMarker: {
					position: [121.5073285, 31.21715058]
				}
			};
		},
		methods: {
			onClick() {
				this.count += 1;
			},
			changePosition() {
				let position = this.markers[0].position;
				this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
			},
			chnageDraggle() {
				let draggable = this.markers[0].draggable;
				this.markers[0].draggable = !draggable;
			},
			toggleVisible() {
				let visableVar = this.markers[0].visible;
				this.markers[0].visible = !visableVar;
			},
			addMarker() {
				let marker = {
					position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
				};
				this.markers.push(marker);
			},
			removeMarker() {
				if(!this.markers.length) return;
				this.markers.splice(this.markers.length - 1, 1);
			}
		}
	};
</script>

<style>
	.amap-page-container{
		width:398px;height:320px;box-shadow: 0 0 10px #888;margin-left:20px;float:left;
	}
</style>