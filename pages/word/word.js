var list = require('../../data/word-list.js')

Page({
    data: {},
    onLoad: function (options) {
        var idx = Math.floor(Math.random() * 499) + 1
        var word = list.wordList[idx]
        this.setData({
            content: word.content,
            pron: word.pron,
            definition: word.definition,
            audio: word.audio
        })
    },
    show: function () {
        this.setData({
            showNot: true
        })
    },
    next: function () {
        this.setData({
            showNot: false
        })
        var idx = Math.floor(Math.random() * 499) + 1
        var word = list.wordList[idx]
        this.setData({
            content: word.content,
            pron: word.pron,
            definition: word.definition,
            audio: word.audio
        })
    },
    read: function () {
        console.log(this.data.audio)
        wx.playVoice({
            filePath: this.data.audio,
            success: function (res) {
                console.log('ok')
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    }
})