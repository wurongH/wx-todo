Page({
  data: {
    input: '',
    //任务清单数据
    todos: [
  
    ],
    count: 0,
    allCompleted: false
  },
  save: function () {
    wx.setStorageSync('todo_list', this.data.todos)
  },
  load: function () {
    var todos = wx.getStorageSync('todo_list')
    if (todos) {
      var count = todos.filter(function (item) {
        return !item.completed
      }).length
      this.setData({ todos: todos, count: count })
    }
  },
  onLoad: function () { 
    this.load ()
  },
  inputChangeHandle: function (e) {
    this.setData({input: e.detail.value})
  },
  //按钮点击时 执行代码  拿到文本框里的值  将值添加到列表中
  addTodoHandle: function () {
    if (!this.data.input) return
    //当按钮添加点击事件时执行函数(拿到input里的value值  注意  单向数据流 并添加到列表中)
    var todos = this.data.todos
    todos.push({name: this.data.input, completed: false})
    //通过setData改变数组  这样界面才会变化
    this.setData({todos: todos, input: '', count: this.data.count + 1})
    this.save()
  },
  toggleHandle: function (e) {
    //切换当前点钟的item完成状态
    var item = this.data.todos[e.currentTarget.dataset.index]
    item.completed = !item.completed
    //根据当前任务的完成状态决定增加一个或者减少一个
    var count = this.data.count + (item.completed ? -1 : 1)
    this.setData({todos: this.data.todos, count: count})
    this.save()
  },
  //注意冒泡问题
  removeTodoHandle: function (e) {
    var todos = this.data.todos
    //todos 中会移除index指向的元素  
    //item shi splice中移除掉的元素  
    var item = todos.splice(e.currentTarget.dataset.index, 1)[0]
    var count = this.data.count - (item.completed ? 0 : 1)
    this.setData({todos: todos, count: count})
    this.save()
  },
  toggleAllHandle: function () {
    //this 在这里永远指向当前页面对象  不是事件对象
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos 
    var that = this
    todos.forEach(function (item) {
      item.completed = that.data.allCompleted
    })
    var count = this.data.allCompleted ? 0 : this.data.todos.length
    this.setData({todos: todos, count: count})
    this.save()
  },
  clearHandle: function () {
    // var todos = []
    // this.data.todos.forEach(function (item) {
    //   if (!item.completed) {
    //     todos.push(item)
    //   }
    // })
    // todos => 新的未完成的任务列表
    // 
    var todos = this.data.todos.filter(function (item) {
      return !item.completed
    })
    this.setData({todos: todos})
    this.save()
  }
})