//轮播图实现
var pic = document.querySelector(".pic");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
next.onclick = function() {
	next_pic();
}
prev.onclick = function() {
	prev_pic();
}
// 下一张
function next_pic() {
	var nextleft;
	if (pic.style.left == "-5120px") {
		nextleft = -2048;
		// 当轮播到-5120px（1.jpg），跳转回-2048px（2.jpg）
	} else {
		nextleft = parseInt(pic.style.left) - 1024;
		// 需要将其转化为数字
	}
	pic.style.left = nextleft + "px";
	// +“px” 转化回字符

	// 当前小图高亮显示
	index++;
	if (index > 3) {
		index = 0;
	}
	CurrentBotton();
}
// 上一张
function prev_pic() {
	var nextleft;
	if (pic.style.left == "0px") {
		nextleft = -3072;
		// 当轮播到0px（4.jpg），跳转回-3072px（3.jpg）
	} else {
		nextleft = parseInt(pic.style.left) + 1024;
		// 需要将其转化为数字
	}
	pic.style.left = nextleft + "px";
	// +“px” 转化回字符
	// 当前小图高亮显示
	index--;
	if (index < 0) {
		index = 3;
	}
	CurrentBotton();
}
// 自动轮播
var time = setInterval(next_pic, 3000);
// 鼠标悬浮在图片上时停止播放,离开时恢复播放
var container = document.querySelector(".container");
container.onmouseenter = function() {
	clearInterval(time);
}
container.onmouseleave = function() {
	time = setInterval(next_pic, 3000);
}
// 轮播图右下角小图
var title = document.querySelector(".title");
var botton = document.querySelector(".bottons");
var spans = title.getElementsByTagName("span");
var imgs = botton.getElementsByTagName("img");
var index = 0;
window.onload = function() {
	spans[index].style.display = "block";
	imgs[index].id = "pic_on";
}

function CurrentBotton() {
	for (var i = 0; i < imgs.length; i++) {
		spans[i].style.display = "none";
		imgs[i].id = "";
	}
	imgs[index].id = "pic_on";
	spans[index].style.display = "block";
}
// 点击小图定位对应图片
for (var i = 0; i < imgs.length; i++) {
	(function(i) {
		imgs[i].onclick = function() {
			var dis = index - i;
			if (index == 0 && parseInt(pic.style.left) == -5120) {
				dis = 4 + dis;
			}
			// 当前为-5120px（1.jpg）时，点击其它序号意味着右翻（+（dis）*1024px），但-5120px已不能在继续减了，所以跳转回-1024px（1.jpg）所以dis+4。下面同理
			if (index == 3 && parseInt(pic.style.left) == 0) {
				dis = dis - 4;
			}
			pic.style.left = (parseInt(pic.style.left) + dis * 1024) + "px";
			index = i;
			CurrentBotton();
		}
	})(i);
}
