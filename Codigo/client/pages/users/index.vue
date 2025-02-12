<template>
  <Template
    v-model="isOpenUser"
    title="Usuários"
    form-title="Usuário"
    :form-loading="formLoading"
    @update:model-value="resetSelected"
    @save="saveUser"
  >
    <template #form>
      <div class="flex flex-col gap-lg">
        <Input v-model="newUser.name" label="Nome" required />
        <Input v-model="newUser.email" type="email" label="E-mail" required />
        <ObjectSelect
          :items="roles"
          v-model="newUser.role"
          required
          label="Permissão"
        />
        <div class="flex flex-col gap-xs" v-if="!newUser.id">
          <div class="flex items-end gap-xs">
            <Input
              v-model="newUser.password"
              label="Senha Temporária"
              class="flex-1"
              disabled
            />
            <Icon name="content_copy" class="cursor-pointer text-gray-500 text-16 mb-base" @click="copyPassword" />
          </div>
          <p class="text-gray-500 text-12">
            Copie a senha e encaminhe para o usuário
          </p>
        </div>
      </div>
    </template>

    <div class="flex flex-col gap-2xl">
      <Input
        v-model="searchQuery"
        type="search"
        class="w-[500px] max-w-full"
        placeholder="Pesquisar usuário"
      />

      <Table
        :headers="headers"
        :options="options"
        :items="filteredUsers"
        :loading="loading"
      >
        <template #actions="{ item, index }">
          <td class="w-2">
            <ActionCard
              v-model="item.expanded"
              @edit="openEditUser(item)"
              @delete="deleteUser(item)"
            />
          </td>
        </template>

        <template #name="{ item }">
          <td class="text-gray-500 text-12">{{ item.name }}</td>
        </template>
        <template #email="{ item }">
          <td class="text-gray-500 text-12">{{ item.email }}</td>
        </template>
        <template #role="{ item }">
          <td>
            <Tag>{{ roles[item.role] }}</Tag>
          </td>
        </template>
      </Table>
    </div>
  </Template>
</template>
<script lang="ts">
import { computed, ref } from "vue";
import { generateTemporaryPassword, isEmailValid } from "~/util/index";

export default {
  name: "user",

  setup() {
    const loading = ref(false);
    const formLoading = ref(false);
    const searchQuery = ref("");
    const formCreate = ref(true);
    const isOpenUser = ref(false);
    const headers = ref([
      { text: "Nome", value: "name", sortable: true },
      { text: "E-mail", value: "email" },
      { text: "Permissão", value: "role" },
    ]);
    const options = ref({ sortBy: "name" });
    const newUser = ref({});
    const users = ref([]);

    return {
      isOpenUser,
      searchQuery,
      newUser,
      openedIndex: ref<number | null>(null),
      showFilter: ref(false),
      users,
      formCreate,
      headers,
      options,
      loading,
      formLoading,
      ...useUser(),
      ...useEvents(),
      ...useAuthorization(),
    };
  },

  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  async created() {
    await this.getUsers();
  },

  methods: {
    async getUsers() {
      this.loading = true;
      this.users = await this.listUsers();
      this.loading = false;
    },

    copyPassword() {
      navigator.clipboard.writeText(this.newUser.password);
      this.alert({
        message: "Senha copiada com sucesso",
        type: "success",
        timeout: 3000,
      });
    },

    resetSelected(value: boolean) {
      this.newUser = {
        password: generateTemporaryPassword(),
      };
      this.formCreate = true;
      this.isOpenUser = value;
    },

    async deleteUser(user: any) {
      try {
        const result = await this.confirm({
          title: "Deletar esse usuário?",
          description:
            "Tem certeza que deseja deletar esse usuário? Essa ação será permante",
        });
        if (result) {
          await this.deleteUser(user.id);
          this.alert({
            message: "Usuário deletado com sucesso",
            type: "success",
            timeout: 3000,
          });
          await this.getUsers();
        }
      } catch {
        this.alert({
          message: "Erro ao deletar usuário",
          type: "error",
          timeout: 3000,
        });
      }
    },

    openEditUser(item: any) {
      this.newUser = { ...item };
      this.formCreate = false;
      this.isOpenUser = true;
    },

    async addUser() {
      try {
        await this.createUser(this.newUser);
        this.alert({
          message: "Usuário criado com sucesso",
          type: "success",
          timeout: 3000,
        });
      } catch {
        this.alert({
          message: "Erro ao criar usuário",
          type: "error",
          timeout: 3000,
        });
      }
    },

    async editUser() {
      try {
        await this.updateUser(this.newUser);
        this.alert({
          message: "Usuário atualizado com sucesso",
          type: "success",
          timeout: 3000,
        });
      } catch {
        this.alert({
          message: "Erro ao atualizar usuário",
          type: "error",
          timeout: 3000,
        });
      }
    },

    async saveUser() {
      if (!this.newUser.name || !this.newUser.email || !this.newUser.role) {
        this.alert({
          message: "Todos os campos são obrigatórios",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      if (!isEmailValid(this.newUser.email)) {
        this.alert({
          message: "E-mail inválido",
          type: "error",
          timeout: 3000,
        });
        return;
      }

      this.formLoading = true;
      delete this.newUser.expanded;

      if (!this.newUser.id) await this.addUser();
      else await this.editUser();
      this.formLoading = false;
      this.isOpenUser = false;

      this.resetSelected();
      await this.getUsers();
    },
  },
};
</script>
