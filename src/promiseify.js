function promisify(original) {
	function fn(...args) {
		return new Promise((resolve, reject) => {
			// 参数添加回调函数
			args.push((err, ...values) => {
				if (err) {
					return reject(err)
				}
				resolve(values)
			})
			// original.apply(this,args)
			Reflect.apply(original, this, args)
		})
	}

	return fn
}


const imageSrc = 'https://www.themealdb.com/images/ingredients/Lime.png';

function loadImage(src, callback) {
	const image = document.createElement('img');
	image.src = src;
	image.alt = '公众号若川视野专用图？';
	image.style = 'width: 200px;height: 200px';
	image.onload = () => callback(null, image);
	image.onerror = () => callback(new Error('加载失败'));
	document.body.append(image);
}


const loadImagePromise = promisify(loadImage);
async function load(){
	try{
		const res = await loadImagePromise(imageSrc);
		console.log(res);
	}
	catch(err){
		console.log(err);
	}
}
load();

