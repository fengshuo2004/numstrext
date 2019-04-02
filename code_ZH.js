// Number and String operation Extension v0.4 by David Feng

// Use download.js from github
var scriptTag = document.createElement("script");
scriptTag.setAttribute("src","https://cdn.rawgit.com/rndme/download/master/download.min.js");
document.head.appendChild(scriptTag);

// keyboard listener
var currentKey;
document.addEventListener("keydown", function(event){
	currentKey = event.key;
});
document.addEventListener("keyup", function(event){
	currentKey = "";
});

(function (ext) {
	// 关闭扩展的清理代码
	ext._shutdown = function () { };

	// Sc扩展状态码
	ext._getStatus = function () {
		return { status: 2, msg: 'Ready' };
	};

	// ---积木块定义---
	// 小写
	ext.lower = function (string) {
		return string.toLowerCase();
	}

	// 大写
	ext.upper = function (string) {
		return string.toUpperCase();
	}

	// 字符转Unicode
	ext.charunicode = function (character) {
		if (character.length == 1) {
			return character.charCodeAt(0);
		}
		else {
			return "null";
		}
	}

	// Unicode转字符
	ext.unicodechar = function (number) {
		if (Number.isInteger(number) && Math.sign(number) == 1) {
			return String.fromCharCode(number);
		}
		else {
			return "null";
		}
	}

	// 替换字符
	ext.replacestr = function (findstr, str, repstr) {
		findstr = findstr.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
		var regex = new RegExp(findstr, 'g');
		return str.replace(regex, repstr);
	}

	// 如果字符串包含
	ext.ifinclude = function (str, substr) {
		return str.includes(substr);
	}

	// 字符串包含多少个
	ext.countstr = function (substr, str) {
		substr = substr.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
		var regex = new RegExp(substr, 'g');
		return (str.match(regex) || []).length;
	}

	// 子字符串索引
	ext.substrindex = function (occur, substr, str) {
		var index = 0;
		for (i = 0; i < occur; i++) {
			index = str.indexOf(substr, index) + 1;
		}
		return index;
	}

	// 截取字符串
	ext.strslice = function (start, end, str) {
		switch (Math.sign(start)) {
			case 1:
				var fstart = start - 1;
				break;
			case 0:
				return 'null';
			case -1:
				var fstart = start;
		}
		if (Math.sign(end) == 0) {
			return 'null';
		}
		else {
			var fend = end;
		}
		return str.slice(fstart, fend);
	}

	// 乘方
	ext.power = function (base, exp) {
		return Math.pow(base, exp);
	}

	// 方根
	ext.root = function (n, x) {
		try {
			var negate = n % 2 == 1 && x < 0;
			if (negate) {
				x = -x;
			}
			var possible = Math.pow(x, 1 / n);
			n = Math.pow(possible, n);
			if (Math.abs(x - n) < 1 && (x > 0 == n > 0)) {
				return negate ? -possible : possible;
			}
		} catch (e) { }
	}

	// 四舍五入到小数点
	ext.round = function (num, scale) {
		if (!("" + num).includes("e")) {
			return +(Math.round(num + "e+" + scale) + "e-" + scale);
		} else {
			var arr = ("" + num).split("e");
			var sig = ""
			if (+arr[1] + scale > 0) {
				sig = "+";
			}
			return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
		}
	}

	// 阶乘
	ext.factorial = function (num) {
		if (Number.isInteger(num) && Math.sign(num) == 1) {
			if (num === 0 || num === 1)
				return 1;
			for (var i = num - 1; i >= 1; i--) {
				num *= i;
			}
			return num;
		}
		else {
			return 'null';
		}
	}

	// JS弹窗OK
	ext.popupalert = function (displaytext) {
		window.alert(displaytext);
	}

	// JS弹窗OK和Cancel
	ext.popupconfirm = function (displaytext) {
		return window.confirm(displaytext);
	}

	// JS弹窗输入
	ext.popupprompt = function (displaytext) {
		var back = window.prompt(displaytext, "");
		if (back === null) {
			return "";
		}
		else {
			return back;
		}
	}


	// 复制进剪贴板
	ext.copytoclipboard = function (copy) {
		var copyele = document.createElement("input");
		copyele.type = "text";
		copyele.value = copy;
		document.body.appendChild(copyele);
		copyele.select();
		document.execCommand("copy");
		copyele.parentNode.removeChild(copyele);
	}

	// 设cookie
	ext.setcookie = function (name, value, expire) {
		switch (expire) {
			case '10分钟':
				var expsec = 600;
				break;
			case '60分钟':
				var expsec = 3600;
				break;
			case '12小时':
				var expsec = 43200;
				break;
			case '24小时':
				var expsec = 86400;
				break;
			case '7天':
				var expsec = 604800;
				break;
			case '30天':
				var expsec = 2592000;
				break;
			case '90天':
				var expsec = 7776000;
		}
		document.cookie = '*' + name + '=' + value + "; max-age=" + expsec.toString();
	}

	// 读cookie
	ext.getcookie = function (name) {
		name = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
		var cookiestring = RegExp("" + ('\\*' + name) + "[^;]+").exec(document.cookie);
		return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
	}

	// 删cookie
	ext.delcookie = function (name) {
		document.cookie = '*' + name + '=deleted; max-age=0';
	}
	// 请求上传文件
	ext.upload = function(callback){
		var reader = new FileReader(); // file reader
		var injcont = document.createElement("div");
		injcont.id = "injcont";
		injcont.setAttribute("style","height:100vh;width:100vw;")
		document.body.appendChild(injcont);
		injcont.innerHTML = "<div align=\"center\" style=\"position:relative;top:calc(50% - 70px);left:calc(50% - 200px);height:140px;width:400px;background-color:#DDDEDE;border-style:solid;border-color:#4B4A60;border-width:10px;border-radius:16px;z-index:100;\"><p style=\"line-height: 40px;\"><strong>请从您的本地目录中选择一个文本文件<\/strong><\/p><input id=\"filein\" type=\"file\" name=\"file\" accept=\".txt\"><\/div><div style=\"position:absolute;left:0;top:0;width:100%;height:100%;background-color:#FFFFFF;opacity:0.6;filter:alpha(opacity=60);z-index:99;\"><\/div>";
		var intID = setInterval(function(){
			var fileobj = document.getElementById('filein').files;
			if (fileobj.length == 1){
				reader.readAsText(fileobj[0]);
				injcont.parentNode.removeChild(injcont);
				clearInterval(intID);
			}
		},500);
		reader.onload = function(){
			callback(reader.result);
		};
	}

	// 下载文件
	ext.download = function(str,name){
		download(str, name + ".txt", "text/plain");
	}

	// 特殊按键检测
	ext.detectKey = function(key){
		var keydict = {
			"Backspace":"Backspace",
			"Tab":"Tab", // I brought this key out cuz when pressed, tab causes the main window to lose focus
			"Enter":"Enter",
			"Shift":"Shift",
			"Control":"Ctrl", // This might interfere with browser shortcuts
			"Alt":"Alt", // So might this
			"Escape":"Esc",
			"Delete":"Del",
			";":";",
			"=":"=",
			",":",",
			"-":"-",
			".":".",
			"/":"/",
			"`":"`",
			"[":"[",
			"\\":"\\",
			"]":"]",
			"'":"'"
		}
		return keydict[currentKey] == key;
	}

	// ---积木块描述---
	var descriptor = {
		blocks: [
			['r', '%s 的小写', 'lower', 'HELLO'],
			['r', '%s 的大写', 'upper', 'world'],
			['r', '%s 的unicode编码', 'charunicode', 'h'],
			['r', 'unicode编码 %n 的字符', 'unicodechar', 68],
			['r', '替换所有 %s 于 %s 为 %s', 'replacestr', 'apple', 'pineapple', 'tree'],
			['b', '字符串 %s 包含 %s', 'ifinclude', 'helloworld', 'world'],
			['r', '%s 在 %s 中出现的次数', 'countstr', 'na', 'banana'],
			['r', '第 %n 个 %s 于 %s 的索引', 'substrindex', 2, 'na', 'banana'],
			['r', '第 %n 到 %n 个字符于 %s', 'strslice', 2, 4, 'hello'],
			['r', '%n ^ %n', 'power', 2, 3],
			['r', '%n √ %n', 'root', 3, 27],
			['r', '%n 四舍五入到第 %n 位小数', 'round', 3.1415, 3],
			['r', '%n !', 'factorial', 5],
			[' ', '弹出警告弹窗 %s', 'popupalert', 'Hello!'],
			['b', '弹出确认弹窗 %s', 'popupconfirm', 'Hello!'],
			['r', '弹出询问弹窗 %s', 'popupprompt', 'Name?'],
			[' ', '复制 %s 至剪贴板', 'copytoclipboard', 'hello'],
			[' ', '设置cookie %s 值为 %s 在 %m.expire 后过期', 'setcookie', 'name', 'john', '10分钟'],
			['r', 'cookie %s 的值', 'getcookie', 'name'],
			[' ', '删除cookie %s', 'delcookie', 'name'],
			['R', '文件内容','upload'],
			[' ', '下载 %s 为 %s', 'download', 'hi', 'hello'],
			['b', '按键 %m.keys 是否按下？', 'detectKey', 'Backspace'],
			['h', '当按下 %m.keys 键', 'detectKey', 'Backspace']
		],
		menus: {
			expire: ['10分钟', '60分钟', '12小时', '24小时', '7天', '30天', '90天'],
			keys: ['Backspace', 'Enter', 'Shift', 'Esc', 'Del', ';', '=', ',', '-', '.', '/', '`', '[', '\\', ']', '\'']
		},
		url: 'http://shuof123.wixsite.com/pixelworld/programming',
		displayName: 'Number and String operation Extension v0.4'
	};

	// ScX加载扩展
	ScratchExtensions.register('NumStr Ext', descriptor, ext);
})({});
