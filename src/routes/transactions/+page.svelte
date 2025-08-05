<script>
  import { onMount } from 'svelte';
  
  // Reactive variables
  let transactions = [];
  let filteredTransactions = [];
  let currentPage = 1;
  const itemsPerPage = 10;
  
  // Filter variables
  let filterType = '';
  let filterCategory = '';
  let filterDate = '';

  // Sample data untuk testing
  const sampleTransactions = [
    {
      id: 1,
      date: '2025-08-05',
      description: 'Gaji Bulanan',
      category: 'gaji',
      type: 'income',
      amount: 8500000
    },
    {
      id: 2,
      date: '2025-08-04',
      description: 'Makan Siang',
      category: 'makanan',
      type: 'expense',
      amount: 35000
    },
    {
      id: 3,
      date: '2025-08-03',
      description: 'Bensin Motor',
      category: 'transportasi',
      type: 'expense',
      amount: 20000
    },
    {
      id: 4,
      date: '2025-08-02',
      description: 'Nonton Bioskop',
      category: 'hiburan',
      type: 'expense',
      amount: 45000
    },
    {
      id: 5,
      date: '2025-08-01',
      description: 'Freelance Project',
      category: 'lainnya',
      type: 'income',
      amount: 1500000
    }
  ];

  // Reactive statements
  $: totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  $: totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  $: totalBalance = totalIncome - totalExpense;

  // Filter transactions reactively
  $: {
    filteredTransactions = transactions.filter(transaction => {
      return (
        (!filterType || transaction.type === filterType) &&
        (!filterCategory || transaction.category === filterCategory) &&
        (!filterDate || transaction.date === filterDate)
      );
    });
    currentPage = 1; // Reset to first page when filters change
  }

  // Paginated transactions
  $: {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    paginatedTransactions = filteredTransactions.slice(start, end);
  }

  $: totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  $: showingFrom = filteredTransactions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  $: showingTo = Math.min(currentPage * itemsPerPage, filteredTransactions.length);

  let paginatedTransactions = [];

  // Functions
  function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function getCategoryColor(category) {
    const colors = {
      'makanan': 'bg-orange-100 text-orange-800',
      'transportasi': 'bg-blue-100 text-blue-800',
      'hiburan': 'bg-purple-100 text-purple-800',
      'gaji': 'bg-green-100 text-green-800',
      'investasi': 'bg-indigo-100 text-indigo-800',
      'lainnya': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  }

  function addSampleTransaction() {
    transactions = [...sampleTransactions];
  }

  function editTransaction(id) {
    alert(`Edit transaksi dengan ID: ${id}`);
  }

  function deleteTransaction(id) {
    if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      transactions = transactions.filter(t => t.id !== id);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
    }
  }

  onMount(() => {
    // Initialize empty transactions
    filteredTransactions = [...transactions];
  });
</script>

<svelte:head>
  <title>Dashboard Keuangan Pribadi</title>
</svelte:head>

  <div class="relative z-10">
    <header class="gradient-bg text-white shadow-2xl animate-slide-up">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between py-6">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center floating-element">
                <i class="fas fa-chart-line text-2xl text-white"></i>
                </div>
                <div class="absolute inset-0 w-12 h-12 bg-white bg-opacity-10 rounded-2xl pulse-ring"></div>
              </div>
              <div>
                <h1 class="text-3xl font-bold">Dashboard Keuangan</h1>
                <p class="text-blue-100 text-sm font-light">Kelola keuangan Anda dengan mudah</p>
              </div>
            </div>
            <div class="flex items-center space-x-6">
              <div class="hidden md:flex items-center space-x-3">
                <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="text-blue-100 font-medium">Online</span>
                </div>
              <div class="relative">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center cursor-pointer card-hover">
                <i class="fas fa-user text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

