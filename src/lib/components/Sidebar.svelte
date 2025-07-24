<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  export let menuItems: any[] = [];

  function isActiveMenu(route: string) {
    if (route === '/' && $page.route.id === '/') {
      return true;
    }
    return $page.route.id?.startsWith(route) && route !== '/';
  }

  function navigateTo(route: string) {
    goto(route);
  }
</script>

<!-- Sidebar -->
<div class="w-80 bg-white shadow-lg flex flex-col">
  <div class="p-6 border-b border-gray-200">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19A2 2 0 0 0 5 21H11V19.5L12.5 18H5V3H13V9H21Z"/>
          </svg>
        </div>
        <span class="text-xl font-semibold text-gray-800">FinanceAI</span>
      </div>
    </div>
  </div>

  <nav class="flex-1 px-4 py-4 space-y-2">
    {#each menuItems as item}
      <button
        class="w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 {isActiveMenu(item.route) ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}"
        on:click={() => navigateTo(item.route)}
      >
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{item.icon}" />
        </svg>
        <span class="font-medium">{item.label}</span>
      </button>
    {/each}
  </nav>

  <div class="p-4 border-t border-gray-200">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <span class="text-blue-600 font-semibold text-sm">U</span>
      </div>
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-800">User</p>
        <p class="text-xs text-gray-500">Selamat datang!</p>
      </div>
    </div>
  </div>
</div>

