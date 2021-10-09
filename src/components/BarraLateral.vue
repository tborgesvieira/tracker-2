<template>
  <header>
    <h1>
      <img alt="Alura Tracker" src="../assets/logo.png">
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarModo">Ativar modo {{ textoBtn }}</button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BarraLateral",
  emits: ['aoAlterarModo'],
  data () {
    return {
      modoEscuro: false
    }
  },
  methods: {
    alterarModo () : void {
      this.modoEscuro = !this.modoEscuro
      this.$emit('aoAlterarModo', this.modoEscuro)
    }
  },
  computed: {
    textoBtn () : string {
      return this.modoEscuro ? 'claro' : 'escuro'
    }
  }
});
</script>
<style scoped>
h1 {
  text-align: center;
}
strong {
  color: #f95738;
}
header {
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  padding: 2rem;
}
@media only screen and (max-width: 768px) {
  header {
    height: auto;
  }
}
</style>