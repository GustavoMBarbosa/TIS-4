<template>
    <Template
        v-model="formOpened"
        title="Pacientes"
        form-title="Paciente"
        :form-loading="formLoading"
        @save="createPacient"
        @update:model-value="resetPacient"
    >
        <template #form>
            <Input v-model="newPacient.name" label="Nome Completo" required />
        </template>

        <div class="flex flex-col gap-2xl">
            <Input v-model="searchQuery" type="search" placeholder="Pesquisar paciente" class="w-[500px] max-w-full" />

            <div class="flex flex-wrap gap-base w-full" v-if="loading">
                <Card v-for="pacient in 3" class="min-w-[200px] flex flex-col gap-base">
                    <div class="skeleton" style="width: 60%" />
                    <div class="skeleton" />
                </Card>
            </div>
            <div class="flex flex-col justify-center items-center w-full" v-else-if="!paginatedPacients.length">
                <iframe
                    src="https://lottie.host/embed/078fe5c6-b2a9-4572-957c-14e8f116399a/xLE7X2WZK0.json"
                    class="w-full h-[300px]"
                ></iframe>
                <h3 class="text-gray-500 font-bold text-20">Nenhum paciente encontrado</h3>
            </div>
            <div class="flex flex-wrap gap-base w-full" v-else>
                <PacientCard
                    v-for="pacient in paginatedPacients"
                    class="min-w-[200px]"
                    :key="pacient.name"
                    :pacient="pacient"
                    @edit="editPacient"
                    @delete="deletePacient"
                />
            </div>

            <Card>
                <TableFooter v-model="page" v-model:items-per-page="itemsPerPage" :pages="totalPages" />
            </Card>
        </div>
    </Template>
</template>
<script>
export default {
    name: 'Pacients',

    setup() {
        const page = ref(1);
        const itemsPerPage = ref(10);
        const searchQuery = ref('');
        const allPacients = ref([]);
        const newPacient = ref({});
        const formOpened = ref(false);
        const formLoading = ref(false);
        const loading = ref(false);

        return {
            allPacients,
            page,
            itemsPerPage,
            searchQuery,
            newPacient,
            formOpened,
            formLoading,
            loading,
            ...useEvents(),
            ...usePacients(),
        };
    },

    computed: {
        filteredPacients() {
            return this.allPacients.filter((pacient) =>
                pacient.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        paginatedPacients() {
            return this.filteredPacients.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.filteredPacients.length / this.itemsPerPage);
        },
    },

    watch: {
        searchQuery() {
            this.page = 1;
        },
    },

    async created() {
        await this.getPacients();
    },

    methods: {
        async getPacients() {
            this.loading = true;
            this.allPacients = await this.listPacients();
            this.loading = false;
        },
        resetPacient() {
            this.newPacient = {};
        },
        async createPacient() {
            if (!this.newPacient.name) {
                this.alert({
                    message: 'Insira o nome do paciente para criá-lo',
                    type: 'error',
                    timeout: 3000,
                });
                return;
            }

            this.formLoading = true;
            try {
                await this.createPacient(this.newPacient);
                this.alert({
                    message: 'Paciente criado com sucesso',
                    type: 'success',
                    timeout: 3000,
                });
                await this.getPacients();
            } catch {
                this.alert({
                    message: 'Erro ao criar paciente',
                    type: 'error',
                    timeout: 3000,
                });
            }

            this.formLoading = false;
            this.formOpened = false;
            this.resetPacient();
        },

        editPacient(pacient) {
            this.$router.push(`/pacient/${pacient.id}`);
        },
        async deletePacient(pacient) {
            try {
                const result = await this.confirm({
                    title: 'Deletar esse paciente?',
                    description: 'Tem certeza que deseja deletar esse paciente? Essa ação será permante',
                });
                if (result) {
                    await this.deletePacient(pacient.id);
                    this.alert({
                        message: 'Paciente deletado com sucesso',
                        type: 'success',
                        timeout: 3000,
                    });
                    await this.getPacients();
                }
            } catch {
                this.alert({
                    message: 'Erro ao deletar paciente',
                    type: 'error',
                    timeout: 3000,
                });
            }
        },
    },
};
</script>

<style scoped>
.skeleton {
    @apply w-full bg-gradient-to-r from-transparent via-white to-transparent rounded-8 h-[14px] bg-gray-300;
    background-size: 200% 100%;
    animation: moveBar 2s linear infinite;
}

@keyframes moveBar {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}
</style>
