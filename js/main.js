//元素获取
function $(selector) {
    var method = selector.substr(0, 1) == '.' ? 'getElementsByClassName' : 'getElementById';
    return document[method](selector.substr(1));
}
//生成随机数
function random(range) {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);
    var diff = max - min;
    var number = Math.floor(Math.random() * diff + min);
    return number;
}
//内容输出
var data = data;

function addPhotos() {
    var template = $('#container').innerHTML;
    var html = [];
    for (i in data) {
        var _html = template
            .replace('{{index}}', i)
            .replace('{{img}}', data[i].img)
            .replace('{{caption}}', data[i].caption)
            .replace('{{desc}}', data[i].desc);
        html.push(_html)
    }
    $('#container').innerHTML = html.join('');
    console.log(random([0, data.length]))
    sort(random([0, data.length]))
}
addPhotos();

//排序
function sort(n) {
    var _photo = $('.photo');
    var photos = [];
    for (var i = 0; i < _photo.length; i++) {
        _photo[i].className = _photo[i].className.replace(/\s*photo_center\s*/, '');
        photos.push(_photo[i]);
    }
    var photo_center = $('#photo_' + n);
    photo_center.className += ' photo-center';
    photo_center = photos.splice(n, 1)[0];
    var photos_left = photos.splice(0, Math.ceil(photos.length / 2));
    var photos_right = photos;
    var ranges = range();
    for (i in photos_left) {
        var photo = photos_left[i];
        photo.style.left = random(ranges.left.x) + 'px';
        photo.style.top = random(ranges.left.y) + 'px';
        photo.style['transform'] = 'rotate(' + random([-150, 150]) + 'deg)';
    }
    for (i in photos_right) {
        var photo = photos_right[i];
        photo.style.left = random(ranges.right.x) + 'px';
        photo.style.top = random(ranges.right.y) + 'px';
        photo.style['transform'] = 'rotate(' + random([-150, 150]) + 'deg)';
    }
}

//计算左右分区的范围
function range() {
    var range = {
        left: { x: [], y: [] },
        right: { x: [], y: [] }
    }
    var wrap = {
        w: $('#container').clientWidth,
        h: $('#container').clientHeight
    }
    var photo = {
        w: $('.photo')[0].clientWidth,
        h: $('.photo')[0].clientHeight
    }
    range.wrap = wrap;
    range.photo = photo;
    range.left.x = [0 - photo.w, wrap.w / 2 - photo.w / 2];
    range.left.y = [0 - photo.h, photo.h];
    range.right.x = [wrap.w / 2 + photo.w / 2, wrap.w + photo.w];
    range.right.y = range.left.y;
    return range;
}
//翻转控制
function turn(ele) {
    var clas = ele.className;
    if (/photo-front/.test(clas)) {
        clas = clas.replace(/photo-front/, 'photo-back')
    } else {
        clas = clas.replace(/photo-back/, 'photo-front')
    }
    return ele.className = clas;
}
