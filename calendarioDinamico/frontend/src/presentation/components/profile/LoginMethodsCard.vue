<script setup lang="ts">
const props = defineProps<{

    googleLinked:boolean

    hasPassword:boolean

}>()

const emit = defineEmits([
    "link-google",
    "add-password"
])
</script>

<template>

    <div class="card">

        <h3>Métodos de Login</h3>

    <div class="method">

    <div>

    <strong>Google</strong>

    <p>

    {{ googleLinked
    ? "Conta vinculada"
    : "Conta não vinculada" }}

    </p>

    </div>

    <button

    v-if="!googleLinked"

    @click="$emit('link-google')"

    >

    Vincular

    </button>

    <span v-else>

    ✅

    </span>

    </div>

    <hr>

    <div class="method">

    <div>

    <strong>Senha</strong>

    <p>

    {{ hasPassword
    ? "Senha cadastrada"
    : "Nenhuma senha cadastrada" }}

    </p>

    </div>

    <button

    v-if="!hasPassword"

    @click="$emit('add-password')"

    >

    Adicionar

    </button>

    <span v-else>

    ✅

    </span>

    </div>

    </div>

</template>

<style scoped>

.card{

    margin-top:25px;

    padding:20px;

    border:1px solid #ddd;

    border-radius:10px;

}

.method{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin:15px 0;

}

button{

    padding:8px 16px;

}

</style>