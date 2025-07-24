<script> 
  import { dashboardData, recentTransactions } from '$lib/data/index';

  function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(Math.abs(amount)).replace('IDR', 'Rp');
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit'
    });
  }
</script>

<svelte:head>
  <title>Dashboard - FinanceAI</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600">Selamat datang kembali! Berikut ringkasan keuangan Anda.</p>
    </div>
    <div class="text-right">
      <p class="text-sm text-gray-500">Selamat datang!</p>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-600 mb-1">Total Saldo</p>
          <p class="text-2xl font-bold text-gray-900">{formatCurrency(dashboardData.totalSaldo)}</p>
          <p class="text-sm text-gray-500 mt-1">Saldo keseluruhan</p>
        </div>
        <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-600 mb-1">Pemasukan Bulan Ini</p>
          <p class="text-2xl font-bold text-green-600">{formatCurrency(dashboardData.pemasukan.amount)}</p>
          <div class="flex items-center mt-1">
            <svg class="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9.2-9.2M17 17V7H7"/>
            </svg>
            <p class="text-sm text-green-600">{dashboardData.pemasukan.percentage}% dari total</p>
          </div>
        </div>
        <div class="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9.2-9.2M17 17V7H7"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-600 mb-1">Pengeluaran Bulan Ini</p>
          <p class="text-2xl font-bold text-red-600">{formatCurrency(dashboardData.pengeluaran.amount)}</p>
          <div class="flex items-center mt-1">
            <svg class="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7L7.8 16.2M7 7v10h10"/>
            </svg>
            <p class="text-sm text-red-600">{dashboardData.pengeluaran.percentage}% dari total</p>
          </div>
        </div>
        <div class="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7L7.8 16.2M7 7v10h10"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 space-y-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Ringkasan Keuangan</h2>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9.2-9.2M17 17V7H7"/>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">Total Pemasukan</p>
                <p class="text-sm text-gray-600">Semua waktu</p>
              </div>
            </div>
            <p class="text-xl font-bold text-green-600">{formatCurrency(dashboardData.totalPemasukan)}</p>
          </div>

          <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7L7.8 16.2M7 7v10h10"/>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">Total Pengeluaran</p>
                <p class="text-sm text-gray-600">Semua waktu</p>
              </div>
            </div>
            <p class="text-xl font-bold text-red-600">{formatCurrency(dashboardData.totalPengeluaran)}</p>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-gray-100">
          <div class="flex items-center justify-between mb-2">
            <p class="font-medium text-gray-900">Rasio Saving</p>
            <p class="text-2xl font-bold text-blue-600">{dashboardData.rasioSaving}%</p>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" 
                style="width: {dashboardData.rasioSaving}%"></div>
          </div>
          <p class="text-sm text-gray-600 mt-2">Target saving bulanan tercapai</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Transaksi Terbaru</h2>
        <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Lihat Semua
        </button>
      </div>

      <div class="space-y-4">
        {#each recentTransactions as transaction}
          <div class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="flex items-center flex-1">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center mr-3 {transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'}">
                {#if transaction.type === 'income'}
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                {:else}
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7L7.8 16.2M7 7v10h10"/>
                  </svg>
                {/if}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-900 truncate">{transaction.title}</p>
                <p class="text-sm text-gray-600">{transaction.category} • {formatDate(transaction.date)}</p>
              </div>
            </div>
            <p class="font-semibold text-right {transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}">
              {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>