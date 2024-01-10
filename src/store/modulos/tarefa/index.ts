import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFAS, ALTERAR_TAREFAS } from "@/store/tipo-acoes";
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefaModule: Module<EstadoTarefa, Estado> = {
    mutations: {                  
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {            
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(proj => proj.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
    },
    actions:{        
        [OBTER_TAREFAS]({ commit }, filtro: string){

            let url = '/tarefas';

            if(filtro){
                url += '?descricao='+filtro
            }

            http.get(url)
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFAS]({commit}, tarefa:ITarefa){
            return http.post('/tarefas', tarefa)
                        .then(resposta=>{
                            commit(ADICIONA_TAREFA, resposta.data)
                        })
        },
        [ALTERAR_TAREFAS]({commit}, tarefa: ITarefa){
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                    .then(res => commit(ALTERA_TAREFA, tarefa))
        },
    }
}