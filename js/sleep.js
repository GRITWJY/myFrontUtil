function sleep(millionsSeconds) {
	return new Promise(resolve => {
		setTimeout(resolve,millionsSeconds)
	})
}

sleep(2000).then(()=>{
	console.log('aaaa')
})

async function init() {
	await sleep(2000)
	console.log('abde')
}
