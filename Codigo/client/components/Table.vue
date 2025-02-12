<script lang="ts">
export default {
	name: 'Table',
	props: {
		headers: {
			type: Array,
			default: [],
		},
		items: {
			type: Array,
			default: [],
		},
		options: Object,
		loading: Boolean,
	},
	emits: ['paginate', 'sort'],

	setup() {
		return {
			sortDesc: ref({}),
			sortByName: ref(''),
			pagedItems: ref([]),
			page: ref(1),
			itemsPerPage: ref(10),
		};
	},

	watch: {
		items: {
			handler() {
				this.page = 1;
				this.sortBy(this.sortByName, this.sortDesc[this.sortByName]);
				this.pageItems();
			},
			deep: true,
		},
	},

	created() {
		this.setSort();
		this.pageItems();
	},

	methods: {
		sortBy(key: string, isDesc = false) {
			if (!this.items.length) return;

			this.sortByName = key;
			this.items.sort((a: any, b: any) => {
				const valueA = a[key];
				const valueB = b[key];

				if (typeof valueA === 'string' && typeof valueB === 'string') {
					const lowerA = valueA.toLowerCase();
					const lowerB = valueB.toLowerCase();
					return isDesc ? lowerB.localeCompare(lowerA) : lowerA.localeCompare(lowerB);
				} else if (typeof valueA === 'number' && typeof valueB === 'number') {
					return isDesc ? valueA - valueB : valueB - valueA;
				} else if (valueA instanceof Date && valueB instanceof Date) {
					return isDesc ? valueB.getTime() - valueA.getTime() : valueA.getTime() - valueB.getTime();
				} else {
					const stringA = String(valueA);
					const stringB = String(valueB);
					const lowerA = stringA.toLowerCase();
					const lowerB = stringB.toLowerCase();
					return isDesc ? lowerB.localeCompare(lowerA) : lowerA.localeCompare(lowerB);
				}
			});
			this.pageItems();
		},

		setSort() {
			if (this.options) {
				this.sortByName = this.options.sortBy;
				this.sortDesc[this.options.sortBy] = this.options.isDesc;
				this.sortBy(this.options.sortBy, this.options.isDesc);
			}
		},

		pageItems() {
			const startIndex = (this.page - 1) * this.itemsPerPage;
			const endIndex = startIndex + this.itemsPerPage;
			this.pagedItems = this.items?.slice(startIndex, endIndex);
		},

		getIndex(index) {
			return (this.page - 1) * this.itemsPerPage + index;
		},
	},
};
</script>

<template>
	<div class="flex flex-col gap-lg w-full">
		<div class="table-holder overflow-auto">
			<table
				class="rounded-t-16"
				:class="{ 'overflow-hidden': !pagedItems.length && !loading }"
			>
				<thead v-if="loading">
					<tr>
						<th
							v-for="header in headers.length || 3"
							:key="header"
							class="skeleton-table-cell pointer-events-none"
						>
							<div class="skeleton" />
						</th>
						<th
							v-if="$slots.actions"
							class="skeleton-table-cell pointer-events-none"
						>
							<div class="skeleton" />
						</th>
					</tr>
				</thead>
				<thead
					class="bg-white"
					v-else
				>
					<tr>
						<th
							v-for="(header, index) in headers"
							:key="index"
							class="cursor-pointer"
							:class="{ 'pointer-events-none': !header.sortable }"
							:style="{ width: header.width ? header.width : 'fit-content' }"
							@click="sortBy(header.value, (sortDesc[header.value] = !sortDesc[header.value]))"
						>
							<div
								class="flex w-full items-center gap-xxs"
								:style="{
									'justify-content': header.align ? header.align : 'flex-start',
								}"
							>
								<p class="truncate">{{ header.text }}</p>
								<Icon
									name="north"
									v-if="header.sortable"
									:class="{
										'rotate-180': !sortDesc[header.value],
										'icon-active': header.value == sortByName,
									}"
								/>
							</div>
						</th>
						<th
							v-if="$slots.actions"
							class="pointer-events-none"
						/>
					</tr>
				</thead>
				<tbody v-if="loading">
					<tr
						v-for="index in 6"
						:key="index"
					>
						<td
							v-for="header in headers.length || 3"
							:key="header"
							class="skeleton-table-cell"
						>
							<div class="skeleton" />
						</td>
						<td
							v-if="$slots.actions"
							class="skeleton-table-cell"
						>
							<div class="skeleton" />
						</td>
					</tr>
				</tbody>
				<tbody v-else>
					<template
						v-for="(item, index) in pagedItems"
						:key="index"
					>
						<tr class="[&>*]:py-lg [&>*]:px-xl">
							<slot
								v-for="header in headers"
								:key="header.value"
								:name="header.value"
								:item="item"
								:index="getIndex(index)"
							/>
							<slot
								v-if="$slots.actions"
								name="actions"
								:item="item"
								:index="getIndex(index)"
							/>
						</tr>
						<slot
							name="childs"
							:item="item"
							:index="getIndex(index)"
							v-if="item.expanded"
						/>
					</template>
				</tbody>
			</table>
			<div
				class="empty"
				v-if="!pagedItems.length && !loading"
			>
				<slot name="empty-state">
					<div class="flex flex-col items-center justify-center gap-lg">
						<iframe src="https://lottie.host/embed/078fe5c6-b2a9-4572-957c-14e8f116399a/xLE7X2WZK0.json" class="w-full h-[200px]"></iframe>
						<h3 class="text-gray-500 font-bold text-16">Sem dados para exibir</h3>
					</div>
				</slot>
			</div>
		</div>
		<TableFooter
			v-model="page"
			:pages="Math.ceil(items.length / itemsPerPage)"
			:items-per-page="itemsPerPage"
			@update:model-value="pageItems"
			@update:items-per-page="pageItems"
		/>
	</div>
</template>

<style scoped>
.table-holder {
	@apply w-full shadow-normal rounded-16 bg-white;
}

.empty {
	@apply w-full flex items-center justify-center py-xl rounded-b-16;
}

table {
	@apply w-full;

	tbody {
		@apply divide-y-1 divide-gray-100 w-full;
	}

	thead {
		@apply border-b-1 border-b-gray-100 w-full rounded-t-16;

		th {
			@apply px-xl py-lg text-gray-500 text-12;

			&:hover {
				@apply bg-gray-200;

				.icon {
					@apply opacity-100;
				}
			}

			.icon {
				@apply opacity-0 text-gray-500 text-14 transition-transform ease-in-out duration-300;
				transition: opacity 0.2s ease, transform 0.3s ease;
			}

			.icon.icon-active {
				@apply opacity-100 text-primary-500;
			}
		}
	}
}

.skeleton-table-cell {
	@apply p-xl;
}
</style>
