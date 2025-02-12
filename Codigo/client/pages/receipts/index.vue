<template>
  <Template
    v-model="formOpened"
    title="Recibos"
    form-title="Recibo"
    :form-loading="formLoading"
    @save="handleReceipt"
  >
    <template #form>
      <div class="flex flex-col gap-lg">
        <DatePicker v-model="newReceipt.date" label="Data" :max-date="new Date()" required />
        <Input
          v-model="newReceipt.value"
          label="Valor"
          type="number"
          required
        />
        <Select
          v-model="newReceipt.pacient"
          :items="pacientList"
          label="Paciente"
          label-key="name"
          searchable
          required
          @update:model-value="(pacient: Pacient) => newReceipt.pacient_id = pacient.id"
        />
      </div>
    </template>
    <div class="flex flex-col gap-2xl">
      <DatePicker
        v-model="dates"
        is-compare
        :max-date="new Date()"
        @update:model-value="filterReceipts"
        >Filtrar por data</DatePicker
      >
      <Table :headers="headers" :items="receipts" :loading="loading">
        <template #none="{ item }">
          <td class="w-2">
            <div
              class="icon-holder"
              :class="{ 'rotate-180': item.expanded }"
              @click="item.expanded = !item.expanded"
            >
              <Icon name="arrow_drop_down" />
            </div>
          </td>
        </template>
        <template #date="{ item }">
          <td>
            {{
              upperCaseFirstLetter(
                formatDate(new Date(item.date), { month: "long" })
              )
            }}/{{ formatDate(new Date(item.date), { year: "numeric" }) }}
          </td>
        </template>
        <template #total="{ item }">
          <td>
            {{ formatCurrency(Number(item.total)) }}
          </td>
        </template>
        <template #childs="{ item, index }">
          <tr
            v-for="(child, cIndex) in item.childs"
            :key="cIndex"
            class="child-tr"
          >
            <td />

            <td>{{ formatDate(new Date(child.date)) }}</td>

            <td>{{ formatCurrency(Number(child.value)) }}</td>

            <td>
              {{ child.pacient.name }}
            </td>

            <td class="w-2">
              <ActionCard
                v-model="child.expanded"
                :item="child"
                :items="actionsItems"
                @edit="openEditReceipt"
                @delete="deleteReceiptOperation"
              />
            </td>
          </tr>
        </template>
        <template #actions />
      </Table>
    </div>
  </Template>
</template>

<script lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { formatDate, formatCurrency, upperCaseFirstLetter } from "~/util/index";
import { useReceipts } from "~/composables/useReceipts";
import { usePacients } from "~/composables/usePacients";
import { useEvents } from "~/composables/useEvents";
import type { Receipt } from "~/types/receipt";

export default {
  name: "Receipts",

  setup() {
    const formOpened = ref(false);
    const newReceipt = ref<any>({});
    const pacientList = ref<any>([]);
    const receipts = ref<Receipt[]>([]);
    const dates = ref<Date[]>([]);
    const headers = ref([
      { value: "none", sortable: true },
      { text: "Data", value: "date", sortable: true },
      { text: "Total", value: "total", sortable: true },
      { text: "Paciente", value: "pacient", sortable: true },
    ]);
    const actionsItems = ref([]);
    const loading = ref(true);
    const formLoading = ref(false);

    const { createReceipt, updateReceipt, deleteReceipt, listAllReceipts } =
      useReceipts();
    const { listPacients } = usePacients();
    const { confirm, alert } = useEvents();

    return {
      newReceipt,
      pacientList,
      receipts,
      dates,
      headers,
      formOpened,
      formatDate,
      actionsItems,
      createReceipt,
      updateReceipt,
      deleteReceipt,
      listAllReceipts,
      listPacients,
      confirm,
      alert,
      formatCurrency,
      upperCaseFirstLetter,
      loading,
      formLoading,
    };
  },

  watch: {
    formOpened() {
      if (!this.formOpened) {
        this.newReceipt = {};
      }
    },
  },

  async mounted() {
    this.actionsItems.push({
      label: "Imprimir",
      icon: "print",
      action: this.printReceipt,
    });

    await this.getReceipts();
    this.pacientList = await this.listPacients();
  },

  methods: {
    printReceipt(item: any) {
      const parsedItem = {
        pacient: { name: item.pacient.name },
        date: item.date,
        value: item.value,
      };
      const receipt = encodeURIComponent(JSON.stringify(parsedItem));
      this.$router.push({ path: "/print/receipt", query: { receipt } });
    },

    async filterReceipts() {
      if (!this.dates.length || this.dates.length == 2)
        await this.getReceipts();
    },

    async getReceipts() {
      this.loading = true;
      this.receipts = await this.listAllReceipts(this.dates);
      this.loading = false;
    },

    async handleReceipt() {
      if (
        !this.newReceipt.pacient_id ||
        !this.newReceipt.value ||
        !this.newReceipt.date
      ) {
        this.alert({
          message: "Preencha todos os campos obrigatórios",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      if (this.newReceipt.value <= 0) {
        this.alert({
          message: "O valor do recibo não pode ser menor que nem igual a 0",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      this.formLoading = true;
      try {
        const receipt = { ...this.newReceipt };
        delete receipt.expanded;
        delete receipt.pacient;

        if (!receipt.id) {
          await this.createReceipt(receipt);
        } else {
          await this.updateReceipt(receipt.id, receipt);
        }

        await this.getReceipts();
        this.alert({
          message: "Recibo salvo com sucesso",
          type: "success",
          timeout: 3000,
        });
      } catch {
        this.alert({
          message: "Erro ao salvar recibo",
          type: "error",
          timeout: 3000,
        });
      }
      this.formOpened = false;
      this.formLoading = false;
    },

    openEditReceipt(item: any) {
      this.formOpened = true;
      this.newReceipt = { ...item };
    },

    async deleteReceiptOperation(item: any) {
      try {
        const result = await this.confirm({
          title: "Deletar esse recibo?",
          description:
            "Tem certeza que deseja deletar esse recibo? Essa ação será permante",
        });
        if (!result) return;

        await this.deleteReceipt(item.id);
        await this.getReceipts();
        this.alert({
          message: "Recibo deletado com sucesso",
          type: "success",
          timeout: 3000,
        });
      } catch {
        this.alert({
          message: "Erro ao deletar recibo",
          type: "error",
          timeout: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
td {
  @apply text-gray-500 text-12;
}

.icon-holder {
  @apply flex items-center w-fit rounded-full p-xs cursor-pointer text-24 duration-300 hover:bg-gray-200;
}

.child-tr {
  @apply bg-gray-100;

  td {
    @apply border-gray-200 border-t-[.1em] py-lg px-xl;
  }
}
</style>
