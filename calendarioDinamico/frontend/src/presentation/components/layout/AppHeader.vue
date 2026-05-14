<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()

const showMenu = ref(false)

const isAuthenticated = ref(false)

function updateAuthState() {
  isAuthenticated.value = !!localStorage.getItem("token")
}

updateAuthState()

watch(
  () => route.fullPath,
  () => {
    updateAuthState()
    showMenu.value = false
  }
)

function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.toISOString().slice(0, 10)

  return { year, month, date }
}

function goToView(view: "day" | "week" | "month" | "year") {
  const { year, month, date } = getCurrentDate()

  switch (view) {
    case "day":
      router.push(`/day/${date}`)
      break
    case "week":
      router.push(`/week/${date}`)
      break
    case "month":
      router.push(`/month/${year}/${month}`)
      break
    case "year":
      router.push(`/year/${year}`)
      break
  }

  showMenu.value = false
}

function logout() {
  localStorage.removeItem("token")
  showMenu.value = false
  router.push("/")
}

function goToLogin() {
  showMenu.value = false
  router.push("/login")
}

function goToRegister() {
  showMenu.value = false
  router.push("/register")
}

function isActive(path: string) {
  return route.path.startsWith(path)
}

function goToProfile() {
  showMenu.value = false
  router.push("/profile")
}

</script>

<template>
  <header class="app-header">
    <div class="logo">
      📅 Calendário Dinâmico
    </div>

    <nav
      v-if="isAuthenticated"
      class="navigation"
    >
      <button
        :class="{ active: isActive('/day') }"
        @click="goToView('day')"
      >
        Dia
      </button>

      <button
        :class="{ active: isActive('/week') }"
        @click="goToView('week')"
      >
        Semana
      </button>

      <button
        :class="{ active: isActive('/month') }"
        @click="goToView('month')"
      >
        Mês
      </button>

      <button
        :class="{ active: isActive('/year') }"
        @click="goToView('year')"
      >
        Ano
      </button>
    </nav>

    <div class="user-menu">
      <button
        class="menu-button"
        @click="showMenu = !showMenu"
      >
        {{ isAuthenticated ? "Conta ▼" : "Acesso ▼" }}
      </button>

      <div
        v-if="showMenu"
        class="dropdown"
      >
        <template v-if="isAuthenticated">
          <router-link
            to="/profile"
            @click="showMenu = false"
            >
            Perfil
          </router-link>

          <router-link
            to="/reports"
            @click="showMenu = false"
          >
            Relatórios
          </router-link>

          <router-link
            to="/performance"
            @click="showMenu = false"
          >
            Desempenho
          </router-link>

          <button @click="logout">
            Sair
          </button>
        </template>

        <template v-else>
          <button @click="goToLogin">
            Entrar
          </button>

          <button @click="goToRegister">
            Registrar
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.logo {
  font-size: 20px;
  font-weight: 700;
}

.navigation {
  display: flex;
  gap: 12px;
}

.navigation button {
  border: none;
  background: transparent;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.navigation button:hover {
  background: #f3f4f6;
}

.navigation button.active {
  background: #2563eb;
  color: white;
}

.user-menu {
  position: relative;
}

.menu-button {
  border: none;
  background: #f3f4f6;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: 180px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 1000;
}

.dropdown a,
.dropdown button {
  display: block;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  text-decoration: none;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.dropdown a:hover,
.dropdown button:hover {
  background: #f9fafb;
}
</style>