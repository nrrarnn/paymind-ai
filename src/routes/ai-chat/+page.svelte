<script>
	import { onMount } from 'svelte';
	
	let messages = [
		{
			id: 1,
			type: 'bot',
			content: 'Halo! Saya AI assistant keuangan Anda. Ceritakan transaksi Anda dengan bebas, saya akan membantu mengkategorikannya. Contoh: "Tadi beli kopi 25ribu di starbucks" atau "Dapat gaji 5juta kemarin"',
			time: '09:30'
		}
	];
	
	let inputMessage = '';
	let chatContainer;
	
	function addMessage(content, type = 'user') {
		const newMessage = {
			id: messages.length + 1,
			type,
			content,
			time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
		};
		messages = [...messages, newMessage];
		
		setTimeout(() => {
			if (chatContainer) {
				chatContainer.scrollTop = chatContainer.scrollHeight;
			}
		}, 100);
	}
	
	function handleSend() {
		if (inputMessage.trim()) {
			addMessage(inputMessage);
			
			setTimeout(() => {
				addMessage('Terima kasih! Saya sedang memproses transaksi Anda dan akan mengkategorikannya sesuai dengan jenis pengeluaran atau pemasukan.', 'bot');
			}, 1000);
			
			inputMessage = '';
		}
	}
	
	function handleKeyPress(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSend();
		}
	}
	
	onMount(() => {
		const input = document.querySelector('textarea');
		if (input) input.focus();
	});
</script>

<svelte:head>
	<title>AI Financial Assistant</title>
</svelte:head>

<div class="h-screen flex flex-col mx-auto bg-white shadow-xl rounded-lg">
	<header class="bg-white border-b border-gray-300 p-5 sticky top-0 z-[100]">
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
					<path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
					<path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
				</svg>
			</div>
			<div class="m-0 text-lg font-semibold text-gray-800">
				<h1>AI Financial Assistant</h1>
				<p>Ceritakan transaksi Anda secara natural</p>
			</div>
		</div>
	</header>

	<main class="flex-1 overflow-y-auto p-5 bg-gray-50" bind:this={chatContainer}>
		<div class="flex flex-col gap-4 max-w-full">
			{#each messages as message (message.id)}
				<div class="flex w-full {message.type}">
					<div class="max-w-[80%] flex flex-col gap-1">
						<div class="py-3 px-4 rounded-[18px] text-sm leading-[1.4] break-words bg-white text-gray-800 border border-gray-200 rounded-bl-[4px]">
							{message.content}
						</div>
						<div class="text-[11px] text-gray-400 px-2">
							{message.time}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</main>

	<footer class="bg-white border-t border-gray-300 py-4 px-5">
		<div class="flex gap-3 items-end bg-gray-50 border border-gray-200 rounded-3xl py-2 px-4 transition-colors duration-200 focus-within:border-blue-200 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]">
			<textarea
					bind:value={inputMessage}
					on:keypress={handleKeyPress}
					placeholder="Ceritakan transaksi Anda... contoh: 'Tadi beli kopi 25ribu di starbucks'"
					rows="1"
					class="flex-1 border-none outline-none bg-transparent resize-none text-sm leading-[1.4] font-inherit min-h-[20px] max-h-[120px] placeholder-gray-400 py-2" 
			></textarea>
			<button 
				class="bg-blue-500 border-none rounded-full w-9 h-9 flex items-center justify-center text-white cursor-pointer transition-all duration-200 flex-shrink-0 hover:bg-blue-600 hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none" 
				on:click={handleSend}
				disabled={!inputMessage.trim()}
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
		</div>
		<div class="text-[11px] text-gray-400 mt-2">
			Tips: Gunakan kata seperti "beli", "bayar" untuk pengeluaran atau "dapat", "gaji" untuk pemasukan
		</div>
	</footer>
</div>