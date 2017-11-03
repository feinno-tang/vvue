<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view :key="key"></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
	},
	computed:{
		key(){
			return this.$route.name !== undefined ?this.$route.name +new Date() : this.$route+newDate()
		}
	}
}

</script>

<style>
	@import './styles/common.css';  /*全局自定义的css*/
</style>