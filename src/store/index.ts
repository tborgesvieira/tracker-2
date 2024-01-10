import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from 'vue'
import { NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projetoModule } from "./modulos/projeto";
import { EstadoTarefa, tarefaModule } from "./modulos/tarefa";

export interface Estado {
    notificacoes: INotificacao[],
    tarefaModule: EstadoTarefa,
    projetoModule: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {        
        notificacoes: [],
        tarefaModule: {
            tarefas:[]
        },
        projetoModule: {
            projetos:[]
        }
    },
    mutations: {        
        [NOTIFICAR] (state, novaNotificacao: INotificacao) {

            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    modules:{
        projetoModule,
        tarefaModule
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}