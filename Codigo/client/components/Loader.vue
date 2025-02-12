<script>
export default {
	props: {
		loading: Boolean,
	},
	setup() {
		return {};
	},
};
</script>

<template>
	<div class="loader" v-if="loading">
	</div>
</template>

<style scoped>
</style>
