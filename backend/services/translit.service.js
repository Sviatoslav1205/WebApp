const generate_url = (str) => {
	let url = str.replace(/[\s]+/gi, '-')
	url = translit(url)
  let extension = url.split('.').pop()
	url = url.split('.').slice(0, -1).join('.').replace(/[^0-9a-z_\-]+/gi, '').toLowerCase()
	return url+'.'+extension
}

const translit = (str) => {
	const ua=("А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я").split("-")   
	const en=("A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya").split("-")   
 	let res = ''
	for (let i = 0; i < str.length; i++) { 
		const char = str.charAt(i)
    let charIndex = ua.indexOf(char)
		if (charIndex >= 0) { 
      res += en[charIndex]
    } 
		else { 
      res += char
    } 
  }
  return res
}

module.exports = generate_url