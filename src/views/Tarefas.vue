<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="semTarefas">
      Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
    </Box>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index" @aoTarefaClicada="selecionarTarefa" />
    <Modal :mostrar="tarefaSelecionada != null" v-if="tarefaSelecionada">
        <template v-slot:cabecalho>
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close" @click="fecharModal"></button>
        </template>
        <template v-slot:corpo>
          <div class="field">
            <label for="nomeDaTarefa" class="label"> Descricao </label>
            <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="nomeDaTarefa" />
          </div>
        </template>
        <template v-slot:rodape>
          <button class="button is-success" @click="salvarTarefaSelecionada">Savar alterações</button>
          <button class="button" @click="fecharModal">Cancelar</button>
        </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import ITarefa from "../interfaces/ITarefa"
import Modal from "@/components/Modal.vue"
import { useStore } from "@/store";
import { ALTERAR_TAREFAS, CADASTRAR_TAREFAS, OBTER_PROJETOS, OBTER_TAREFAS } from "@/store/tipo-acoes";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box,
    Modal
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFAS, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    salvarTarefaSelecionada() {
      this.store.dispatch(ALTERAR_TAREFAS, this.tarefaSelecionada)
        .then(() => this.fecharModal())
    }
  },
  computed: {
    semTarefas(): boolean {
      return this.tarefas?.length == 0
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    const filtro = ref("")

    // const tarefas = computed(() => 
    //       store.state.tarefaModule.tarefas?.filter(
    //           (t) => !filtro.value || t.descricao.toLowerCase().includes(filtro.value.toLowerCase())
    //       )
    //     )

    watchEffect(()=>{
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })

    return {
      tarefas: computed(() => store.state.tarefaModule.tarefas),
      store,
      filtro
    }
  }
});
</script>
