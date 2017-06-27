(function($) {
    function input(dom, words) {
        this.init(dom, words);
    }
    input.prototype = {
        init: function(dom, words) {
            this.dom = dom;
            this.words = words;
            this.bindEvent();
        },
        isExist: function(str) {
            var flag = false;
            var newArr = [];
            for (var i = 0; i < words.length; i++) {
                if (words[i].indexOf(str) != -1) {
                    flag = true;
                    newArr.push(words[i]);
                }
            }
            if (!flag) {
                return ''
            } else {
                return newArr;
            }
        },
        showList: function(datas) {
            var str = "<ul style='list-style:none;'>"
            datas.forEach(function(item) {
                str += "<li>" + item + "</li>"
            })
            str += "</ol>";
            var lists = $(str);
            var dom = this.dom;
            dom.append(lists);
            dom.find(lists).css({
                'position': 'absolute',
                'z-index': '100',
                'background': '#fff',
                'width': '80% ',
                'border': '1px solid #dcdcdc',
                'padding': '30px 0px',
                'list-style': 'none',
                'left': '10%',
                'border-radius': '10px'
            })
            dom.find(lists).find('li').css({
                'line-height': '30px',
                'text-align': 'left',
                'padding':'0px 15px'
            })
        },
        bindEvent: function() {
            var dom = this.dom;
            var self = this;
            dom.on('keyup', 'input', function() {
                var val = $(this).val();
                if (dom.find('ul')) {
                    dom.find('ul').remove()
                }
                if (val != "") {
                    var datas = self.isExist(val);
                    if (typeof datas == 'object') {
                        if (dom.find('ul')) {
                            dom.find('ul').remove()
                        }
                        self.showList(datas);
                    }
                }
            })
            dom.on('mouseover', 'li', function() {
            	$(this).css({'background':'rgba(255,247,0,0.1)'})
            })
            dom.on('mouseout', 'li', function() {
            	$(this).css({'background':'#fff'})
            })
            dom.on('click', 'li', function() {
            	var text=$(this).text().trim();
            	dom.find('input').val(text);
            	if (dom.find('ul')) {
                    dom.find('ul').remove()
                }
            })
        }
    }
    $.fn.search = function(placeholder, words) {
        $(this).find('input').attr('placeholder', placeholder);
        $(this).find('input').attr('autocomplete', 'off')
        $(this).css('position', 'relative')
        new input($(this), words)
    }
})(jQuery)
