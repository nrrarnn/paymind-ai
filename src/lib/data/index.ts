 const dashboardData = {
    totalSaldo: 7500000,
    pemasukan: {
      amount: 5250000,
      percentage: 33.3
    },
    pengeluaran: {
      amount: 3100000,
      percentage: 37.6
    },
    totalPemasukan: 15750000,
    totalPengeluaran: 8250000,
    rasioSaving: 47.6
  };

  const recentTransactions = [
    {
      id: 1,
      type: 'income',
      title: 'Gaji bulan ini',
      category: 'Salary',
      date: '2025-01-15',
      amount: 5000000
    },
    {
      id: 2,
      type: 'expense',
      title: 'Belanja groceries di supermarket',
      category: 'Food',
      date: '2025-01-14',
      amount: -450000
    },
    {
      id: 3,
      type: 'income',
      title: 'Freelance project selesai',
      category: 'Freelance',
      date: '2025-01-13',
      amount: 1500000
    },
    {
      id: 4,
      type: 'expense',
      title: 'Bayar listrik dan air',
      category: 'Utilities',
      date: '2025-01-12',
      amount: -350000
    }
  ];

  export { dashboardData, recentTransactions };