<!-- Main Content -->
  <div class="max-w-7xl mx-auto px-6 lg:px-8 py-8">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in">
      <div class="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 card-hover relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full -mr-16 -mt-16 opacity-10"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-gray-500 text-sm font-medium mb-2">Total Saldo</p>
                <p class="text-3xl font-bold gradient-text" id="totalBalance">Rp 0</p>
              </div>
              <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
                <i class="fas fa-wallet text-white text-xl"></i>
              </div>
            </div>
              <div class="flex items-center text-green-600">
                <i class="fas fa-arrow-up text-xs mr-1"></i>
                <span class="text-sm font-medium">+2.5% dari bulan lalu</span>
              </div>
            </div>
          </div>
                
          <div class="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 card-hover relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full -mr-16 -mt-16 opacity-10"></div>
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="text-gray-500 text-sm font-medium mb-2">Total Pemasukan</p>
                    <p class="text-3xl font-bold text-green-600" id="totalIncome">Rp 0</p>
                  </div>
                  <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                    <i class="fas fa-trending-up text-white text-xl"></i>
                  </div>
                </div>
                <div class="flex items-center text-green-600">
                  <i class="fas fa-arrow-up text-xs mr-1"></i>
                  <span class="text-sm font-medium">+8.2% dari bulan lalu</span>
                </div>
              </div>
            </div>
                
            <div class="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 card-hover relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-full -mr-16 -mt-16 opacity-10"></div>
                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <p class="text-gray-500 text-sm font-medium mb-2">Total Pengeluaran</p>
                      <p class="text-3xl font-bold text-red-600" id="totalExpense">Rp 0</p>
                    </div>
                    <div class="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center">
                      <i class="fas fa-trending-down text-white text-xl"></i>
                    </div>
                    </div>
                      <div class="flex items-center text-red-600">
                        <i class="fas fa-arrow-down text-xs mr-1"></i>
                        <span class="text-sm font-medium">-1.3% dari bulan lalu</span>
                      </div>
                  </div>
                </div>
            </div>

            <!-- Filter Section -->
            <div class="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 animate-fade-in">
                <div class="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Filter Transaksi</h2>
                        <p class="text-gray-500">Temukan transaksi yang Anda cari</p>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <select id="filterType" class="px-6 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white">
                            <option value="">Semua Tipe</option>
                            <option value="income">Pemasukan</option>
                            <option value="expense">Pengeluaran</option>
                        </select>
                        <select id="filterCategory" class="px-6 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white">
                            <option value="">Semua Kategori</option>
                            <option value="makanan">Makanan</option>
                            <option value="transportasi">Transportasi</option>
                            <option value="hiburan">Hiburan</option>
                            <option value="gaji">Gaji</option>
                            <option value="investasi">Investasi</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                        <input type="date" id="filterDate" class="px-6 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white">
                    </div>
                </div>
            </div>

            <!-- Transaction Table -->
            <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in">
                <div class="px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-1">Riwayat Transaksi</h2>
                            <p class="text-gray-500">Pantau semua aktivitas keuangan Anda</p>
                        </div>
                        <button 
                            class="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-2xl transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <i class="fas fa-plus"></i>
                            <span class="font-medium">Tambah Sample Data</span>
                        </button>
                    </div>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-gradient-to-r from-gray-900 to-blue-900 text-white">
                            <tr>
                                <th class="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider">Tanggal</th>
                                <th class="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider">Deskripsi</th>
                                <th class="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider">Kategori</th>
                                <th class="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider">Tipe</th>
                                <th class="px-8 py-5 text-right text-sm font-semibold uppercase tracking-wider">Jumlah</th>
                                <th class="px-8 py-5 text-center text-sm font-semibold uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="transactionTable" class="bg-white divide-y divide-gray-100">
                            <tr>
                                <td colspan="6" class="px-8 py-16 text-center text-gray-500">
                                    <div class="flex flex-col items-center">
                                        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <i class="fas fa-inbox text-4xl text-gray-300"></i>
                                        </div>
                                        <p class="text-xl font-medium text-gray-900 mb-2">Belum ada transaksi</p>
                                        <p class="text-gray-500">Klik "Tambah Sample Data" untuk melihat contoh data</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-8 flex items-center justify-between bg-white rounded-2xl shadow-lg p-6">
                <div class="text-gray-700 font-medium">
                    Menampilkan <span id="showingFrom">0</span> - <span id="showingTo">0</span> dari <span id="totalTransactions">0</span> transaksi
                </div>
                <div class="flex space-x-3">
                    <button 
                        id="prevBtn"
                        class="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        disabled
                    >
                        <i class="fas fa-chevron-left"></i>
                        <span>Sebelumnya</span>
                    </button>
                    <button 
                        id="nextBtn"
                        class="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        disabled
                    >
                        <span>Selanjutnya</span>
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>


