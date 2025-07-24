<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from '$lib/supabaseClient'

  let message: string = '🔄 Checking connection...'
  let dataPreview: string | null = null // pastikan null dulu

  onMount(async () => {
    const { data, error } = await supabase.from('transactions').select('*').limit(1)

    if (error) {
      message = '❌ Gagal konek ke Supabase: ' + error.message
      console.error(error)
    } else {
      message = '✅ Berhasil konek ke Supabase!'
      dataPreview = JSON.stringify(data, null, 2) // simpan string JSON
      console.log('📦 Data:', data)
    }
  })
</script>

<h2>{message}</h2>

{#if dataPreview}
  <pre>{dataPreview}</pre>
{:else}
  <p>🔍 Menunggu data...</p>
{/if}
