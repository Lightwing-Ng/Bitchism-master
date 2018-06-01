// search.js
// 参考以及致谢：
// @gzm1997
// https://github.com/gzm1997/translate-wechat-mini-program/blob/51f64d5ce1e892df6a083b3fb4d78ebfa820e973/app/pages/index/index.js

// 翻译语源
var langFrom = [
    'en', 'zh', 'fra', 'ara', 'est', 'bul', 'pl', 'dan', 'de', 'ru', 'fra', 'fin', 'kor', 'nl', 'cs', 'rom', 'pt', 'slo', 'th', 'wyw', 'spa', 'el', 'hu', 'it', 'yue', 'cht', 'vie'
];

// 目标语种
var langTo = [
    'en', 'zh', 'fra', 'ara', 'est', 'bul', 'pl', 'dan', 'de', 'ru', 'fra', 'fin', 'kor', 'nl', 'cs', 'rom', 'pt', 'slo', 'th', 'wyw', 'spa', 'el', 'hu', 'it', 'yue', 'cht', 'vie'
];


Page({
    data: {
        // 载入源头序列名称
        arrayFrom: [
            '英语', '中文', '法语', '阿拉伯语', '爱沙尼亚语', '保加利亚语', '波兰语', '丹麦语', '德语', '俄语', '法语', '芬兰语', '韩语', '荷兰语', '捷克语', '罗马尼亚语', '葡萄牙语', '斯洛文尼亚语',
            '泰语', '文言文', '西班牙语', '希腊语', '匈牙利语', '意大利语', '粤语', '中文繁体', '越南语'
        ],

        // 目标序列名称 
        arrayTo: [
            '英语', '中文', '法语', '阿拉伯语', '爱沙尼亚语', '保加利亚语', '波兰语', '丹麦语', '德语', '俄语', '法语', '芬兰语', '韩语', '荷兰语', '捷克语', '罗马尼亚语', '葡萄牙语', '斯洛文尼亚语',
            '泰语', '文言文', '西班牙语', '希腊语', '匈牙利语', '意大利语', '粤语', '中文繁体', '越南语'
        ],
        indexFrom: 1,
        indexTo: 0,
        size: 0,
        words: "",
        wordsTotranslate: "",
        wordFrom: "zh",
        wordTo: "en",
        DisplayResult: "none",
        DisplayButton: "block",
        DisplayAudio: "none",
        src: ""
    },

    // 函数：从...翻译 
    changeform: function (e) {
        console.log(langFrom[e.detail.value]);
        this.setData({
            indexFrom: e.detail.value,
            wordFrom: langFrom[e.detail.value]
        })
    },

    // 函数：翻译至...
    changeto: function (e) {
        console.log(langTo[e.detail.value]);
        this.setData({
            indexTo: e.detail.value,
            wordTo: langTo[e.detail.value]
        })
        if (this.data.wordsTotranslate != "") {
            var target = "";
            console.log(this.data.wordFrom);
            console.log(this.data.wordTo);
            console.log(this.data.wordsTotranslate);
            if (this.data.wordFrom != this.data.wordTo && this.data.wordsTotranslate != "") {
                this.setData({
                    loading: true
                })
                console.log("send");
                wx.request({
                    url: 'http://fanyi.sogou.com/reventondc/api/sogouTranslate',
                    data: {
                        word: this.data.wordsTotranslate,
                        From: this.data.wordFrom,
                        To: this.data.wordTo
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data);
                        target = res.data;

                    }
                })
                setTimeout(() => (function (str, that) {
                    // console.log("lala")
                    if (str != "") {
                        // console.log("yes");
                        that.setData({
                            loading: false,
                            DisplayResult: "block",
                            DisplayButton: "none",
                            resultRords: str,
                            src: "http://tts.baidu.com/text2audio?lan=" + that.data.wordTo + "&ie=UTF-8&text=" + str
                        })
                        if (that.data.wordTo == "zh" || that.data.wordTo == "en") {
                            that.setData({
                                DisplayAudio: "block"
                            })
                        }
                        else {
                            that.setData({
                                DisplayAudio: "none"
                            })
                        }
                    }
                })(target, this), 1000)
            }
        }
    },

    // 
    showClear: function (e) {
        console.log("show clean");
        this.setData({
            size: 23,
            wordsTotranslate: e.detail.value,
            DisplayResult: "none",
            DisplayButton: "block",
            DisplayAudio: "none"

        })
    },

    // 清除单词
    clearWords: function () {
        console.log("clean");
        this.setData({
            words: "",
            wordsTotranslate: "",
            size: 0,
            DisplayResult: "none",
            DisplayButton: "block",
            DisplayAudio: "none",
            loading: false
        })
    },

    // 函数：发送请求
    send: function (e) {
        var target = "";
        console.log(this.data.wordFrom);
        console.log(this.data.wordTo);
        console.log(this.data.wordsTotranslate);

        if (this.data.wordFrom != this.data.wordTo && this.data.wordsTotranslate != "") {
            this.setData({
                loading: true
            })
            console.log("send");
            wx.request({
                url: 'http://fanyi.sogou.com/reventondc/api/sogouTranslate',
                data: {
                    word: this.data.wordsTotranslate,
                    From: this.data.wordFrom,
                    To: this.data.wordTo
                },
                header: {
                    "content-type": "application/json",
                    "Accept": "application/json"
                },
                success: function (res) {
                    console.log(res.data);
                    target = res.data;

                }
            })

            setTimeout(() => (function (str, that) {
                if (str != "") {
                    that.setData({
                        loading: false,
                        DisplayResult: "block",
                        DisplayButton: "none",
                        resultRords: str,
                        src: "http://tts.baidu.com/text2audio?lan=" + that.data.wordTo + "&ie=UTF-8&text=" + str
                    })
                    if (that.data.wordTo == "zh" || that.data.wordTo == "en") {
                        that.setData({
                            DisplayAudio: "block"
                        })
                    }
                    else {
                        that.setData({
                            DisplayAudio: "none"
                        })
                    }
                }
            })(target, this), 1000)
        }

    },

    //
    onShareAppMessage: function () {
        return {
            title: "翻译助手",
            desc: "打开微信轻松翻译",
            path: '/pages/index/index'
        }
    },

    onLoad: function (options) {
        // 生命周期函数--监听页面加载
    },
    onShareAppMessage: function () {
        // 用户点击右上角分享
        return {
            title: '', // 分享标题
            desc: '', // 分享描述
            path: '' // 分享路径
        }
    },
    search: function (e) {
        var that = this
        var content = e.detail.value
        wx.request({
            url: 'https://api.shanbay.com/bdc/search/?word=' + content,
            data: {},
            method: 'GET',
            success: function (res) {
                console.log(res)
                var msg = res.data.msg
                if (msg == "SUCCESS") {
                    wx.navigateTo({
                        url: './detail/detail?content=' + content,
                        success: function (res) {
                            // success
                        },
                        fail: function () {
                            // fail
                        },
                        complete: function () {
                            // complete
                        }
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '对不起，查询不到该词信息',
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            }
                        }
                    })
                }
            },
            fail: function () {
            },
            complete: function () {
            }
        })
    },
    help: function () {
        wx.showModal({
            title: '提示',
            content: '输入单词后点击回车键即可查询',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }
            }
        })
    }
})