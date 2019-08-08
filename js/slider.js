

(function ($) {
    $.fn.extend({
        slider: function (options) {
            options.pre = this;
            new Slider(options)
        }
    })
    function Slider(opt) {
        this.opt = opt;
        this.init();
    }
    Slider.prototype.init = function () {
        this.pre = this.opt.pre
        this.imglen = this.opt.img.length;
        this.nowIndex = 0;
        this.width = parseInt(this.pre.css('width'));
        this.heigth = parseInt(this.pre.css('height'));
        this.timer = null;
        this.flag = true;
        this.createDom();
        this.bindEvent();
        this.startMove();
    }
    Slider.prototype.createDom = function () {

        var circle = $('<div class="circle"></div>');
        var ulstr = $('<ul class="imgList"></ul>');
        var btn = $('<div class="btn"><span class= "leftBtn"><</span><span class="rightBtn">></span></div >');
        var circleul = $('<ul></ul>');
        var imgstr = '';
        var circlestr = '';
        for (var i = 0; i < this.imglen; i++) {
            imgstr += '<li><img src = "' + this.opt.img[i] + '" alt = "" ></li>';
            circlestr += '<li></li>';
        }
        imgstr += '<li><img src = "' + this.opt.img[0] + '" alt = ""></li>';
        $(circlestr).appendTo(circleul);
        this.pre.append(ulstr.html(imgstr)).append(btn).append(circle.append(circleul));
        $('.imgList').css('width', (this.imglen + 1) * this.width + 'px');
        $('.imgList li').css('width', this.width + 'px');
        $('.circle ul li:eq(0)').addClass('active')
    }
    Slider.prototype.bindEvent = function () {
        var self = this;
        $('.leftBtn').add('.rightBtn').add('.circle ul li').on('click', function () {
            if ($(this).attr('class') == 'leftBtn') {
                self.move('leftBtn');
            } else if ($(this).attr('class') == 'rightBtn') {
                self.move('rightBtn');
            } else {
                self.move($(this).index());
            }
        });
        $('.wrapper').on('mouseenter', function () {
            $('.btn span').css('display', 'block');
            clearTimeout(self.timer);
        }).on('mouseleave', function () {
            $('.btn span').css('display', 'none');
            self.flag = true;
            self.startMove();
        })
    }
    Slider.prototype.startMove = function () {
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(() => {
            self.move('rightBtn');
            self.flag = true;
        }, self.opt.duration);
    }
    Slider.prototype.move = function (attr) {
        if (this.flag) {
            this.flag = false;
            if (attr == 'leftBtn') {
                if (this.nowIndex == 0) {
                    $('.imgList').css('left', -this.width * (this.imglen));
                    $('.imgList').animate({
                        left: -this.width * (this.imglen - 1 )
                    });
                    this.nowIndex = this.imglen - 1;

                } else {
                    this.nowIndex = this.nowIndex - 1;
                }
            } else if (attr == 'rightBtn') {
                if (this.nowIndex == this.imglen - 1) {
                    $('.imgList').animate({
                        left: -this.width * (this.imglen )
                    }, function () {
                        $('.imgList').css('left', 0);
                    })
                    this.nowIndex = 0;
                } else {
                    this.nowIndex = this.nowIndex + 1;
                }
            } else {
                this.nowIndex = attr;
            }

            this.changeCircle();
            this.moveImg()
        }
    }
    Slider.prototype.moveImg = function () {
        var self = this;
        $('.imgList').animate({
            'left': -this.width * this.nowIndex
        }, function () {
            self.startMove();
        })
    }
    Slider.prototype.changeCircle = function () {
        $('.active').removeClass();
        $('.circle ul li').eq(this.nowIndex).addClass('active')
    }
}(jQuery))
